/**
 * Modelo de datos unificado de Scrum.
 * Agrupa y exporta los nodos tridimensionales y aristas del flujo.
 */

import type { NodoScrum } from '../types/scrum';
import { nodosRoles } from './datosRoles';
import { nodosEventos } from './datosEventos';
import { nodosArtefactos } from './datosArtefactos';
import { aristasScrum } from './datosAristas';

/** Conjunto consolidado de todos los nodos del flujo metodológico */
export const nodosScrum: NodoScrum[] = [
  ...nodosRoles,
  ...nodosEventos,
  ...nodosArtefactos
];

/** Conjunto consolidado de aristas dirigidas */
export { aristasScrum };

/** Carriles horizontales (Swimlanes) con su configuración visual y coordenadas Y */
export const carrilesScrum = [
  {
    id: 'lane-roles',
    titulo: 'Personas (Roles)',
    descripcion: 'Quienes componen el Scrum Team y sus responsabilidades',
    y: 20,
    altura: 210,
    colorBorde: 'border-amber-500/20',
    colorFondo: 'bg-amber-950/5',
    colorTexto: 'text-amber-400'
  },
  {
    id: 'lane-events',
    titulo: 'Eventos del Ciclo (Ceremonias)',
    descripcion: 'Ocasiones formales para la inspección y adaptación continua',
    y: 250,
    altura: 210,
    colorBorde: 'border-indigo-500/20',
    colorFondo: 'bg-indigo-950/5',
    colorTexto: 'text-indigo-400'
  },
  {
    id: 'lane-artifacts',
    titulo: 'Documentos (Artefactos y Compromisos)',
    descripcion: 'Trabajo o valor que aportan transparencia y oportunidades de inspección',
    y: 480,
    altura: 210,
    colorBorde: 'border-emerald-500/20',
    colorFondo: 'bg-emerald-950/5',
    colorTexto: 'text-emerald-400'
  }
];
