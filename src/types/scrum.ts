/**
 * Tipos e interfaces TypeScript estrictas para el Modelo de Dominio de Scrum.
 * Alineado con la Guía Oficial de Scrum 2020.
 */

import type { Node, Edge } from '@xyflow/react';

export type CategoriaScrum = 'role' | 'event' | 'artifact';

export interface DetallesEntidadScrum {
  /** Lista de responsabilidades clave (principalmente para roles) */
  responsibilities?: string[];
  /** Duración recomendada del evento según el tamaño del Sprint */
  timebox?: string;
  /** Artefactos, compromisos o condiciones de entrada requeridas */
  inputs?: string[];
  /** Resultados entregables o compromisos asociados */
  outputs?: string[];
  /** Fundamentación teórica alineada con la Guía Oficial de Scrum */
  theoreticalBasis: string;
}

export interface EntidadScrum {
  /** Identificador único de la entidad */
  id: string;
  /** Nombre técnico formal */
  label: string;
  /** Dimensión metodológica */
  category: CategoriaScrum;
  /** Resumen ejecutivo conciso */
  summary: string;
  /** Ficha técnica detallada de la entidad */
  details: DetallesEntidadScrum;
  /** Denominaciones alternativas o alias populares (Also Known As) */
  akas?: string[];
}

export interface DatosNodoScrum extends Record<string, unknown> {
  id: string;
  label: string;
  category: CategoriaScrum;
  summary: string;
  details: DetallesEntidadScrum;
  /** Denominaciones alternativas o alias populares (Also Known As) */
  akas?: string[];
  /** Nivel de opacidad visual calculado dinámicamente según filtros */
  opacity?: number;
  /** Indica si el nodo se encuentra seleccionado activamente */
  isSelected?: boolean;
  /** Indica si el tooltip con la ficha técnica está visible emergiendo del nodo */
  estaAbiertoTooltip?: boolean;
}

export type NodoScrum = Node<DatosNodoScrum>;
export type AristaScrum = Edge;

export interface FiltroScrumEstado {
  /** Término de búsqueda textual */
  busqueda: string;
  /** Categoría seleccionada para filtrar, o 'all' para todas */
  categoriaSeleccionada: CategoriaScrum | 'all';
}
