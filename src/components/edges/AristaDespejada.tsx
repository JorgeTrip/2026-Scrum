import React, { useRef, useMemo } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,
  type EdgeProps
} from '@xyflow/react';
import {
  construirRutaSmoothStepConDesvio,
  obtenerPuntoEnTrayectoriaPorT,
  type Punto2D
} from '../../utils/trayectoriaUtilidades';
import { useArrastreArista } from '../../hooks/useArrastreArista';
import { GuiaDestinoArista } from './GuiaDestinoArista';

interface DatosAristaPersonalizada {
  offset?: number;
  borderRadius?: number;
}

/**
 * Componente de arista con halo de despeje, arrastre magnético a lo largo de la trayectoria
 * y capacidad elástica de empujar la línea de relación hacia los lados o arriba/abajo.
 */
export const AristaDespejada: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEnd,
  label,
  data
}) => {
  const datos = (data as DatosAristaPersonalizada) || {};
  const offsetPersonalizado = datos.offset ?? 25;
  const radioBorde = datos.borderRadius ?? 16;

  const refRuta = useRef<SVGPathElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const {
    estadoArista,
    desvioEfectivo,
    estaArrastrando,
    destinoProyectado,
    cursorFlotante,
    iniciarArrastreEtiqueta,
    moverEtiqueta,
    finalizarArrastreEtiqueta
  } = useArrastreArista({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    refRuta,
    screenToFlowPosition
  });

  // Genera la trayectoria de la relación incorporando el desvío elástico perpendicular
  const edgePath = useMemo(() => {
    return construirRutaSmoothStepConDesvio({
      sourceX,
      sourceY,
      targetX,
      targetY,
      desvio: desvioEfectivo,
      borderRadius: radioBorde,
      offset: offsetPersonalizado
    });
  }, [sourceX, sourceY, targetX, targetY, desvioEfectivo, radioBorde, offsetPersonalizado]);

  // Calcula la posición exacta de la etiqueta sobre la curva según su parámetro relativo t
  const puntoSobreCurva: Punto2D = useMemo(() => {
    if (refRuta.current) {
      return obtenerPuntoEnTrayectoriaPorT(refRuta.current, estadoArista.t);
    }
    // Fallback matemático antes del primer tick de medición del DOM
    const t = estadoArista.t;
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const esH = Math.abs(dx) >= Math.abs(dy);
    const mx = sourceX + dx * t;
    const my = sourceY + dy * t + (esH ? desvioEfectivo : 0);
    return { x: Math.round(mx), y: Math.round(my) };
  }, [estadoArista.t, sourceX, sourceY, targetX, targetY, desvioEfectivo]);

  const renderX = estaArrastrando && cursorFlotante ? cursorFlotante.x : puntoSobreCurva.x;
  const renderY = estaArrastrando && cursorFlotante ? cursorFlotante.y : puntoSobreCurva.y;

  return (
    <>
      {/* Halo de corte de fondo para despegue visual */}
      <path
        ref={refRuta}
        d={edgePath}
        fill="none"
        stroke="#121214"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none transition-all duration-75"
      />

      {/* Línea principal coloreada */}
      <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />

      {/* Previsualización predictiva: Anclaje y silueta fantasma en el destino proyectado */}
      {estaArrastrando && destinoProyectado && cursorFlotante && label && (
        <GuiaDestinoArista
          label={String(label)}
          puntoDestino={destinoProyectado}
          puntoCursor={cursorFlotante}
        />
      )}

      {/* Etiqueta interactiva: Se desliza longitudinalmente o empuja la relación perpendicularmente */}
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
            title="Arrastra a lo largo para acomodarla, o perpendicularmente para empujar la línea de relación"
            className={`nodrag nopan nowheel px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-xl backdrop-blur-md whitespace-nowrap z-30 select-none transition-all ${
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
