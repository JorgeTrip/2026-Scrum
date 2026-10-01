import React from 'react';
import type { Punto2D } from '../../utils/trayectoriaUtilidades';

interface GuiaDestinoAristaProps {
  puntoDestino: Punto2D;
  puntoCursor: Punto2D;
}

/**
 * Componente visual que conserva el punto de destino en la trayectoria de la arista
 * y muestra una guía sutil de tensión conectada con la etiqueta que sostiene el usuario.
 */
export const GuiaDestinoArista: React.FC<GuiaDestinoAristaProps> = ({
  puntoDestino,
  puntoCursor
}) => {
  return (
    <svg
      className="pointer-events-none absolute inset-0 overflow-visible z-20"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Línea elástica que conecta la etiqueta sostenida con su destino en la arista */}
      <line
        x1={puntoCursor.x}
        y1={puntoCursor.y}
        x2={puntoDestino.x}
        y2={puntoDestino.y}
        stroke="#818CF8"
        strokeWidth={1.5}
        strokeDasharray="3 3"
        className="opacity-75 animate-pulse"
      />

      {/* Halo de destino magnético sobre la curva */}
      <circle
        cx={puntoDestino.x}
        cy={puntoDestino.y}
        r={9}
        fill="rgba(99, 102, 241, 0.25)"
        className="animate-ping"
      />

      {/* Punto de anclaje luminoso que marca el destino exacto al soltar */}
      <circle
        cx={puntoDestino.x}
        cy={puntoDestino.y}
        r={5.5}
        fill="#6366F1"
        stroke="#FFFFFF"
        strokeWidth={2}
        className="shadow-lg shadow-indigo-500/70"
      />
    </svg>
  );
};
