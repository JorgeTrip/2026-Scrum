/**
 * Utilidades de filtrado y cálculo de atenuación visual para nodos de Scrum.
 */

import type { CategoriaScrum, DatosNodoScrum } from '../types/scrum';

/**
 * Determina el valor de opacidad de un nodo en base a los criterios de búsqueda y categoría.
 * Considera títulos, denominaciones alternativas (AKAs), resúmenes y ficha técnica.
 */
export function calcularOpacidadNodo(
  nodo: Pick<DatosNodoScrum, 'category' | 'label' | 'summary' | 'details' | 'akas'>,
  categoriaFiltro: CategoriaScrum | 'all',
  textoBusqueda: string
): number {
  const coincideCategoria =
    categoriaFiltro === 'all' || nodo.category === categoriaFiltro;

  if (!coincideCategoria) {
    return 0.2;
  }

  const busquedaLimpia = textoBusqueda.trim().toLowerCase();
  if (!busquedaLimpia) {
    return 1.0;
  }

  const enLabel = nodo.label.toLowerCase().includes(busquedaLimpia);
  const enAkas = nodo.akas?.some((a) => a.toLowerCase().includes(busquedaLimpia)) ?? false;
  const enResumen = nodo.summary.toLowerCase().includes(busquedaLimpia);
  const enFundamento = nodo.details.theoreticalBasis.toLowerCase().includes(busquedaLimpia);
  const enResponsabilidades =
    nodo.details.responsibilities?.some((r) => r.toLowerCase().includes(busquedaLimpia)) ?? false;
  const enSalidas =
    nodo.details.outputs?.some((o) => o.toLowerCase().includes(busquedaLimpia)) ?? false;
  const enEntradas =
    nodo.details.inputs?.some((i) => i.toLowerCase().includes(busquedaLimpia)) ?? false;

  return enLabel || enAkas || enResumen || enFundamento || enResponsabilidades || enSalidas || enEntradas
    ? 1.0
    : 0.2;
}
