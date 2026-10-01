/**
 * Definición de aristas dirigidas (edges) con flechas visibles y tipado semántico.
 */

import { MarkerType } from '@xyflow/react';
import type { AristaScrum } from '../types/scrum';

export const aristasScrum: AristaScrum[] = [
  // Relaciones Estratégicas Iniciales
  {
    id: 'edge-po-to-vision',
    source: 'role-product-owner',
    target: 'artifact-vision-board',
    label: 'Crea la visión',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#F59E0B', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#F59E0B' }
  },
  {
    id: 'edge-vision-to-pb',
    source: 'artifact-vision-board',
    target: 'artifact-product-backlog',
    label: 'Nutre el Product Goal y PBI',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#10B981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981' }
  },
  {
    id: 'edge-po-to-pb',
    source: 'role-product-owner',
    target: 'artifact-product-backlog',
    label: 'Gestiona y prioriza',
    type: 'smoothstep',
    style: { stroke: '#F59E0B', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#F59E0B' }
  },

  // Relaciones de Roles a Eventos/Artefactos
  {
    id: 'edge-devs-to-daily',
    source: 'role-developers',
    target: 'event-daily-scrum',
    label: 'Inspeccionan diariamente',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#3B82F6', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' }
  },
  {
    id: 'edge-devs-to-sb',
    source: 'role-developers',
    target: 'artifact-sprint-backlog',
    label: 'Planifican y ejecutan',
    type: 'smoothstep',
    style: { stroke: '#3B82F6', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' }
  },
  {
    id: 'edge-sm-to-retro',
    source: 'role-scrum-master',
    target: 'event-sprint-retrospective',
    label: 'Facilita la mejora',
    type: 'smoothstep',
    style: { stroke: '#8B5CF6', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#8B5CF6' }
  },

  // Flujo Cronológico y Metodológico Principal
  {
    id: 'edge-sprint-to-planning',
    source: 'event-sprint',
    target: 'event-sprint-planning',
    label: 'Inicia con',
    type: 'smoothstep',
    style: { stroke: '#6366F1', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#6366F1' }
  },
  {
    id: 'edge-pb-to-planning',
    source: 'artifact-product-backlog',
    target: 'event-sprint-planning',
    label: 'Entrada para selección',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#10B981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981' }
  },
  {
    id: 'edge-planning-to-sb',
    source: 'event-sprint-planning',
    target: 'artifact-sprint-backlog',
    label: 'Genera Sprint Goal & Plan',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#10B981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981' }
  },
  {
    id: 'edge-planning-to-daily',
    source: 'event-sprint-planning',
    target: 'event-daily-scrum',
    label: 'Ejecución en curso',
    type: 'smoothstep',
    style: { stroke: '#6366F1', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#6366F1' }
  },
  {
    id: 'edge-daily-to-review',
    source: 'event-daily-scrum',
    target: 'event-sprint-review',
    label: 'Conduce a',
    type: 'smoothstep',
    style: { stroke: '#6366F1', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#6366F1' }
  },
  {
    id: 'edge-sb-to-increment',
    source: 'artifact-sprint-backlog',
    target: 'artifact-increment',
    label: 'Construcción utilizable',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#10B981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981' }
  },
  {
    id: 'edge-increment-to-review',
    source: 'artifact-increment',
    target: 'event-sprint-review',
    label: 'Inspeccionado con stakeholders',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#10B981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981' }
  },
  {
    id: 'edge-review-to-retro',
    source: 'event-sprint-review',
    target: 'event-sprint-retrospective',
    label: 'Precede a',
    type: 'smoothstep',
    style: { stroke: '#6366F1', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#6366F1' }
  },

  // Bucles de Adaptación hacia el siguiente ciclo
  {
    id: 'edge-retro-to-next-cycle',
    source: 'event-sprint-retrospective',
    target: 'artifact-product-backlog',
    label: 'Adaptación al siguiente ciclo',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#EC4899', strokeWidth: 2, strokeDasharray: '5 5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#EC4899' }
  }
];
