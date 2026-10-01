/**
 * Custom Hook para gestionar el filtrado por texto y categoría sobre los nodos de Scrum.
 */

import { useState, useMemo, useCallback } from 'react';
import type { CategoriaScrum, NodoScrum } from '../types/scrum';
import { calcularOpacidadNodo } from '../utils/filtroUtilidades';
import { nodosScrum } from '../data/scrumData';

/**
 * Función pura que calcula la nueva lista de nodos con opacidades actualizadas.
 */
export function aplicarFiltroANodos(
  nodos: NodoScrum[],
  categoria: CategoriaScrum | 'all',
  busqueda: string
): NodoScrum[] {
  return nodos.map((nodo) => ({
    ...nodo,
    data: {
      ...nodo.data,
      opacity: calcularOpacidadNodo(nodo.data, categoria, busqueda)
    }
  }));
}

export function useFiltroScrum() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaScrum | 'all'>('all');

  const nodosFiltrados = useMemo(() => {
    return aplicarFiltroANodos(nodosScrum, categoriaSeleccionada, busqueda);
  }, [categoriaSeleccionada, busqueda]);

  const limpiarFiltros = useCallback(() => {
    setBusqueda('');
    setCategoriaSeleccionada('all');
  }, []);

  return {
    busqueda,
    setBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    nodosFiltrados,
    limpiarFiltros
  };
}
