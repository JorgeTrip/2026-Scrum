import React, { useState } from 'react';
import { Info, X, GitCommit, RefreshCw, Zap } from 'lucide-react';

/**
 * Componente interactivo que explica la simbología y significado metodológico
 * de las líneas continuas, punteadas y animadas del flujo Scrum.
 */
export const LeyendaRelaciones: React.FC = () => {
  const [abierta, setAbierta] = useState(false);

  return (
    <div className="absolute bottom-6 right-6 z-20 pointer-events-auto select-none">
      {abierta ? (
        <div className="w-80 bg-[#1C1C1E]/95 backdrop-blur-2xl border border-zinc-700/80 rounded-2xl p-4 shadow-2xl shadow-black/80 text-xs text-zinc-300 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800">
            <div className="flex items-center gap-1.5 font-bold text-white text-xs">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Significado de las Relaciones</span>
            </div>
            <button
              onClick={() => setAbierta(false)}
              aria-label="Cerrar leyenda"
              className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* 1. Línea Continua */}
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="w-7 h-5 flex items-center justify-center shrink-0">
                <div className="w-6 h-0.5 bg-indigo-400 rounded-full" />
              </div>
              <div>
                <span className="font-semibold text-white block text-[11px]">
                  Línea Continua (Flujo Directo)
                </span>
                <p className="text-[10px] text-zinc-400 leading-relaxed mt-0.5">
                  Indica el avance secuencial y las responsabilidades directas dentro del Sprint actual (ej. creación de artefactos, facilitación y ceremonias).
                </p>
              </div>
            </div>

            {/* 2. Línea Punteada */}
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-pink-950/20 border border-pink-500/20">
              <div className="w-7 h-5 flex items-center justify-center shrink-0">
                <div className="w-6 border-t-2 border-dashed border-pink-400" />
              </div>
              <div>
                <span className="font-semibold text-pink-300 block text-[11px] flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Línea Punteada (Bucle Empírico)
                </span>
                <p className="text-[10px] text-zinc-400 leading-relaxed mt-0.5">
                  Representa la retroalimentación y adaptación al siguiente ciclo. No es una tarea directa, sino el aprendizaje de la Retrospectiva que regresa a nutrir el Product Backlog.
                </p>
              </div>
            </div>

            {/* 3. Línea Animada */}
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="w-7 h-5 flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <span className="font-semibold text-white block text-[11px]">
                  Línea con Animación
                </span>
                <p className="text-[10px] text-zinc-400 leading-relaxed mt-0.5">
                  Señala flujos de valor en constante transformación activa (ej. PBI que entran a planificarse, o tareas que devienen en el Incremento).
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAbierta(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C1C1E]/90 hover:bg-[#252528] text-zinc-300 hover:text-white border border-zinc-700/80 shadow-xl backdrop-blur-xl text-xs font-semibold transition-all group"
        >
          <GitCommit className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span>Leyenda de Líneas</span>
        </button>
      )}
    </div>
  );
};
