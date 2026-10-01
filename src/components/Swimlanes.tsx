import React, { useState, useEffect } from 'react';
import { useViewport } from '@xyflow/react';
import { Users, Calendar, Layers } from 'lucide-react';

/** Centro Y de gravedad del conjunto de nodos en el flujo de Scrum */
const CENTRO_NODOS_Y = 320;
/** Altura mínima de carril en coordenadas de flujo para albergar los nodos con holgura */
const ALTURA_MINIMA_CARRIL = 230;

/**
 * Componente de Swimlanes reactivo al zoom y al paneo de React Flow.
 * Garantiza que:
 * 1. Cada sección de color tenga exactamente la misma altura (1:1:1).
 * 2. Entre los tres cubran el 100% del viewport vertical en cualquier nivel de zoom.
 * 3. Su ubicación vertical y escala se ajusten dinámicamente con la rueda del ratón y controles en pantalla.
 */
export const Swimlanes: React.FC = () => {
  const { x, y, zoom } = useViewport();

  const [altoViewport, setAltoViewport] = useState(() =>
    typeof window !== 'undefined' ? Math.max(window.innerHeight - 64, 600) : 700
  );

  useEffect(() => {
    const alRedimensionar = () => {
      setAltoViewport(Math.max(window.innerHeight - 64, 600));
    };
    window.addEventListener('resize', alRedimensionar);
    return () => window.removeEventListener('resize', alRedimensionar);
  }, []);

  // Altura exacta de cada carril en pantalla para que los 3 juntos cubran al menos el viewport vertical
  const alturaEnPantalla = Math.max(altoViewport / 3, ALTURA_MINIMA_CARRIL * zoom);
  // Altura proporcional correspondiente en el espacio de coordenadas del flujo
  const alturaEnFlujo = alturaEnPantalla / (zoom || 1);
  // Posición inicial Y para que los carriles queden simétricamente centrados sobre los nodos
  const yInicio = CENTRO_NODOS_Y - alturaEnFlujo * 1.5;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-visible"
      style={{
        transform: `translate(${x}px, ${y}px) scale(${zoom})`,
        transformOrigin: '0 0'
      }}
    >
      {/* 1. Carril Superior: Personas (Roles) */}
      <div
        style={{
          top: `${yInicio}px`,
          height: `${alturaEnFlujo}px`,
          left: '-4000px',
          width: '8000px'
        }}
        className="absolute border-b border-amber-500/25 bg-amber-950/15 backdrop-blur-[1px] transition-colors"
      />

      {/* 2. Carril Central: Eventos del Ciclo (Ceremonias) */}
      <div
        style={{
          top: `${yInicio + alturaEnFlujo}px`,
          height: `${alturaEnFlujo}px`,
          left: '-4000px',
          width: '8000px'
        }}
        className="absolute border-b border-indigo-500/25 bg-indigo-950/15 backdrop-blur-[1px] transition-colors"
      />

      {/* 3. Carril Inferior: Documentos (Artefactos y Compromisos) */}
      <div
        style={{
          top: `${yInicio + alturaEnFlujo * 2}px`,
          height: `${alturaEnFlujo}px`,
          left: '-4000px',
          width: '8000px'
        }}
        className="absolute border-b border-emerald-500/25 bg-emerald-950/15 backdrop-blur-[1px] transition-colors"
      />

      {/* Etiqueta Roles */}
      <div
        style={{ top: `${yInicio + 25}px` }}
        className="absolute left-[-260px] flex items-center gap-3"
      >
        <div className="p-2 rounded-xl bg-[#1C1C1E]/90 border border-amber-500/30 shadow-lg">
          <Users className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
            Personas (Roles)
          </h2>
          <p className="text-[11px] text-zinc-400 max-w-xs mt-0.5">
            Quienes componen el Scrum Team y sus responsabilidades
          </p>
        </div>
      </div>

      {/* Etiqueta Eventos */}
      <div
        style={{ top: `${yInicio + alturaEnFlujo + 25}px` }}
        className="absolute left-[-260px] flex items-center gap-3"
      >
        <div className="p-2 rounded-xl bg-[#1C1C1E]/90 border border-indigo-500/30 shadow-lg">
          <Calendar className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
            Eventos del Ciclo (Ceremonias)
          </h2>
          <p className="text-[11px] text-zinc-400 max-w-xs mt-0.5">
            Ocasiones formales para la inspección y adaptación continua
          </p>
        </div>
      </div>

      {/* Etiqueta Artefactos */}
      <div
        style={{ top: `${yInicio + alturaEnFlujo * 2 + 25}px` }}
        className="absolute left-[-260px] flex items-center gap-3"
      >
        <div className="p-2 rounded-xl bg-[#1C1C1E]/90 border border-emerald-500/30 shadow-lg">
          <Layers className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
            Documentos (Artefactos y Compromisos)
          </h2>
          <p className="text-[11px] text-zinc-400 max-w-xs mt-0.5">
            Trabajo y valor que aportan transparencia e inspección
          </p>
        </div>
      </div>
    </div>
  );
};
