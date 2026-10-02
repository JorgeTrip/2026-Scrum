import { useState, useEffect, useCallback } from 'react';
import { applyNodeChanges, type OnNodesChange } from '@xyflow/react';
import type { NodoScrum } from '../types/scrum';
import { calcularSnapVertical } from '../utils/alineacionSnap';
import {
  guardarPosicionNodo,
  obtenerPosicionesNodos,
  limpiarPosicionesPersonalizadas
} from '../utils/persistenciaPosiciones';

/**
 * Hook modular para gestionar los nodos del canvas, persistencia y encaje magnético vertical (Snap).
 */
export function useNodosConSnap(nodosIniciales: NodoScrum[]) {
  const [nodosInternos, setNodosInternos] = useState<NodoScrum[]>(() => {
    const posGuardadas = obtenerPosicionesNodos();
    return nodosIniciales.map((nodo) => {
      const pos = posGuardadas[nodo.id];
      return pos ? { ...nodo, position: pos } : nodo;
    });
  });

  useEffect(() => {
    const posGuardadas = obtenerPosicionesNodos();
    setNodosInternos((prevNodos) => {
      const mapaPosiciones = new Map(prevNodos.map((n) => [n.id, n.position]));
      return nodosIniciales.map((nodo) => {
        const posReubicada = posGuardadas[nodo.id] ?? mapaPosiciones.get(nodo.id);
        return posReubicada ? { ...nodo, position: posReubicada } : nodo;
      });
    });
  }, [nodosIniciales]);

  const [guiaSnapY, setGuiaSnapY] = useState<number | null>(null);

  const onNodesChange: OnNodesChange<NodoScrum> = useCallback((cambios) => {
    let snapY: number | null = null;
    let arrastrando = false;

    const cambiosConSnap = cambios.map((c) => {
      if (c.type === 'position' && c.position) {
        const res = calcularSnapVertical(c.id, c.position, nodosInternos);
        if (c.dragging) {
          arrastrando = true;
          if (res.snapY !== null) snapY = res.snapY;
        }
        return { ...c, position: res.posicion };
      }
      return c;
    });

    setGuiaSnapY(arrastrando ? snapY : null);

    setNodosInternos((prev) => {
      const actualizados = applyNodeChanges(cambiosConSnap, prev);
      cambiosConSnap.forEach((c) => {
        if (c.type === 'position' && c.position) {
          guardarPosicionNodo(c.id, c.position);
        }
      });
      return actualizados;
    });
  }, [nodosInternos]);

  const restablecerPosicionesOriginales = useCallback(() => {
    limpiarPosicionesPersonalizadas();
    setNodosInternos(nodosIniciales);
    window.dispatchEvent(new CustomEvent('restablecer-posiciones-scrum'));
  }, [nodosIniciales]);

  return {
    nodosInternos,
    guiaSnapY,
    onNodesChange,
    restablecerPosicionesOriginales
  };
}
