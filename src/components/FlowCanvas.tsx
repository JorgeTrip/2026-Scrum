import React, { useMemo, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  ViewportPortal,
  MiniMap,
  Background,
  BackgroundVariant,
  type NodeMouseHandler,
  type NodeTypes,
  type EdgeTypes
} from '@xyflow/react';
import { RotateCcw } from 'lucide-react';
import '@xyflow/react/dist/style.css';

import { RoleNode } from './nodes/RoleNode';
import { EventNode } from './nodes/EventNode';
import { ArtifactNode } from './nodes/ArtifactNode';
import { AristaDespejada } from './edges/AristaDespejada';
import { Swimlanes } from './Swimlanes';
import { ControlZoomPreciso } from './ControlZoomPreciso';
import { useNodosConSnap } from '../hooks/useNodosConSnap';
import { useArrastreLienzoHorizontal } from '../hooks/useArrastreLienzoHorizontal';
import type { NodoScrum, AristaScrum, DatosNodoScrum } from '../types/scrum';

interface FlowCanvasProps {
  nodos: NodoScrum[];
  aristas: AristaScrum[];
  onSeleccionarNodo: (datos: DatosNodoScrum) => void;
  onCerrarTooltip?: () => void;
}

/**
 * Lienzo interno interactivo de React Flow.
 * Desplazamiento del fondo restringido exclusivamente al eje horizontal.
 */
const FlowCanvasInterno: React.FC<FlowCanvasProps> = ({
  nodos,
  aristas,
  onSeleccionarNodo,
  onCerrarTooltip
}) => {
  const {
    nodosInternos,
    guiaSnapY,
    onNodesChange,
    restablecerPosicionesOriginales
  } = useNodosConSnap(nodos);

  const {
    estaArrastrandoFondo,
    alIniciarArrastre,
    alMoverLienzo,
    alFinalizarArrastre
  } = useArrastreLienzoHorizontal();

  const { fitView } = useReactFlow();

  // Ajuste automático reactivo para monitores más pequeños o cambio de tamaño de ventana
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const alRedimensionar = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fitView({ padding: 0.15, duration: 250 });
      }, 100);
    };
    window.addEventListener('resize', alRedimensionar);
    return () => {
      window.removeEventListener('resize', alRedimensionar);
      clearTimeout(timer);
    };
  }, [fitView]);

  const nodeTypes = useMemo<NodeTypes>(() => ({
    roleNode: RoleNode as unknown as NodeTypes['roleNode'],
    eventNode: EventNode as unknown as NodeTypes['eventNode'],
    artifactNode: ArtifactNode as unknown as NodeTypes['artifactNode']
  }), []);

  const edgeTypes = useMemo<EdgeTypes>(() => ({ despejada: AristaDespejada }), []);
  const manejarClickEnNodo: NodeMouseHandler<NodoScrum> = useCallback(
    (_, nodo) => onSeleccionarNodo(nodo.data),
    [onSeleccionarNodo]
  );

  return (
    <div
      onPointerDown={alIniciarArrastre}
      onPointerMove={alMoverLienzo}
      onPointerUp={alFinalizarArrastre}
      onPointerCancel={alFinalizarArrastre}
      className={`relative w-full h-full bg-[#121214] overflow-hidden ${
        estaArrastrandoFondo ? 'cursor-grabbing select-none' : 'cursor-grab'
      }`}
    >
      {/* Botón flotante para restablecer posiciones si el usuario desea reiniciar el diseño */}
      <div className="absolute right-4 top-4 z-20">
        <button
          onClick={restablecerPosicionesOriginales}
          title="Restablecer posiciones predeterminadas de nodos y etiquetas"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1C1C1E]/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white text-xs font-medium shadow-lg backdrop-blur-md transition-all active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
          <span>Restablecer mapa</span>
        </button>
      </div>

      <ReactFlow<NodoScrum>
        nodes={nodosInternos}
        edges={aristas}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onNodeClick={manejarClickEnNodo}
        onPaneClick={onCerrarTooltip}
        nodesDraggable={true}
        elementsSelectable={true}
        panOnDrag={false}
        fitView
        fitViewOptions={{ padding: 0.15, duration: 600 }}
        minZoom={0.25}
        maxZoom={2.2}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#27272a" />
        <Swimlanes />

        {/* Línea guía magnética visual de encaje vertical ("Snap") en coordenadas del flujo */}
        <ViewportPortal>
          {guiaSnapY !== null && (
            <div
              style={{
                position: 'absolute',
                top: `${guiaSnapY}px`,
                left: '-10000px',
                width: '20000px',
                pointerEvents: 'none',
                zIndex: 1000
              }}
              className="border-t-2 border-dashed border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.9)]"
            />
          )}
        </ViewportPortal>

        <ControlZoomPreciso />

        <MiniMap<NodoScrum>
          nodeStrokeWidth={3}
          zoomable
          pannable
          className="!bg-[#1C1C1E]/95 !border !border-zinc-800 !rounded-2xl !shadow-xl !backdrop-blur-md"
          nodeColor={(n) => {
            if (n.data?.category === 'role') return '#F59E0B';
            if (n.data?.category === 'event') return '#6366F1';
            return '#10B981';
          }}
          maskColor="rgba(18, 18, 20, 0.7)"
        />
      </ReactFlow>
    </div>
  );
};

export const FlowCanvas: React.FC<FlowCanvasProps> = (props) => (
  <ReactFlowProvider>
    <FlowCanvasInterno {...props} />
  </ReactFlowProvider>
);
