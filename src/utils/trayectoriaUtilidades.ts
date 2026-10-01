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
 * Encuentra el punto más cercano sobre la curva SVG a la coordenada del puntero del usuario.
 * Garantiza que la etiqueta permanezca 100% fiel al recorrido de la relación.
 */
export function proyectarPuntoEnTrayectoria(
  ruta: RutaSVGMinima,
  puntoDeseado: Punto2D,
  resolucion = 60
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
