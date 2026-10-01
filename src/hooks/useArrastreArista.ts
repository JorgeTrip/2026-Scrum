import { useState, useRef, useCallback, useEffect } from 'react';
import {
  proyectarParametroEnTrayectoria,
  type Punto2D
} from '../utils/trayectoriaUtilidades';
import {
  guardarEstadoEtiqueta,
  obtenerEstadoEtiqueta,
  type EstadoEtiquetaArista
} from '../utils/persistenciaPosiciones';

const UMBRAL_ARRASTRE_PX = 6;

interface PropiedadesArrastreArista {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  refRuta: React.RefObject<SVGPathElement | null>;
  screenToFlowPosition: (clientPos: { x: number; y: number }) => { x: number; y: number };
}

/**
 * Hook para gestionar el arrastre de etiquetas y la deformación elástica de relaciones.
 * Permite deslizar a lo largo de la línea (t) o empujarla perpendicularmente (desvío).
 */
export function useArrastreArista({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  refRuta,
  screenToFlowPosition
}: PropiedadesArrastreArista) {
  const [estadoArista, setEstadoArista] = useState<EstadoEtiquetaArista>(() => {
    return obtenerEstadoEtiqueta(id) ?? { t: 0.5, desvio: 0 };
  });

  const [estaArrastrando, setEstaArrastrando] = useState(false);
  const [destinoProyectado, setDestinoProyectado] = useState<Punto2D | null>(null);
  const [cursorFlotante, setCursorFlotante] = useState<Punto2D | null>(null);
  const [desvioTemporal, setDesvioTemporal] = useState<number | null>(null);
  const tTemporalRef = useRef<number>(estadoArista.t);

  const inicioPointerRef = useRef<Punto2D | null>(null);
  const superoUmbralRef = useRef(false);

  useEffect(() => {
    const alRestablecer = () => {
      setEstadoArista({ t: 0.5, desvio: 0 });
      setDesvioTemporal(null);
      setDestinoProyectado(null);
      setCursorFlotante(null);
    };
    window.addEventListener('restablecer-posiciones-scrum', alRestablecer);
    return () => window.removeEventListener('restablecer-posiciones-scrum', alRestablecer);
  }, []);

  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const esHorizontal = Math.abs(dx) >= Math.abs(dy);

  const iniciarArrastreEtiqueta = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    inicioPointerRef.current = { x: e.clientX, y: e.clientY };
    superoUmbralRef.current = false;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const moverEtiqueta = useCallback(
    (e: React.PointerEvent) => {
      if (!inicioPointerRef.current || !refRuta.current) return;
      e.stopPropagation();

      const distX = e.clientX - inicioPointerRef.current.x;
      const distY = e.clientY - inicioPointerRef.current.y;
      if (!superoUmbralRef.current) {
        if (Math.hypot(distX, distY) < UMBRAL_ARRASTRE_PX) return;
        superoUmbralRef.current = true;
        setEstaArrastrando(true);
      }

      const puntoFlujo = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const { t, punto } = proyectarParametroEnTrayectoria(refRuta.current, puntoFlujo);

      // Calcula desvío perpendicular para empujar la línea de relación
      const desvioActual = esHorizontal
        ? puntoFlujo.y - (sourceY + targetY) / 2
        : puntoFlujo.x - (sourceX + targetX) / 2;

      tTemporalRef.current = t;
      setDesvioTemporal(Math.round(desvioActual));
      setCursorFlotante(puntoFlujo);
      setDestinoProyectado(punto);
    },
    [esHorizontal, refRuta, screenToFlowPosition, sourceX, sourceY, targetX, targetY]
  );

  const finalizarArrastreEtiqueta = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      if (superoUmbralRef.current) {
        const nuevoEstado: EstadoEtiquetaArista = {
          t: tTemporalRef.current,
          desvio: desvioTemporal ?? estadoArista.desvio ?? 0
        };
        setEstadoArista(nuevoEstado);
        guardarEstadoEtiqueta(id, nuevoEstado);
      }
      setEstaArrastrando(false);
      setDestinoProyectado(null);
      setCursorFlotante(null);
      setDesvioTemporal(null);
      inicioPointerRef.current = null;
      superoUmbralRef.current = false;
    },
    [desvioTemporal, estadoArista.desvio, id]
  );

  const desvioEfectivo = desvioTemporal ?? estadoArista.desvio ?? 0;

  return {
    estadoArista,
    desvioEfectivo,
    estaArrastrando,
    destinoProyectado,
    cursorFlotante,
    iniciarArrastreEtiqueta,
    moverEtiqueta,
    finalizarArrastreEtiqueta
  };
}
