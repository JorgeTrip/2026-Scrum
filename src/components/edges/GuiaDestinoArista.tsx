import React from 'react';
import { EdgeLabelRenderer } from '@xyflow/react';
import type { Punto2D } from '../../utils/trayectoriaUtilidades';

interface GuiaDestinoAristaProps {
  label: string;
  puntoDestino: Punto2D;
  puntoCursor: Punto2D;
}

/**
 * Componente visual que proporciona retroalimentación predictiva durante el arrastre de una etiqueta.
 * Muestra el anclaje magnético sobre la arista, una silueta fantasma en el destino exacto
 * y una línea guía de tensión que conecta el cursor con la trayectoria.
 */
export const GuiaDestinoArista: React.FC<GuiaDestinoAristaProps> = ({
  label,
  puntoDestino,
  puntoCursor
}) => {
  return (
    <>
      {/* Línea conectora entre la posición que sostiene el usuario y el punto donde se anclará */}
      <svg
        className="pointer-events-none absolute inset-0 overflow-visible z-20"
        style={{ width: '100%', height: '100%' }}
      >
        <line
          x1={puntoCursor.x}
          y1={puntoCursor.y}
          x2={puntoDestino.x}
          y2={puntoDestino.y}
          stroke="#818CF8"
          strokeWidth={1.5}
          strokeDasharray="3 3"
          className="opacity-70 animate-pulse"
        />
        {/* Punto de anclaje luminoso sobre la curva de la arista */}
        <circle
          cx={puntoDestino.x}
          cy={puntoDestino.y}
          r={5}
          fill="#6366F1"
          stroke="#FFFFFF"
          strokeWidth={2}
          className="shadow-lg shadow-indigo-500/50"
        />
      </svg>

      {/* Etiqueta fantasma (Ghost Preview) que muestra exactamente el destino final al soltar */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${puntoDestino.x}px,${puntoDestino.y}px)`,
            pointerEvents: 'none'
          }}
          className="px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-2xl backdrop-blur-md whitespace-nowrap z-20 select-none border-2 border-dashed border-indigo-400 bg-indigo-950/90 text-indigo-200 opacity-90 scale-95 transition-all"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            {label}
          </span>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
