import React from 'react';
import { useViewport } from '@xyflow/react';
import { Users, Calendar, Layers } from 'lucide-react';

/** Altura uniforme idéntica para cada una de las tres dimensiones de Scrum */
const ALTURA_SECCION = 230;

/**
 * Componente que renderiza los tres campos tricolor de Scrum (Swimlanes).
 * Cada sección de color ocupa exactamente la misma altura (230px) de forma homogénea,
 * sincronizándose con la transformación de paneo y zoom de React Flow.
 */
export const Swimlanes: React.FC = () => {
  const { x, y, zoom } = useViewport();

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-visible"
      style={{
        transform: `translate(${x}px, ${y}px) scale(${zoom})`,
        transformOrigin: '0 0'
      }}
    >
      {/* 1. Carril Superior: Personas / Roles (y: 0px a 230px) */}
      <div
        style={{
          top: '0px',
          height: `${ALTURA_SECCION}px`,
          left: '-4000px',
          width: '8000px'
        }}
        className="absolute border-b border-amber-500/25 bg-amber-950/15 backdrop-blur-[1px]"
      />

      {/* 2. Carril Medio: Eventos del Ciclo (y: 230px a 460px) */}
      <div
        style={{
          top: `${ALTURA_SECCION}px`,
          height: `${ALTURA_SECCION}px`,
          left: '-4000px',
          width: '8000px'
        }}
        className="absolute border-b border-indigo-500/25 bg-indigo-950/15 backdrop-blur-[1px]"
      />

      {/* 3. Carril Inferior: Documentos (y: 460px a 690px) */}
      <div
        style={{
          top: `${ALTURA_SECCION * 2}px`,
          height: `${ALTURA_SECCION}px`,
          left: '-4000px',
          width: '8000px'
        }}
        className="absolute border-b border-emerald-500/25 bg-emerald-950/15 backdrop-blur-[1px]"
      />

      {/* Etiqueta Roles */}
      <div
        style={{ top: '25px' }}
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
        style={{ top: `${ALTURA_SECCION + 25}px` }}
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
        style={{ top: `${ALTURA_SECCION * 2 + 25}px` }}
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
