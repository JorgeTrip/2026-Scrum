import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps
} from '@xyflow/react';

interface DatosAristaPersonalizada {
  offset?: number;
  borderRadius?: number;
}

/**
 * Componente de arista con halo de despeje, enrutamiento por corredores y etiquetas legibles.
 * Evita colisiones de relaciones y renderiza la etiqueta formal de la conexión.
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

  return (
    <>
      {/* Halo de fondo (Corte visual): Despega físicamente la línea de cualquier otra que la cruce */}
      <path
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

      {/* Etiqueta formal de la relación con fondo tipo píldora para legibilidad total */}
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'none'
            }}
            className="nodrag nopan nowheel px-2 py-0.5 rounded-lg bg-[#1C1C1E]/95 border border-zinc-700/90 text-[10px] font-semibold text-zinc-300 shadow-md backdrop-blur-md whitespace-nowrap z-10"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
