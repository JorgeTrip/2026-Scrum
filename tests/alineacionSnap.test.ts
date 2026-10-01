import { describe, it, expect } from 'vitest';
import { calcularSnapVertical } from '../src/utils/alineacionSnap';
import type { NodoScrum } from '../src/types/scrum';

describe('Módulo de Alineación Snap Vertical', () => {
  const mockDetalles = { theoreticalBasis: 'Base teórica de prueba' };

  const nodosPrueba: NodoScrum[] = [
    {
      id: 'event-sprint',
      type: 'eventNode',
      position: { x: 474, y: 246 },
      data: { id: 'event-sprint', label: 'Sprint', category: 'event', summary: '', details: mockDetalles }
    },
    {
      id: 'event-sprint-planning',
      type: 'eventNode',
      position: { x: 959, y: 251 },
      data: { id: 'event-sprint-planning', label: 'Planning', category: 'event', summary: '', details: mockDetalles }
    },
    {
      id: 'role-po',
      type: 'roleNode',
      position: { x: 107, y: -53 },
      data: { id: 'role-po', label: 'PO', category: 'role', summary: '', details: mockDetalles }
    }
  ];

  it('encaja la coordenada Y exactamente al valor del nodo de referencia cuando está dentro del umbral', () => {
    // Si arrastramos 'event-sprint-planning' a y = 248 (a 2px de 246 de 'event-sprint')
    const resultado = calcularSnapVertical(
      'event-sprint-planning',
      { x: 950, y: 248 },
      nodosPrueba,
      15
    );

    expect(resultado.posicion.y).toBe(246);
    expect(resultado.snapY).toBe(246);
    expect(resultado.nodoReferencia?.id).toBe('event-sprint');
  });

  it('no altera la coordenada Y si la distancia supera el umbral de snap', () => {
    const resultado = calcularSnapVertical(
      'event-sprint-planning',
      { x: 950, y: 300 },
      nodosPrueba,
      15
    );

    expect(resultado.posicion.y).toBe(300);
    expect(resultado.snapY).toBeNull();
  });
});
