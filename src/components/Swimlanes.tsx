import React from 'react';
import { Users, Calendar, Layers } from 'lucide-react';

/**
 * Componente que renderiza los tres carriles de Scrum (Swimlanes).
 * Ocupan entre los tres la totalidad del viewport vertical divididos en tres partes
 * de exactamente la misma altura (33.333% cada uno).
 */
export const Swimlanes: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col pointer-events-none select-none z-0">
      {/* 1. Carril Superior: Personas (Roles) - 1/3 exacto del viewport vertical */}
      <div className="relative h-1/3 bg-amber-950/20 border-b border-amber-500/20 backdrop-blur-[1px] flex items-center px-6">
        <div className="flex items-center gap-3">
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
      </div>

      {/* 2. Carril Central: Eventos del Ciclo (Ceremonias) - 1/3 exacto del viewport vertical */}
      <div className="relative h-1/3 bg-indigo-950/20 border-b border-indigo-500/20 backdrop-blur-[1px] flex items-center px-6">
        <div className="flex items-center gap-3">
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
      </div>

      {/* 3. Carril Inferior: Documentos (Artefactos y Compromisos) - 1/3 exacto del viewport vertical */}
      <div className="relative h-1/3 bg-emerald-950/20 backdrop-blur-[1px] flex items-center px-6">
        <div className="flex items-center gap-3">
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
    </div>
  );
};
