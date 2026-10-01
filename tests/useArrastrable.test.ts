import { describe, it, expect } from 'vitest';
import { limitarCoordenadasDentroDePantalla } from '../src/hooks/useArrastrable';

describe('Utilidad de arrastre (limitarCoordenadasDentroDePantalla)', () => {
  it('mantiene la posición si se encuentra dentro de los márgenes de la ventana', () => {
    const pos = limitarCoordenadasDentroDePantalla({ x: 50, y: 100 }, { ancho: 380, alto: 250 }, { anchoVentana: 1200, altoVentana: 800 });
    expect(pos.x).toBe(50);
    expect(pos.y).toBe(100);
  });

  it('no permite coordenadas negativas fuera del borde superior o izquierdo', () => {
    const pos = limitarCoordenadasDentroDePantalla({ x: -40, y: -10 }, { ancho: 380, alto: 250 }, { anchoVentana: 1200, altoVentana: 800 });
    expect(pos.x).toBe(10);
    expect(pos.y).toBe(10);
  });

  it('no permite que el cuadro exceda los bordes derecho o inferior', () => {
    const pos = limitarCoordenadasDentroDePantalla({ x: 1000, y: 700 }, { ancho: 380, alto: 250 }, { anchoVentana: 1200, altoVentana: 800 });
    expect(pos.x).toBe(1200 - 380 - 10);
    expect(pos.y).toBe(800 - 250 - 10);
  });
});
