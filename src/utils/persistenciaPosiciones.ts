/**
 * Módulo de persistencia local para posiciones de nodos y etiquetas de aristas.
 * Permite que los cambios espaciales del usuario sobrevivan a recargas (F5)
 * y a la navegación del modo historia.
 */

import type { Punto2D } from './trayectoriaUtilidades';

const CLAVE_NODOS = 'scrum_posiciones_nodos_v1';
const CLAVE_ETIQUETAS = 'scrum_posiciones_etiquetas_v1';
const CLAVE_ESTADOS_ARISTAS = 'scrum_estados_aristas_v2';

export interface EstadoEtiquetaArista {
  /** Progreso relativo sobre la trayectoria (0 a 1) */
  t: number;
  /** Desvío perpendicular que deforma o empuja la línea (en píxeles) */
  desvio?: number;
}

const memoriaFallback: Record<string, string> = {};

function obtenerStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis && globalThis.localStorage) {
    return globalThis.localStorage;
  }
  return {
    getItem: (k: string) => memoriaFallback[k] ?? null,
    setItem: (k: string, v: string) => {
      memoriaFallback[k] = v;
    },
    removeItem: (k: string) => {
      delete memoriaFallback[k];
    },
    clear: () => {
      Object.keys(memoriaFallback).forEach((k) => delete memoriaFallback[k]);
    }
  };
}

/**
 * Obtiene el mapa completo de posiciones persistidas de nodos.
 */
export function obtenerPosicionesNodos(): Record<string, Punto2D> {
  try {
    const raw = obtenerStorage().getItem(CLAVE_NODOS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Guarda o actualiza la posición de un nodo específico en el almacenamiento persistente.
 */
export function guardarPosicionNodo(id: string, posicion: Punto2D): void {
  try {
    const storage = obtenerStorage();
    const actuales = obtenerPosicionesNodos();
    actuales[id] = { x: Math.round(posicion.x), y: Math.round(posicion.y) };
    storage.setItem(CLAVE_NODOS, JSON.stringify(actuales));
  } catch {
    // Tolerancia ante almacenamiento deshabilitado
  }
}

/**
 * Guarda múltiples posiciones de nodos simultáneamente.
 */
export function guardarMultiplesPosicionesNodos(posiciones: Record<string, Punto2D>): void {
  try {
    const storage = obtenerStorage();
    const actuales = obtenerPosicionesNodos();
    const fusionadas = { ...actuales, ...posiciones };
    storage.setItem(CLAVE_NODOS, JSON.stringify(fusionadas));
  } catch {
    // Tolerancia ante fallos
  }
}

/**
 * Obtiene el mapa completo de estados de aristas (t relativo y desvío perpendicular).
 */
export function obtenerEstadosAristas(): Record<string, EstadoEtiquetaArista> {
  try {
    const raw = obtenerStorage().getItem(CLAVE_ESTADOS_ARISTAS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Obtiene el estado persistido (t y desvío) de una arista específica.
 */
export function obtenerEstadoEtiqueta(idArista: string): EstadoEtiquetaArista | null {
  const mapa = obtenerEstadosAristas();
  return mapa[idArista] ?? null;
}

/**
 * Guarda o actualiza el estado de una arista (t relativo y desvío perpendicular).
 */
export function guardarEstadoEtiqueta(idArista: string, estado: EstadoEtiquetaArista): void {
  try {
    const storage = obtenerStorage();
    const actuales = obtenerEstadosAristas();
    actuales[idArista] = {
      t: Math.round(estado.t * 1000) / 1000,
      desvio: estado.desvio ? Math.round(estado.desvio) : 0
    };
    storage.setItem(CLAVE_ESTADOS_ARISTAS, JSON.stringify(actuales));
  } catch {
    // Tolerancia ante fallos
  }
}

/**
 * Métodos de compatibilidad para coordenadas fijas.
 */
export function obtenerPosicionesEtiquetas(): Record<string, Punto2D> {
  try {
    const raw = obtenerStorage().getItem(CLAVE_ETIQUETAS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function obtenerPosicionEtiqueta(idArista: string): Punto2D | null {
  const mapa = obtenerPosicionesEtiquetas();
  return mapa[idArista] ?? null;
}

export function guardarPosicionEtiqueta(idArista: string, posicion: Punto2D): void {
  try {
    const storage = obtenerStorage();
    const actuales = obtenerPosicionesEtiquetas();
    actuales[idArista] = { x: Math.round(posicion.x), y: Math.round(posicion.y) };
    storage.setItem(CLAVE_ETIQUETAS, JSON.stringify(actuales));
  } catch {
    // Tolerancia ante fallos
  }
}

/**
 * Restablece todas las posiciones personalizadas a los valores predeterminados.
 */
export function limpiarPosicionesPersonalizadas(): void {
  try {
    const storage = obtenerStorage();
    storage.removeItem(CLAVE_NODOS);
    storage.removeItem(CLAVE_ETIQUETAS);
    storage.removeItem(CLAVE_ESTADOS_ARISTAS);
  } catch {
    // Sin acción requerida
  }
}
