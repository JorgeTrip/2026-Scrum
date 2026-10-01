/**
 * Custom hook para hacer cualquier elemento arrastrable dentro de los límites de la ventana.
 */

import { useState, useRef, useCallback, useEffect } from 'react';

interface Coordenadas {
  x: number;
  y: number;
}

interface Dimensiones {
  ancho: number;
  alto: number;
}

interface Ventana {
  anchoVentana: number;
  altoVentana: number;
}

/**
 * Restringe las coordenadas para que el elemento no se salga de la pantalla visible.
 */
export function limitarCoordenadasDentroDePantalla(
  deseada: Coordenadas,
  elemento: Dimensiones,
  ventana: Ventana,
  margen = 10
): Coordenadas {
  const maxX = Math.max(margen, ventana.anchoVentana - elemento.ancho - margen);
  const maxY = Math.max(margen, ventana.altoVentana - elemento.alto - margen);

  return {
    x: Math.min(Math.max(deseada.x, margen), maxX),
    y: Math.min(Math.max(deseada.y, margen), maxY)
  };
}

export function useArrastrable(posicionInicial: Coordenadas = { x: 24, y: 80 }) {
  const [posicion, setPosicion] = useState<Coordenadas>(posicionInicial);
  const [estaArrastrando, setEstaArrastrando] = useState(false);
  const refElemento = useRef<HTMLDivElement>(null);
  const desfaseRef = useRef<Coordenadas>({ x: 0, y: 0 });

  const iniciarArrastre = useCallback((e: React.PointerEvent) => {
    // Solo arrastrar si se hace clic con el botón principal
    if (e.button !== 0) return;

    if (refElemento.current) {
      const rect = refElemento.current.getBoundingClientRect();
      desfaseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setEstaArrastrando(true);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    }
  }, []);

  useEffect(() => {
    if (!estaArrastrando) return;

    const manejarMovimiento = (e: PointerEvent) => {
      const anchoElemento = refElemento.current?.offsetWidth ?? 380;
      const altoElemento = refElemento.current?.offsetHeight ?? 250;

      const nuevaPosicion = limitarCoordenadasDentroDePantalla(
        {
          x: e.clientX - desfaseRef.current.x,
          y: e.clientY - desfaseRef.current.y
        },
        { ancho: anchoElemento, alto: altoElemento },
        { anchoVentana: window.innerWidth, altoVentana: window.innerHeight }
      );

      setPosicion(nuevaPosicion);
    };

    const manejarFinArrastre = () => {
      setEstaArrastrando(false);
    };

    window.addEventListener('pointermove', manejarMovimiento);
    window.addEventListener('pointerup', manejarFinArrastre);
    window.addEventListener('pointercancel', manejarFinArrastre);

    return () => {
      window.removeEventListener('pointermove', manejarMovimiento);
      window.removeEventListener('pointerup', manejarFinArrastre);
      window.removeEventListener('pointercancel', manejarFinArrastre);
    };
  }, [estaArrastrando]);

  return {
    posicion,
    estaArrastrando,
    refElemento,
    iniciarArrastre
  };
}
