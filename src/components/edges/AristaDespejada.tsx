import React from 'react';
import {
  BaseEdge,
  getSmoothStepPath,
  type EdgeProps
} from '@xyflow/react';

interface DatosAristaPersonalizada {
  offset?: number;
  borderRadius?: number;
}

/**
 * Componente de arista con halo de despeje y enrutamiento con desplazamiento (offset) dinámico.
 * Evita que las relaciones colisionen o se fusionen visualmente al cruzarse o compartir carriles.
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
  data
}) => {
  const datos = (data as DatosAristaPersonalizada) || {};
  const offsetPersonalizado = datos.offset ?? 25;
  const radioBorde = datos.borderRadius ?? 16;

  const [edgePath] = getSmoothStepPath({
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
    </>
  );
};
