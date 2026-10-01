import { useState, useRef, useCallback, useEffect } from 'react';
import {
  proyectarParametroEnTrayectoria,
  obtenerPuntoEnTrayectoriaPorT,
  type Punto2D
} from '../utils/trayectoriaUtilidades';
import {
  guardarEstadoEtiqueta,
  obtenerEstadoEtiqueta,
  type EstadoEtiquetaArista
} from '../utils/persistenciaPosiciones';

const UMBRAL_MOVIMIENTO_PX = 3;

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
 * Hook para gestionar la elevación de etiqueta, arrastre fluido y deformación elástica de aristas.
 * Garantiza que exista una única etiqueta que se levanta al presionar y acompaña al ratón hasta su destino.
 */
const estadosPredeterminadosAristas: Record<string, EstadoEtiquetaArista> = {
  'edge-po-to-vision': { t: 0.538, desvio: -19 },
  'edge-sprint-to-planning': { t: 0.413, desvio: 4 },
  'edge-planning-to-sb': { t: 0.45, desvio: -3 },
  'edge-retro-to-next-cycle': { t: 0.438, desvio: 248 },
  'edge-planning-to-daily': { t: 0.488, desvio: 0 },
  'edge-devs-to-sb': { t: 0.488, desvio: -36 },
  'edge-increment-to-review': { t: 0.388, desvio: 33 },
  'edge-sm-to-sprint': { t: 0.5, desvio: 0 },
  'edge-sm-to-devs': { t: 0.5, desvio: 0 },
  'edge-sm-to-po': { t: 0.5, desvio: 0 },
  'edge-sm-to-increment': { t: 0.5, desvio: 0 },
  'edge-po-to-planning': { t: 0.5, desvio: 0 },
  'edge-po-to-devs': { t: 0.5, desvio: 0 },
  'edge-po-to-review': { t: 0.5, desvio: 0 }
};

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
    return obtenerEstadoEtiqueta(id) ?? estadosPredeterminadosAristas[id] ?? { t: 0.5, desvio: 0 };
  });

  const [estaPresionada, setEstaPresionada] = useState(false);
  const [estaArrastrando, setEstaArrastrando] = useState(false);
  const [destinoProyectado, setDestinoProyectado] = useState<Punto2D | null>(null);
  const [cursorFlotante, setCursorFlotante] = useState<Punto2D | null>(null);
  const [desvioTemporal, setDesvioTemporal] = useState<number | null>(null);
  const tTemporalRef = useRef<number>(estadoArista.t);

  const inicioPointerRef = useRef<Punto2D | null>(null);
  const superoUmbralRef = useRef(false);

  useEffect(() => {
    const alRestablecer = () => {
      setEstadoArista(estadosPredeterminadosAristas[id] ?? { t: 0.5, desvio: 0 });
      setDesvioTemporal(null);
      setDestinoProyectado(null);
      setCursorFlotante(null);
      setEstaPresionada(false);
      setEstaArrastrando(false);
    };
    window.addEventListener('restablecer-posiciones-scrum', alRestablecer);
    return () => window.removeEventListener('restablecer-posiciones-scrum', alRestablecer);
  }, [id]);

  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const esHorizontal = Math.abs(dx) >= Math.abs(dy);

  // Calcula posición actual sobre la curva
  const puntoBaseCurva: Punto2D = (() => {
    if (refRuta.current) {
      return obtenerPuntoEnTrayectoriaPorT(refRuta.current, estadoArista.t);
    }
    const t = estadoArista.t;
    const mx = sourceX + dx * t;
    const my = sourceY + dy * t + (esHorizontal ? (estadoArista.desvio ?? 0) : 0);
    return { x: Math.round(mx), y: Math.round(my) };
  })();

  const iniciarArrastreEtiqueta = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      inicioPointerRef.current = { x: e.clientX, y: e.clientY };
      superoUmbralRef.current = false;
      setEstaPresionada(true);
      setDestinoProyectado(puntoBaseCurva);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [puntoBaseCurva]
  );

  const moverEtiqueta = useCallback(
    (e: React.PointerEvent) => {
      if (!inicioPointerRef.current || !refRuta.current) return;
      e.stopPropagation();

      const distX = e.clientX - inicioPointerRef.current.x;
      const distY = e.clientY - inicioPointerRef.current.y;
      if (!superoUmbralRef.current) {
        if (Math.hypot(distX, distY) < UMBRAL_MOVIMIENTO_PX) return;
        superoUmbralRef.current = true;
        setEstaArrastrando(true);
      }

      const puntoFlujo = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const { t, punto } = proyectarParametroEnTrayectoria(refRuta.current, puntoFlujo);

      // Desvío perpendicular para deformar y empujar la línea de relación
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
      if (superoUmbralRef.current && destinoProyectado) {
        const nuevoEstado: EstadoEtiquetaArista = {
          t: tTemporalRef.current,
          desvio: desvioTemporal ?? estadoArista.desvio ?? 0
        };
        setEstadoArista(nuevoEstado);
        guardarEstadoEtiqueta(id, nuevoEstado);
      }
      setEstaPresionada(false);
      setEstaArrastrando(false);
      setDestinoProyectado(null);
      setCursorFlotante(null);
      setDesvioTemporal(null);
      inicioPointerRef.current = null;
      superoUmbralRef.current = false;
    },
    [destinoProyectado, desvioTemporal, estadoArista.desvio, id]
  );

  const desvioEfectivo = desvioTemporal ?? estadoArista.desvio ?? 0;

  return {
    estadoArista,
    desvioEfectivo,
    estaPresionada,
    estaArrastrando,
    destinoProyectado,
    cursorFlotante,
    puntoBaseCurva,
    iniciarArrastreEtiqueta,
    moverEtiqueta,
    finalizarArrastreEtiqueta
  };
}
