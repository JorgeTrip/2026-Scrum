import type { NodoScrum } from '../types/scrum';

export interface ResultadoSnapVertical {
  posicion: { x: number; y: number };
  snapY: number | null;
  nodoReferencia: NodoScrum | null;
}

/** Umbral de atracción magnética en píxeles para el encaje vertical */
/** Umbral de atracción magnética en píxeles para el encaje vertical */
export const UMBRAL_SNAP_VERTICAL_DEFECTO = 24;

/**
 * Calcula el encaje magnético ("snap") vertical para alinear un elemento arrastrado
 * a la misma altura exacta que otros elementos, priorizando estrictamente el vecino
 * inmediato a su izquierda dentro del mismo carril para garantizar continuidad de flujo.
 */
export function calcularSnapVertical(
  nodoArrastradoId: string,
  posicionPropuesta: { x: number; y: number },
  todosLosNodos: NodoScrum[],
  umbral = UMBRAL_SNAP_VERTICAL_DEFECTO
): ResultadoSnapVertical {
  const nodoActual = todosLosNodos.find((n) => n.id === nodoArrastradoId);
  const categoriaActual = nodoActual?.data?.category;

  // Filtrar otros nodos excluyendo el que se está arrastrando
  const otrosNodos = todosLosNodos.filter((n) => n.id !== nodoArrastradoId);
  if (otrosNodos.length === 0) {
    return { posicion: posicionPropuesta, snapY: null, nodoReferencia: null };
  }

  // Priorizar nodos de la misma categoría/swimlane
  const nodosPrioritarios = otrosNodos.filter(
    (n) => n.data?.category === categoriaActual
  );
  const candidatos = nodosPrioritarios.length > 0 ? nodosPrioritarios : otrosNodos;

  // 1. Prioridad máxima: Vecino inmediato a la izquierda (mayor x menor que posicionPropuesta.x)
  const nodosIzquierda = candidatos.filter((n) => n.position.x < posicionPropuesta.x);
  if (nodosIzquierda.length > 0) {
    // Ordenar de más cercano a más lejano en X (descendente)
    const vecinoIzquierdo = nodosIzquierda.reduce((prev, curr) =>
      curr.position.x > prev.position.x ? curr : prev
    );

    const distVecinoIzq = Math.abs(vecinoIzquierdo.position.y - posicionPropuesta.y);
    if (distVecinoIzq <= umbral) {
      return {
        posicion: { x: posicionPropuesta.x, y: vecinoIzquierdo.position.y },
        snapY: vecinoIzquierdo.position.y,
        nodoReferencia: vecinoIzquierdo
      };
    }
  }

  // 2. Si no hay vecino izquierdo en umbral, buscar el candidato más próximo en Y
  let mejorNodo: NodoScrum | null = null;
  let menorDistancia = Infinity;

  for (const nodo of candidatos) {
    const distanciaY = Math.abs(nodo.position.y - posicionPropuesta.y);
    if (distanciaY <= umbral && distanciaY < menorDistancia) {
      menorDistancia = distanciaY;
      mejorNodo = nodo;
    }
  }

  if (mejorNodo) {
    return {
      posicion: {
        x: posicionPropuesta.x,
        y: mejorNodo.position.y
      },
      snapY: mejorNodo.position.y,
      nodoReferencia: mejorNodo
    };
  }

  return {
    posicion: posicionPropuesta,
    snapY: null,
    nodoReferencia: null
  };
}
