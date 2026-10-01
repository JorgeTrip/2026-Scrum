import { describe, it, expect } from 'vitest';
import {
  proyectarPuntoEnTrayectoria,
  calcularDistancia,
  type RutaSVGMinima
} from '../src/utils/trayectoriaUtilidades';

describe('Utilidades de Trayectoria', () => {
  // Simulación de un segmento horizontal de (0, 100) a (200, 100)
  const rutaMockHorizontal: RutaSVGMinima = {
    getTotalLength: () => 200,
    getPointAtLength: (d: number) => ({ x: d, y: 100 })
  };

  it('proyecta un punto cercano directamente sobre la línea horizontal', () => {
    const proyectado = proyectarPuntoEnTrayectoria(rutaMockHorizontal, { x: 50, y: 140 });
    expect(proyectado.x).toBe(50);
    expect(proyectado.y).toBe(100);
  });

  it('restringe la proyección a los extremos de la trayectoria', () => {
    const proyectadoIzquierda = proyectarPuntoEnTrayectoria(rutaMockHorizontal, { x: -30, y: 80 });
    expect(proyectadoIzquierda.x).toBe(0);
    expect(proyectadoIzquierda.y).toBe(100);

    const proyectadoDerecha = proyectarPuntoEnTrayectoria(rutaMockHorizontal, { x: 250, y: 120 });
    expect(proyectadoDerecha.x).toBe(200);
    expect(proyectadoDerecha.y).toBe(100);
  });

  it('calcula correctamente la distancia euclidiana entre dos puntos', () => {
    const dist = calcularDistancia({ x: 0, y: 0 }, { x: 3, y: 4 });
    expect(dist).toBe(5);
  });
});
