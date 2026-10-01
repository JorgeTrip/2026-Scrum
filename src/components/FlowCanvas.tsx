import React, { useMemo, useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  applyNodeChanges,
  type OnNodesChange,
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
import type { NodoScrum, AristaScrum, DatosNodoScrum } from '../types/scrum';
import {
  guardarPosicionNodo,
  obtenerPosicionesNodos,
  limpiarPosicionesPersonalizadas
} from '../utils/persistenciaPosiciones';

interface FlowCanvasProps {
  nodos: NodoScrum[];
  aristas: AristaScrum[];
  onSeleccionarNodo: (datos: DatosNodoScrum) => void;
  onCerrarTooltip?: () => void;
}

/**
 * Lienzo interno interactivo de React Flow.
 */
const FlowCanvasInterno: React.FC<FlowCanvasProps> = ({
  nodos,
  aristas,
  onSeleccionarNodo,
  onCerrarTooltip
}) => {
  const [nodosInternos, setNodosInternos] = useState<NodoScrum[]>(() => {
    const posGuardadas = obtenerPosicionesNodos();
    return nodos.map((nodo) => {
      const pos = posGuardadas[nodo.id];
      return pos ? { ...nodo, position: pos } : nodo;
    });
  });

  useEffect(() => {
    const posGuardadas = obtenerPosicionesNodos();
    setNodosInternos((prevNodos) => {
      const mapaPosiciones = new Map(prevNodos.map((n) => [n.id, n.position]));
      return nodos.map((nodo) => {
        const posReubicada = posGuardadas[nodo.id] ?? mapaPosiciones.get(nodo.id);
        return posReubicada ? { ...nodo, position: posReubicada } : nodo;
      });
    });
  }, [nodos]);

  const onNodesChange: OnNodesChange<NodoScrum> = useCallback((cambios) => {
    setNodosInternos((prev) => {
      const actualizados = applyNodeChanges(cambios, prev);
      cambios.forEach((c) => {
        if (c.type === 'position' && c.position) {
          guardarPosicionNodo(c.id, c.position);
        }
      });
      return actualizados;
    });
  }, []);

  const restablecerPosicionesOriginales = useCallback(() => {
    limpiarPosicionesPersonalizadas();
    setNodosInternos(nodos);
    window.dispatchEvent(new CustomEvent('restablecer-posiciones-scrum'));
  }, [nodos]);

  const nodeTypes = useMemo<NodeTypes>(
    () => ({
      roleNode: RoleNode as unknown as NodeTypes['roleNode'],
      eventNode: EventNode as unknown as NodeTypes['eventNode'],
      artifactNode: ArtifactNode as unknown as NodeTypes['artifactNode']
    }),
    []
  );

  const edgeTypes = useMemo<EdgeTypes>(
    () => ({
      despejada: AristaDespejada
    }),
    []
  );

  const manejarClickEnNodo: NodeMouseHandler<NodoScrum> = useCallback(
    (_evento, nodo) => {
      onSeleccionarNodo(nodo.data);
    },
    [onSeleccionarNodo]
  );

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#121214] overflow-hidden">
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
        fitView
        fitViewOptions={{ padding: 0.2, duration: 600 }}
        minZoom={0.3}
        maxZoom={1.8}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color="#27272a"
        />

        {/* 3 Swimlanes que abarcan el 100% del viewport vertical reactivos al zoom */}
        <Swimlanes />

        {/* Controles de navegación y encuadre (Fit View) */}
        <Controls
          className="!bg-[#1C1C1E] !border !border-zinc-800 !rounded-xl !shadow-xl !overflow-hidden [&>button]:!bg-[#1C1C1E] [&>button]:!border-zinc-800 [&>button]:!text-zinc-300 [&>button:hover]:!bg-zinc-800"
          showInteractive={false}
        />

        {/* Mini-mapa en la esquina inferior derecha */}
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

/**
 * Componente exportado con proveedor de contexto ReactFlowProvider garantizado.
 */
export const FlowCanvas: React.FC<FlowCanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <FlowCanvasInterno {...props} />
    </ReactFlowProvider>
  );
};
