/**
 * Custom hook y lógica pura para gestionar la navegación guiada de la historia de Scrum.
 */

import { useState, useMemo, useCallback } from 'react';
import type { NodoScrum, AristaScrum } from '../types/scrum';
import { capitulosHistoria, type CapituloHistoria } from '../data/datosHistoria';

/**
 * Filtra los nodos y aristas que deben ser visibles hasta el paso actual.
 */
export function calcularElementosVisiblesHistoria(
  todosLosNodos: NodoScrum[],
  todasLasAristas: AristaScrum[],
  indicePaso: number
) {
  // Colección de todos los IDs introducidos hasta el paso actual inclusive
  const idsVisibles = new Set<string>();
  for (let i = 0; i <= indicePaso && i < capitulosHistoria.length; i++) {
    capitulosHistoria[i].idsNodosNuevos.forEach((id) => idsVisibles.add(id));
  }

  const capituloActual = capitulosHistoria[indicePaso] || capitulosHistoria[0];
  const idsFoco = new Set(capituloActual.idsDestacados);

  const nodosVisibles = todosLosNodos
    .filter((nodo) => idsVisibles.has(nodo.id))
    .map((nodo) => ({
      ...nodo,
      data: {
        ...nodo.data,
        opacity: idsFoco.has(nodo.id) ? 1.0 : 0.85,
        isSelected: idsFoco.has(nodo.id)
      }
    }));

  const aristasVisibles = todasLasAristas.filter(
    (arista) => idsVisibles.has(arista.source) && idsVisibles.has(arista.target)
  );

  return { nodosVisibles, aristasVisibles };
}

export function useHistoriaScrum(todosLosNodos: NodoScrum[], todasLasAristas: AristaScrum[]) {
  const [pasoActual, setPasoActual] = useState(0);
  const [modoActivo, setModoActivo] = useState<'historia' | 'mapa'>('historia');

  const capituloActual: CapituloHistoria = useMemo(() => {
    return capitulosHistoria[pasoActual] || capitulosHistoria[0];
  }, [pasoActual]);

  const { nodosVisibles, aristasVisibles } = useMemo(() => {
    if (modoActivo === 'mapa') {
      return { nodosVisibles: todosLosNodos, aristasVisibles: todasLasAristas };
    }
    return calcularElementosVisiblesHistoria(todosLosNodos, todasLasAristas, pasoActual);
  }, [todosLosNodos, todasLasAristas, pasoActual, modoActivo]);

  const siguientePaso = useCallback(() => {
    setPasoActual((prev) => Math.min(prev + 1, capitulosHistoria.length - 1));
  }, []);

  const anteriorPaso = useCallback(() => {
    setPasoActual((prev) => Math.max(prev - 1, 0));
  }, []);

  const irAPaso = useCallback((paso: number) => {
    if (paso >= 0 && paso < capitulosHistoria.length) {
      setPasoActual(paso);
    }
  }, []);

  return {
    pasoActual,
    capituloActual,
    totalPasos: capitulosHistoria.length,
    modoActivo,
    setModoActivo,
    siguientePaso,
    anteriorPaso,
    irAPaso,
    nodosVisibles,
    aristasVisibles
  };
}
