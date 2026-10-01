import { describe, it, expect, beforeEach } from 'vitest';
import {
  guardarPosicionNodo,
  obtenerPosicionesNodos,
  guardarPosicionEtiqueta,
  obtenerPosicionEtiqueta,
  limpiarPosicionesPersonalizadas
} from '../src/utils/persistenciaPosiciones';

describe('persistenciaPosiciones', () => {
  beforeEach(() => {
    limpiarPosicionesPersonalizadas();
  });

  it('guarda y recupera la posición de un nodo reubicado por el usuario', () => {
    guardarPosicionNodo('role-product-owner', { x: 350, y: 120 });
    const posiciones = obtenerPosicionesNodos();

    expect(posiciones['role-product-owner']).toEqual({ x: 350, y: 120 });
  });

  it('guarda y recupera la posición de una etiqueta de arista', () => {
    guardarPosicionEtiqueta('e-po-pbl', { x: 420, y: 310 });
    const pos = obtenerPosicionEtiqueta('e-po-pbl');

    expect(pos).toEqual({ x: 420, y: 310 });
    expect(obtenerPosicionEtiqueta('arista-inexistente')).toBeNull();
  });

  it('limpia todas las posiciones persistidas correctamente', () => {
    guardarPosicionNodo('event-daily-scrum', { x: 700, y: 250 });
    guardarPosicionEtiqueta('e-sprint-daily', { x: 710, y: 260 });

    limpiarPosicionesPersonalizadas();

    expect(obtenerPosicionesNodos()['event-daily-scrum']).toBeUndefined();
    expect(obtenerPosicionEtiqueta('e-sprint-daily')).toBeNull();
  });
});
