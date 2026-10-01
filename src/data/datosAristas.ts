/**
 * Definición de aristas dirigidas (edges) con puntos de anclaje (handles) separados
 * para evitar el solapamiento de líneas al salir o entrar a un mismo elemento.
 */

import { MarkerType } from '@xyflow/react';
import type { AristaScrum } from '../types/scrum';

/**
 * Función fábrica para estandarizar la creación de aristas dirigidas con handles específicos.
 */
function crearArista(
  id: string,
  source: string,
  target: string,
  label: string,
  color: string,
  sourceHandle: string,
  targetHandle: string,
  animated = false,
  dashed = false
): AristaScrum {
  return {
    id,
    source,
    target,
    sourceHandle,
    targetHandle,
    label,
    type: 'smoothstep',
    animated,
    style: {
      stroke: color,
      strokeWidth: 2,
      ...(dashed ? { strokeDasharray: '5 5' } : {})
    },
    markerEnd: { type: MarkerType.ArrowClosed, color }
  };
}

export const aristasScrum: AristaScrum[] = [
  // 1. Relaciones Estratégicas Iniciales (Product Owner y Visión)
  crearArista('edge-po-to-vision', 'role-product-owner', 'artifact-vision-board', 'Crea la visión', '#F59E0B', 'bottom-left', 'top-center', true),
  crearArista('edge-vision-to-pb', 'artifact-vision-board', 'artifact-product-backlog', 'Nutre el Product Goal', '#10B981', 'right-center', 'left-center', true),
  crearArista('edge-po-to-pb', 'role-product-owner', 'artifact-product-backlog', 'Gestiona y prioriza', '#F59E0B', 'bottom-right', 'top-left'),

  // 2. Roles hacia Eventos y Artefactos (Developers y Scrum Master)
  crearArista('edge-devs-to-daily', 'role-developers', 'event-daily-scrum', 'Inspeccionan diariamente', '#3B82F6', 'bottom-left', 'top-center', true),
  crearArista('edge-devs-to-sb', 'role-developers', 'artifact-sprint-backlog', 'Planifican y ejecutan', '#3B82F6', 'bottom-right', 'top-right'),
  crearArista('edge-sm-to-retro', 'role-scrum-master', 'event-sprint-retrospective', 'Facilita la mejora', '#8B5CF6', 'bottom-center', 'top-center'),

  // 3. Flujo Cronológico y Metodológico Principal
  crearArista('edge-sprint-to-planning', 'event-sprint', 'event-sprint-planning', 'Inicia con', '#6366F1', 'right-top', 'left-top'),
  crearArista('edge-pb-to-planning', 'artifact-product-backlog', 'event-sprint-planning', 'Entrada para selección', '#10B981', 'top-right', 'left-bottom', true),
  crearArista('edge-planning-to-sb', 'event-sprint-planning', 'artifact-sprint-backlog', 'Genera Sprint Goal & Plan', '#10B981', 'bottom-right', 'top-left', true),
  crearArista('edge-planning-to-daily', 'event-sprint-planning', 'event-daily-scrum', 'Ejecución en curso', '#6366F1', 'right-center', 'left-center'),
  crearArista('edge-daily-to-review', 'event-daily-scrum', 'event-sprint-review', 'Conduce a', '#6366F1', 'right-center', 'left-top'),
  crearArista('edge-sb-to-increment', 'artifact-sprint-backlog', 'artifact-increment', 'Construcción utilizable', '#10B981', 'right-center', 'left-center', true),
  crearArista('edge-increment-to-review', 'artifact-increment', 'event-sprint-review', 'Inspeccionado con stakeholders', '#10B981', 'top-center-source', 'left-bottom', true),
  crearArista('edge-review-to-retro', 'event-sprint-review', 'event-sprint-retrospective', 'Precede a', '#6366F1', 'right-center', 'left-center'),

  // 4. Bucle de Adaptación hacia el siguiente ciclo
  crearArista('edge-retro-to-next-cycle', 'event-sprint-retrospective', 'artifact-product-backlog', 'Adaptación al siguiente ciclo', '#EC4899', 'bottom-center', 'bottom-right-target', true, true)
];
