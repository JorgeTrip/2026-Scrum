import React, { useMemo, useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
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
import '@xyflow/react/dist/style.css';

import { RoleNode } from './nodes/RoleNode';
import { EventNode } from './nodes/EventNode';
import { ArtifactNode } from './nodes/ArtifactNode';
import { AristaDespejada } from './edges/AristaDespejada';
import { Swimlanes } from './Swimlanes';
import type { NodoScrum, AristaScrum, DatosNodoScrum } from '../types/scrum';

interface FlowCanvasProps {
  nodos: NodoScrum[];
  aristas: AristaScrum[];
  onSeleccionarNodo: (datos: DatosNodoScrum) => void;
}

/**
 * Contenedor principal de React Flow con nodos interactivos, arrastrables y aristas despejadas.
 */
export const FlowCanvas: React.FC<FlowCanvasProps> = ({ nodos, aristas, onSeleccionarNodo }) => {
  const [nodosInternos, setNodosInternos] = useState<NodoScrum[]>(nodos);

  // Sincroniza nodos visibles preservando las posiciones reubicadas por el usuario
  useEffect(() => {
    setNodosInternos((prevNodos) => {
      const mapaPosiciones = new Map(prevNodos.map((n) => [n.id, n.position]));
      return nodos.map((nodo) => {
        const posReubicada = mapaPosiciones.get(nodo.id);
        return posReubicada ? { ...nodo, position: posReubicada } : nodo;
      });
    });
  }, [nodos]);

  const onNodesChange: OnNodesChange<NodoScrum> = useCallback((cambios) => {
    setNodosInternos((prev) => applyNodeChanges(cambios, prev));
  }, []);

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
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#121214]">
      <ReactFlow<NodoScrum>
        nodes={nodosInternos}
        edges={aristas}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onNodeClick={manejarClickEnNodo}
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

        {/* Carriles horizontales tridimensionales */}
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
