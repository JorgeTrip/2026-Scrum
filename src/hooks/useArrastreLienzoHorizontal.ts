import { useRef, useCallback, useState } from 'react';
import { useReactFlow, type Viewport } from '@xyflow/react';

/**
 * Hook que restringe el desplazamiento táctil/ratón del fondo del lienzo exclusivamente al eje horizontal.
 * Garantiza que la altura vertical de los carriles y nodos permanezca fija y alineada con los swimlanes.
 */
export function useArrastreLienzoHorizontal() {
  const { getViewport, setViewport } = useReactFlow();
  const estaArrastrandoFondoRef = useRef(false);
  const inicioXRef = useRef(0);
  const inicioViewportRef = useRef<Viewport>({ x: 0, y: 0, zoom: 1 });
  const [estaArrastrandoFondo, setEstaArrastrandoFondo] = useState(false);

  const alIniciarArrastre = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;

      // Si el clic es sobre un nodo, arista, control de zoom, botón o panel flotante, no arrastrar fondo
      if (
        target.closest('.react-flow__node') ||
        target.closest('.react-flow__edge') ||
        target.closest('.react-flow__controls') ||
        target.closest('.nodrag') ||
        target.closest('button')
      ) {
        return;
      }

      estaArrastrandoFondoRef.current = true;
      inicioXRef.current = e.clientX;
      inicioViewportRef.current = getViewport();
      setEstaArrastrandoFondo(true);
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [getViewport]
  );

  const alMoverLienzo = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!estaArrastrandoFondoRef.current) return;
      const deltaX = e.clientX - inicioXRef.current;
      const vp = inicioViewportRef.current;
      setViewport({
        x: Math.round(vp.x + deltaX),
        y: vp.y, // Estricto: cero movimiento en el eje vertical
        zoom: vp.zoom
      });
    },
    [setViewport]
  );

  const alFinalizarArrastre = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!estaArrastrandoFondoRef.current) return;
    estaArrastrandoFondoRef.current = false;
    setEstaArrastrandoFondo(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignorar si el pointer ya no está capturado
    }
  }, []);

  return {
    estaArrastrandoFondo,
    alIniciarArrastre,
    alMoverLienzo,
    alFinalizarArrastre
  };
}
