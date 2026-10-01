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

interface DatosAristaPersonalizada {
  offset?: number;
  borderRadius?: number;
}

/**
 * Componente de arista con halo de despeje y etiqueta interactiva deslizable a lo largo de su trayectoria.
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
  const { screenToFlowPosition } = useReactFlow();

  // Escucha restablecimiento global de posiciones para sincronizar la etiqueta
  useEffect(() => {
    const alRestablecer = () => {
      setPosicionDesplazada(null);
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

  const coordX = posicionDesplazada?.x ?? labelX;
  const coordY = posicionDesplazada?.y ?? labelY;

  const iniciarArrastreEtiqueta = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    setEstaArrastrando(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const moverEtiqueta = useCallback(
    (e: React.PointerEvent) => {
      if (!estaArrastrando || !refRuta.current) return;
      e.stopPropagation();

      const puntoFlujo = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const puntoProyectado = proyectarPuntoEnTrayectoria(refRuta.current, puntoFlujo);
      setPosicionDesplazada(puntoProyectado);
      guardarPosicionEtiqueta(id, puntoProyectado);
    },
    [estaArrastrando, screenToFlowPosition, id]
  );

  const finalizarArrastreEtiqueta = useCallback(
    (e: React.PointerEvent) => {
      if (!estaArrastrando) return;
      e.stopPropagation();
      setEstaArrastrando(false);
      if (posicionDesplazada) {
        guardarPosicionEtiqueta(id, posicionDesplazada);
      }
    },
    [estaArrastrando, id, posicionDesplazada]
  );

  return (
    <>
      {/* Halo de fondo: Provee despegue y sirve como referencia geométrica para proyectar el arrastre */}
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
      <BaseEdge
        id={id}
        path={edgePath}
        style={style}
        markerEnd={markerEnd}
      />

      {/* Etiqueta deslizable magnéticamente a lo largo de la trayectoria */}
      {label && (
        <EdgeLabelRenderer>
          <div
            onPointerDown={iniciarArrastreEtiqueta}
            onPointerMove={moverEtiqueta}
            onPointerUp={finalizarArrastreEtiqueta}
            onPointerCancel={finalizarArrastreEtiqueta}
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${coordX}px,${coordY}px)`,
              pointerEvents: 'all'
            }}
            title="Arrastra esta etiqueta para moverla a lo largo de la trayectoria"
            className={`nodrag nopan nowheel px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-xl backdrop-blur-md whitespace-nowrap z-10 select-none transition-all ${
              estaArrastrando
                ? 'cursor-grabbing bg-indigo-600 text-white border-2 border-indigo-400 scale-105 shadow-indigo-500/30'
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
