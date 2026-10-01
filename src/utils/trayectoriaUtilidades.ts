/**
 * Utilidades geométricas para proyectar coordenadas sobre la trayectoria SVG de una arista.
 */

export interface Punto2D {
  x: number;
  y: number;
}

export interface RutaSVGMinima {
  getTotalLength(): number;
  getPointAtLength(distancia: number): { x: number; y: number };
}

/**
 * Calcula la distancia euclidiana entre dos puntos bidimensionales.
 */
export function calcularDistancia(p1: Punto2D, p2: Punto2D): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

/**
 * Encuentra el punto más cercano sobre la curva SVG a la coordenada deseada.
 * Garantiza que la etiqueta o su previsualización permanezca fiel al recorrido de la relación.
 */
export function proyectarPuntoEnTrayectoria(
  ruta: RutaSVGMinima,
  puntoDeseado: Punto2D,
  resolucion = 80
): Punto2D {
  const longitudTotal = ruta.getTotalLength();
  if (!longitudTotal || longitudTotal <= 0) {
    return puntoDeseado;
  }

  let mejorDistancia = Infinity;
  let mejorPunto: Punto2D = { ...puntoDeseado };

  for (let i = 0; i <= resolucion; i++) {
    const distancia = (i / resolucion) * longitudTotal;
    const pt = ruta.getPointAtLength(distancia);
    const distCuadrada = (pt.x - puntoDeseado.x) ** 2 + (pt.y - puntoDeseado.y) ** 2;

    if (distCuadrada < mejorDistancia) {
      mejorDistancia = distCuadrada;
      mejorPunto = { x: Math.round(pt.x), y: Math.round(pt.y) };
    }
  }

  return mejorPunto;
}
