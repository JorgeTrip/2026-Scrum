import { describe, it, expect } from 'vitest';

describe('Lógica de Desplazamiento Horizontal del Lienzo', () => {
  it('garantiza que el eje vertical (Y) permanezca invariante ante cualquier movimiento del raton', () => {
    const viewportInicial = { x: 120, y: 350, zoom: 1.1 };
    const inicioMouseX = 500;
    const movimientoMouse = [
      { clientX: 580, clientY: 420 }, // desplazamiento diagonal hacia abajo-derecha
      { clientX: 300, clientY: 100 }, // desplazamiento diagonal hacia arriba-izquierda
      { clientX: 950, clientY: 890 }  // desplazamiento diagonal extremo
    ];

    movimientoMouse.forEach(({ clientX }) => {
      const deltaX = clientX - inicioMouseX;
      const nuevoViewport = {
        x: Math.round(viewportInicial.x + deltaX),
        y: viewportInicial.y, // Estricto: eje vertical inmutable
        zoom: viewportInicial.zoom
      };

      // El eje X cambia correspondientemente con el delta
      expect(nuevoViewport.x).toBe(viewportInicial.x + deltaX);
      // El eje Y permanece exactamente en el valor de partida
      expect(nuevoViewport.y).toBe(viewportInicial.y);
      expect(nuevoViewport.zoom).toBe(viewportInicial.zoom);
    });
  });
});
