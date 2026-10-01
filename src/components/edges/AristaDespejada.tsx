import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  useReactFlow,
  type EdgeProps
} from '@xyflow/react';
import { proyectarPuntoEnTrayectoria, type Punto2D } from '../../utils/trayectoriaUtilidades';
import {
  guardarPosicionEtiqueta,
  obtenerPosicionEtiqueta
} from '../../utils/persistenciaPosiciones';
import { GuiaDestinoArista } from './GuiaDestinoArista';

/** Distancia mínima en píxeles antes de activar el arrastre, evitando movimientos no deseados */
const UMBRAL_ARRASTRE_PX = 6;

interface DatosAristaPersonalizada {
  offset?: number;
  borderRadius?: number;
}

/**
 * Componente de arista con halo de despeje, arrastre amortiguado y previsualización de destino.
 */
export const AristaDespejada: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
  data
}) => {
  const datos = (data as DatosAristaPersonalizada) || {};
  const offsetPersonalizado = datos.offset ?? 25;
  const radioBorde = datos.borderRadius ?? 16;

  const refRuta = useRef<SVGPathElement>(null);
  const [posicionDesplazada, setPosicionDesplazada] = useState<Punto2D | null>(() => {
    return obtenerPosicionEtiqueta(id);
  });

  const [estaArrastrando, setEstaArrastrando] = useState(false);
  const [destinoProyectado, setDestinoProyectado] = useState<Punto2D | null>(null);
  const [cursorFlotante, setCursorFlotante] = useState<Punto2D | null>(null);

  const inicioPointerRef = useRef<Punto2D | null>(null);
  const superoUmbralRef = useRef(false);

  const { screenToFlowPosition } = useReactFlow();

  // Escucha restablecimiento global de posiciones para reiniciar la etiqueta
  useEffect(() => {
    const alRestablecer = () => {
      setPosicionDesplazada(null);
      setDestinoProyectado(null);
      setCursorFlotante(null);
    };
    window.addEventListener('restablecer-posiciones-scrum', alRestablecer);
    return () => window.removeEventListener('restablecer-posiciones-scrum', alRestablecer);
  }, []);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: radioBorde,
    offset: offsetPersonalizado
  });

  // Coordenada actual de la etiqueta en reposo
  const coordX = posicionDesplazada?.x ?? labelX;
  const coordY = posicionDesplazada?.y ?? labelY;

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

      const dx = e.clientX - inicioPointerRef.current.x;
      const dy = e.clientY - inicioPointerRef.current.y;
      const dist = Math.hypot(dx, dy);

      // Bloquea movimientos bruscos mientras se mantiene presionada la etiqueta
      if (!superoUmbralRef.current) {
        if (dist < UMBRAL_ARRASTRE_PX) return;
        superoUmbralRef.current = true;
        setEstaArrastrando(true);
      }

      const puntoFlujo = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const proyectado = proyectarPuntoEnTrayectoria(refRuta.current, puntoFlujo);

      setCursorFlotante(puntoFlujo);
      setDestinoProyectado(proyectado);
    },
    [screenToFlowPosition]
  );

  const finalizarArrastreEtiqueta = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      if (superoUmbralRef.current && destinoProyectado) {
        setPosicionDesplazada(destinoProyectado);
        guardarPosicionEtiqueta(id, destinoProyectado);
      }
      setEstaArrastrando(false);
      setDestinoProyectado(null);
      setCursorFlotante(null);
      inicioPointerRef.current = null;
      superoUmbralRef.current = false;
    },
    [destinoProyectado, id]
  );

  // Posición renderizada de la etiqueta activa durante el arrastre o en reposo
  const renderX = estaArrastrando && cursorFlotante ? cursorFlotante.x : coordX;
  const renderY = estaArrastrando && cursorFlotante ? cursorFlotante.y : coordY;

  return (
    <>
      {/* Halo de corte de fondo */}
      <path
        ref={refRuta}
        d={edgePath}
        fill="none"
        stroke="#121214"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none transition-all duration-300"
      />

      {/* Línea principal coloreada y orientada */}
      <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />

      {/* Previsualización predictiva de destino y anclaje magnético sobre la trayectoria */}
      {estaArrastrando && destinoProyectado && cursorFlotante && label && (
        <GuiaDestinoArista
          label={String(label)}
          puntoDestino={destinoProyectado}
          puntoCursor={cursorFlotante}
        />
      )}

      {/* Etiqueta deslizable con umbral amortiguado de arrastre */}
      {label && (
        <EdgeLabelRenderer>
          <div
            onPointerDown={iniciarArrastreEtiqueta}
            onPointerMove={moverEtiqueta}
            onPointerUp={finalizarArrastreEtiqueta}
            onPointerCancel={finalizarArrastreEtiqueta}
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${renderX}px,${renderY}px)`,
              pointerEvents: 'all'
            }}
            title="Arrastra para reubicar. Muestra previsualización del destino sobre la trayectoria"
            className={`nodrag nopan nowheel px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-xl backdrop-blur-md whitespace-nowrap z-30 select-none transition-shadow ${
              estaArrastrando
                ? 'cursor-grabbing bg-indigo-600/95 text-white border-2 border-indigo-400 scale-105 shadow-2xl shadow-indigo-500/50'
                : 'cursor-grab bg-[#1C1C1E]/95 hover:bg-[#252528] text-zinc-200 border border-zinc-700/80 hover:border-zinc-500'
            }`}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
