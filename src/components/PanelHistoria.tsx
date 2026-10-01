import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Compass, RotateCcw } from 'lucide-react';
import type { CapituloHistoria } from '../data/datosHistoria';

interface PanelHistoriaProps {
  capitulo: CapituloHistoria;
  pasoActual: number;
  totalPasos: number;
  onSiguiente: () => void;
  onAnterior: () => void;
  onIrAPaso: (paso: number) => void;
  onAlternarModoMapa: () => void;
}

/**
 * Tarjeta interactiva inferior que guía al usuario paso a paso a través de la historia de Scrum.
 */
export const PanelHistoria: React.FC<PanelHistoriaProps> = ({
  capitulo,
  pasoActual,
  totalPasos,
  onSiguiente,
  onAnterior,
  onIrAPaso,
  onAlternarModoMapa
}) => {
  const esUltimoPaso = pasoActual === totalPasos - 1;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl z-30 pointer-events-auto">
      <div className="bg-[#1C1C1E]/95 backdrop-blur-2xl border border-zinc-700/70 rounded-3xl p-5 shadow-2xl shadow-black/60 transition-all">
        {/* Fila Superior: Indicador de Paso y Barra de Progreso */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold tracking-wide">
              Etapa {capitulo.pasoNumero} de {totalPasos}
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              {capitulo.subtitulo}
            </span>
          </div>

          {/* Selector de Pasos en Segmentos */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPasos }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onIrAPaso(idx)}
                aria-label={`Ir al paso ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === pasoActual
                    ? 'w-7 bg-indigo-400 shadow-md shadow-indigo-500/40'
                    : idx < pasoActual
                    ? 'w-2.5 bg-indigo-600/70 hover:bg-indigo-500'
                    : 'w-2.5 bg-zinc-800 hover:bg-zinc-700'
                }`}
              />
            ))}
          </div>

          {/* Botón para ver Mapa Completo */}
          <button
            onClick={onAlternarModoMapa}
            className="flex items-center gap-1.5 px-3 py-1 text-xs text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 rounded-xl border border-zinc-800 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-zinc-400" />
            <span>Ver Mapa Completo</span>
          </button>
        </div>

        {/* Cuerpo del Relato */}
        <div className="mb-4">
          <h2 className="text-base font-extrabold text-white tracking-tight mb-1 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
            {capitulo.titulo}
          </h2>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-3xl">
            {capitulo.narrativa}
          </p>
        </div>

        {/* Fila Inferior: Controles de Navegación y Sugerencia Interactiva */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
          <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Haz clic en cualquier tarjeta del diagrama para abrir su ficha técnica detallada.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAnterior}
              disabled={pasoActual === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                pasoActual === 0
                  ? 'opacity-30 cursor-not-allowed bg-zinc-900 text-zinc-600 border border-zinc-800'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 shadow-sm'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            {esUltimoPaso ? (
              <button
                onClick={() => onIrAPaso(0)}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Historia</span>
              </button>
            ) : (
              <button
                onClick={onSiguiente}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 transition-all hover:translate-x-0.5"
              >
                <span>Continuar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
