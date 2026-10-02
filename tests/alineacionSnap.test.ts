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

  it('prioriza estrictamente el vecino inmediato a la izquierda frente a nodos a la derecha', () => {
    const nodosConVecinos: NodoScrum[] = [
      {
        id: 'nodo-izq',
        type: 'artifactNode',
        position: { x: 200, y: 620 },
        data: { id: 'nodo-izq', label: 'Izq', category: 'artifact', summary: '', details: mockDetalles }
      },
      {
        id: 'nodo-arrastrado',
        type: 'artifactNode',
        position: { x: 500, y: 622 },
        data: { id: 'nodo-arrastrado', label: 'Arrastrado', category: 'artifact', summary: '', details: mockDetalles }
      },
      {
        id: 'nodo-der',
        type: 'artifactNode',
        position: { x: 800, y: 625 },
        data: { id: 'nodo-der', label: 'Der', category: 'artifact', summary: '', details: mockDetalles }
      }
    ];

    // Arrastrado a y=624 (distancia a Der: 1px, distancia a Izq: 4px)
    // Debe ganar Izq por ser el vecino inmediato a la izquierda dentro del umbral
    const resultado = calcularSnapVertical(
      'nodo-arrastrado',
      { x: 500, y: 624 },
      nodosConVecinos
    );

    expect(resultado.posicion.y).toBe(620);
    expect(resultado.snapY).toBe(620);
    expect(resultado.nodoReferencia?.id).toBe('nodo-izq');
  });

  it('utiliza el umbral por defecto de 24px para capturar diferencias de hasta 24px', () => {
    const nodosConDiferencia: NodoScrum[] = [
      {
        id: 'nodo-base',
        type: 'artifactNode',
        position: { x: 100, y: 620 },
        data: { id: 'nodo-base', label: 'Base', category: 'artifact', summary: '', details: mockDetalles }
      },
      {
        id: 'nodo-movil',
        type: 'artifactNode',
        position: { x: 400, y: 620 },
        data: { id: 'nodo-movil', label: 'Movil', category: 'artifact', summary: '', details: mockDetalles }
      }
    ];

    // Con distancia de 20px (dentro de 24px pero fuera del antiguo 14px)
    const resultado = calcularSnapVertical(
      'nodo-movil',
      { x: 400, y: 640 },
      nodosConDiferencia
    );

    expect(resultado.posicion.y).toBe(620);
    expect(resultado.snapY).toBe(620);
  });
});
