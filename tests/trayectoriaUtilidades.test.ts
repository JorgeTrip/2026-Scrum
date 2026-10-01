import { describe, it, expect } from 'vitest';
import {
  proyectarPuntoEnTrayectoria,
  proyectarParametroEnTrayectoria,
  obtenerPuntoEnTrayectoriaPorT,
  construirRutaSmoothStepConDesvio,
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

  it('calcula el parámetro normalizado t a lo largo de la trayectoria', () => {
    const resultado = proyectarParametroEnTrayectoria(rutaMockHorizontal, { x: 100, y: 120 });
    // Al estar en x=100 en un segmento de 200, t debe ser aproximadamente 0.5
    expect(resultado.t).toBeCloseTo(0.5, 1);
    expect(resultado.punto.x).toBe(100);
    expect(resultado.punto.y).toBe(100);
  });

  it('obtiene el punto exacto sobre la trayectoria para un parámetro t dado', () => {
    const punto = obtenerPuntoEnTrayectoriaPorT(rutaMockHorizontal, 0.25);
    expect(punto.x).toBe(50);
    expect(punto.y).toBe(100);
  });

  it('construye una ruta SVG válida con desvío perpendicular', () => {
    // Línea horizontal con desvío hacia abajo en Y (+30px)
    const rutaConDesvio = construirRutaSmoothStepConDesvio({
      sourceX: 0,
      sourceY: 100,
      targetX: 200,
      targetY: 100,
      desvio: 30
    });

    expect(rutaConDesvio).toContain('M 0 100');
    expect(rutaConDesvio).toContain('200 100');
    // Debe incluir el desvío vertical (100 + 30 = 130)
    expect(rutaConDesvio).toContain('130');
  });

  it('calcula correctamente la distancia euclidiana entre dos puntos', () => {
    const dist = calcularDistancia({ x: 0, y: 0 }, { x: 3, y: 4 });
    expect(dist).toBe(5);
  });
});
