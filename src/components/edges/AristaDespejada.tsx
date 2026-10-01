import React, { useRef, useMemo } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,
  type EdgeProps
} from '@xyflow/react';
import {
  construirRutaSmoothStepConDesvio
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
 * Utiliza una única etiqueta que se levanta al presionar y acompaña al ratón hasta su destino.
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
    desvioEfectivo,
    estaPresionada,
    estaArrastrando,
    destinoProyectado,
    cursorFlotante,
    puntoBaseCurva,
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

  // Posición de la etiqueta: se eleva sutilmente al presionar y acompaña al ratón al arrastrar
  const renderX = estaArrastrando && cursorFlotante ? cursorFlotante.x : puntoBaseCurva.x;
  const renderY = estaArrastrando && cursorFlotante
    ? cursorFlotante.y
    : estaPresionada
    ? puntoBaseCurva.y - 3
    : puntoBaseCurva.y;

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

      {/* Punto de anclaje de destino conservado y guía elástica hacia la etiqueta */}
      {(estaArrastrando || estaPresionada) && destinoProyectado && (
        <GuiaDestinoArista
          puntoDestino={destinoProyectado}
          puntoCursor={{ x: renderX, y: renderY }}
        />
      )}

      {/* Única etiqueta interactiva: se levanta al presionar y viaja con el puntero */}
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
            className={`nodrag nopan nowheel px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-xl backdrop-blur-md whitespace-nowrap z-30 select-none transition-all duration-75 ${
              estaArrastrando || estaPresionada
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
