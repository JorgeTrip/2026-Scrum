/**
 * Utilidades geométricas para proyectar coordenadas sobre la trayectoria SVG de una arista
 * y calcular deformaciones elásticas por desvío perpendicular.
 */

export interface Punto2D {
  x: number;
  y: number;
}

export interface RutaSVGMinima {
  getTotalLength(): number;
  getPointAtLength(distancia: number): { x: number; y: number };
}

export interface ParametrosRutaDesvio {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  desvio?: number;
  borderRadius?: number;
  offset?: number;
}

/**
 * Calcula la distancia euclidiana entre dos puntos bidimensionales.
 */
export function calcularDistancia(p1: Punto2D, p2: Punto2D): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

/**
 * Encuentra el punto más cercano sobre la curva SVG a la coordenada deseada.
 */
export function proyectarPuntoEnTrayectoria(
  ruta: RutaSVGMinima,
  puntoDeseado: Punto2D,
  resolucion = 80
): Punto2D {
  const { punto } = proyectarParametroEnTrayectoria(ruta, puntoDeseado, resolucion);
  return punto;
}

/**
 * Proyecta un punto sobre la trayectoria y retorna tanto las coordenadas como el progreso normalizado (t).
 * t se encuentra en el rango [0.05, 0.95] para mantener la etiqueta dentro de la arista visible.
 */
export function proyectarParametroEnTrayectoria(
  ruta: RutaSVGMinima,
  puntoDeseado: Punto2D,
  resolucion = 80
): { t: number; punto: Punto2D; distancia: number } {
  const longitudTotal = ruta.getTotalLength();
  if (!longitudTotal || longitudTotal <= 0) {
    return { t: 0.5, punto: puntoDeseado, distancia: 0 };
  }

  let mejorDistancia = Infinity;
  let mejorPunto: Punto2D = { ...puntoDeseado };
  let mejorDistanciaEnRuta = longitudTotal * 0.5;

  for (let i = 0; i <= resolucion; i++) {
    const distancia = (i / resolucion) * longitudTotal;
    const pt = ruta.getPointAtLength(distancia);
    const distCuadrada = (pt.x - puntoDeseado.x) ** 2 + (pt.y - puntoDeseado.y) ** 2;

    if (distCuadrada < mejorDistancia) {
      mejorDistancia = distCuadrada;
      mejorPunto = { x: Math.round(pt.x), y: Math.round(pt.y) };
      mejorDistanciaEnRuta = distancia;
    }
  }

  const tCrudo = mejorDistanciaEnRuta / longitudTotal;
  const t = Math.max(0.05, Math.min(0.95, tCrudo));

  return { t, punto: mejorPunto, distancia: Math.sqrt(mejorDistancia) };
}

/**
 * Obtiene el punto exacto sobre la curva para un parámetro de progreso normalizado t [0, 1].
 */
export function obtenerPuntoEnTrayectoriaPorT(ruta: RutaSVGMinima, t: number): Punto2D {
  const longitud = ruta.getTotalLength();
  if (!longitud || longitud <= 0) {
    return { x: 0, y: 0 };
  }
  const tLimitado = Math.max(0.04, Math.min(0.96, t));
  const pt = ruta.getPointAtLength(tLimitado * longitud);
  return { x: Math.round(pt.x), y: Math.round(pt.y) };
}

/**
 * Construye una ruta SVG suave con paso central desviable perpendicularmente.
 * Permite empujar la línea de relación hacia arriba/abajo en aristas horizontales,
 * o hacia los lados en aristas verticales.
 */
export function construirRutaSmoothStepConDesvio({
  sourceX,
  sourceY,
  targetX,
  targetY,
  desvio = 0
}: ParametrosRutaDesvio): string {
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const esHorizontal = Math.abs(dx) >= Math.abs(dy);

  if (esHorizontal) {
    const yCentro = Math.round((sourceY + targetY) / 2 + desvio);
    const c1X = Math.round(sourceX + dx * 0.35);
    const c2X = Math.round(sourceX + dx * 0.65);
    return `M ${sourceX} ${sourceY} C ${c1X} ${yCentro}, ${c2X} ${yCentro}, ${targetX} ${targetY}`;
  } else {
    const xCentro = Math.round((sourceX + targetX) / 2 + desvio);
    const c1Y = Math.round(sourceY + dy * 0.35);
    const c2Y = Math.round(sourceY + dy * 0.65);
    return `M ${sourceX} ${sourceY} C ${xCentro} ${c1Y}, ${xCentro} ${c2Y}, ${targetX} ${targetY}`;
  }
}
