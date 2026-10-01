/**
 * Definición de aristas dirigidas (edges) con tipo personalizado 'despejada' y offsets
 * de carril independientes para garantizar que ninguna relación colisione ni se superponga.
 */

import { MarkerType } from '@xyflow/react';
import type { AristaScrum } from '../types/scrum';

/**
 * Función fábrica para estandarizar la creación de aristas con halo y corredores diferenciados.
 */
function crearArista(
  id: string,
  source: string,
  target: string,
  label: string,
  color: string,
  sourceHandle: string,
  targetHandle: string,
  offsetCorredor: number,
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
    type: 'despejada',
    data: { offset: offsetCorredor },
    animated,
    style: {
      stroke: color,
      strokeWidth: 2.2,
      ...(dashed ? { strokeDasharray: '5 5' } : {})
    },
    markerEnd: { type: MarkerType.ArrowClosed, color }
  };
}

export const aristasScrum: AristaScrum[] = [
  // 1. Relaciones Estratégicas y Product Discovery (Vision ➔ Impact Mapping ➔ Story Mapping ➔ Backlog)
  crearArista('edge-po-to-vision', 'role-product-owner', 'artifact-vision-board', 'Crea la visión', '#F59E0B', 'bottom-left', 'top-center', 18, true),
  crearArista('edge-vision-to-im', 'artifact-vision-board', 'artifact-impact-mapping', 'Define metas y actores', '#10B981', 'right-center', 'left-center', 20, true),
  crearArista('edge-im-to-usm', 'artifact-impact-mapping', 'artifact-user-story-mapping', 'Mapea user journey', '#10B981', 'right-center', 'left-center', 22, true),
  crearArista('edge-usm-to-pb', 'artifact-user-story-mapping', 'artifact-product-backlog', 'Alimenta y dimensiona PB', '#10B981', 'right-center', 'left-center', 24, true),
  crearArista('edge-po-to-pb', 'role-product-owner', 'artifact-product-backlog', 'Gestiona y prioriza', '#F59E0B', 'bottom-center', 'top-left', 42),
  crearArista('edge-po-to-planning', 'role-product-owner', 'event-sprint-planning', 'Propone el foco de valor', '#F59E0B', 'bottom-right', 'top-left', 38, true),
  crearArista('edge-po-to-devs', 'role-product-owner', 'role-developers', 'Clarifica alcance y criterios', '#F59E0B', 'right-center', 'left-center', 14, true),
  crearArista('edge-po-to-review', 'role-product-owner', 'event-sprint-review', 'Lidera sesión con stakeholders', '#F59E0B', 'right-bottom', 'top-center', 52, true),

  // 2. Relaciones de Roles hacia Eventos y Artefactos con separación de trayectoria
  crearArista('edge-devs-to-daily', 'role-developers', 'event-daily-scrum', 'Inspeccionan diariamente', '#3B82F6', 'bottom-left', 'top-center', 20, true),
  crearArista('edge-devs-to-sb', 'role-developers', 'artifact-sprint-backlog', 'Planifican y ejecutan', '#3B82F6', 'bottom-right', 'top-right', 46),
  crearArista('edge-sm-to-retro', 'role-scrum-master', 'event-sprint-retrospective', 'Facilita la mejora', '#8B5CF6', 'bottom-center', 'top-center', 25),
  crearArista('edge-sm-to-sprint', 'role-scrum-master', 'event-sprint', 'Garantiza eventos y timeboxes', '#8B5CF6', 'bottom-left', 'top-right', 34, true),
  crearArista('edge-sm-to-devs', 'role-scrum-master', 'role-developers', 'Coaching y remueve impedimentos', '#8B5CF6', 'left-center-source', 'right-center-target', 16, true),
  crearArista('edge-sm-to-po', 'role-scrum-master', 'role-product-owner', 'Técnicas de Product Goal', '#8B5CF6', 'left-top-source', 'top-right', 48, true),
  crearArista('edge-sm-to-increment', 'role-scrum-master', 'artifact-increment', 'Vela por la Definition of Done', '#8B5CF6', 'bottom-right', 'top-center', 30, true),

  // 3. Flujo Cronológico y Metodológico con corredores escalonados
  crearArista('edge-sprint-to-planning', 'event-sprint', 'event-sprint-planning', 'Inicia con', '#6366F1', 'right-top', 'left-top', 18),
  crearArista('edge-pb-to-planning', 'artifact-product-backlog', 'event-sprint-planning', 'Entrada para selección', '#10B981', 'top-right', 'left-bottom', 38, true),
  crearArista('edge-planning-to-sb', 'event-sprint-planning', 'artifact-sprint-backlog', 'Genera Sprint Goal & Plan', '#10B981', 'bottom-right', 'top-left', 26, true),
  crearArista('edge-planning-to-daily', 'event-sprint-planning', 'event-daily-scrum', 'Ejecución en curso', '#6366F1', 'right-center', 'left-center', 16),
  crearArista('edge-daily-to-review', 'event-daily-scrum', 'event-sprint-review', 'Conduce a', '#6366F1', 'right-center', 'left-top', 20),
  crearArista('edge-sb-to-increment', 'artifact-sprint-backlog', 'artifact-increment', 'Construcción utilizable', '#10B981', 'right-center', 'left-center', 25, true),
  crearArista('edge-increment-to-review', 'artifact-increment', 'event-sprint-review', 'Inspeccionado con stakeholders', '#10B981', 'top-center-source', 'left-bottom', 40, true),
  crearArista('edge-review-to-retro', 'event-sprint-review', 'event-sprint-retrospective', 'Precede a', '#6366F1', 'right-center', 'left-center', 20),

  // 4. Bucle de Adaptación con autopista exterior amplia (65px) para no cruzar artefactos
  crearArista('edge-retro-to-next-cycle', 'event-sprint-retrospective', 'artifact-product-backlog', 'Adaptación al siguiente ciclo', '#EC4899', 'bottom-center', 'bottom-right-target', 65, true, true)
];
