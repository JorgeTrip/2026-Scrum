import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Compass, RotateCcw, GripHorizontal, ShieldCheck } from 'lucide-react';
import type { CapituloHistoria } from '../data/datosHistoria';
import type { TipoHistoria } from '../hooks/useHistoriaScrum';
import { useArrastrable } from '../hooks/useArrastrable';

interface PanelHistoriaProps {
  capitulo: CapituloHistoria;
  pasoActual: number;
  totalPasos: number;
  tipoHistoria: TipoHistoria;
  onCambiarTipoHistoria: (tipo: TipoHistoria) => void;
  onSiguiente: () => void;
  onAnterior: () => void;
  onIrAPaso: (paso: number) => void;
  onAlternarModoMapa: () => void;
}

/**
 * Tarjeta interactiva arrastrable que guía al usuario paso a paso por la historia de Scrum.
 * Ubicada a la izquierda por defecto para no obstruir los nodos centrales.
 */
export const PanelHistoria: React.FC<PanelHistoriaProps> = ({
  capitulo,
  pasoActual,
  totalPasos,
  tipoHistoria,
  onCambiarTipoHistoria,
  onSiguiente,
  onAnterior,
  onIrAPaso,
  onAlternarModoMapa
}) => {
  const esUltimoPaso = pasoActual === totalPasos - 1;
  const { posicion, estaArrastrando, refElemento, iniciarArrastre } = useArrastrable({ x: 24, y: 84 });

  return (
    <div
      ref={refElemento}
      style={{ left: `${posicion.x}px`, top: `${posicion.y}px` }}
      className={`fixed z-30 w-[420px] max-w-[92vw] select-none pointer-events-auto transition-shadow duration-200 ${
        estaArrastrando ? 'cursor-grabbing shadow-2xl shadow-indigo-500/20 scale-[1.01]' : 'shadow-2xl shadow-black/80'
      }`}
    >
      <div className="bg-[#1C1C1E]/95 backdrop-blur-2xl border border-zinc-700/80 rounded-3xl p-5 overflow-hidden">
        {/* Barra superior de arrastre */}
        <div
          onPointerDown={iniciarArrastre}
          title="Mantén presionado para arrastrar este panel"
          className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 cursor-grab active:cursor-grabbing group"
        >
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold tracking-wide">
              Etapa {capitulo.pasoNumero} de {totalPasos}
            </span>
            <span className="text-[11px] text-zinc-400 font-medium truncate max-w-[180px]">
              {capitulo.subtitulo}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-zinc-300 transition-colors">
            <span className="text-[10px] font-medium hidden sm:inline">Mover</span>
            <GripHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Selector interactivo de Modo Historia: General vs Scrum Master */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900/90 rounded-2xl border border-zinc-800/80 mb-3.5 shadow-inner">
          <button
            type="button"
            onClick={() => onCambiarTipoHistoria('general')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
              tipoHistoria === 'general'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Flujo General</span>
          </button>
          <button
            type="button"
            onClick={() => onCambiarTipoHistoria('scrum-master')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
              tipoHistoria === 'scrum-master'
                ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Scrum Master</span>
          </button>
        </div>

        {/* Segmentos de progreso de etapas */}
        <div className="flex items-center justify-between gap-1 mb-4">
          {Array.from({ length: totalPasos }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => onIrAPaso(idx)}
              aria-label={`Ir al paso ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === pasoActual
                  ? 'flex-1 bg-indigo-400 shadow-md shadow-indigo-500/40'
                  : idx < pasoActual
                  ? 'w-4 bg-indigo-600/70 hover:bg-indigo-500'
                  : 'w-3 bg-zinc-800 hover:bg-zinc-700'
              }`}
            />
          ))}
        </div>

        {/* Título y Narrativa didáctica */}
        <div className="mb-4">
          <h2 className="text-sm font-extrabold text-white tracking-tight mb-1.5 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{capitulo.titulo}</span>
          </h2>
          <p
            onWheel={(e) => e.stopPropagation()}
            className="nowheel text-xs text-zinc-300 leading-relaxed max-h-36 overflow-y-auto pr-1"
          >
            {capitulo.narrativa}
          </p>
        </div>

        {/* Sugerencia interactiva de clic */}
        <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 pb-3 border-b border-zinc-800/80 mb-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="truncate">Haz clic en cualquier tarjeta del diagrama para ver su ficha.</span>
        </div>

        {/* Botones de Navegación */}
        <div className="flex items-center justify-between">
          <button
            onClick={onAlternarModoMapa}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 rounded-xl border border-zinc-800 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-zinc-400" />
            <span>Ver Mapa</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onAnterior}
              disabled={pasoActual === 0}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                pasoActual === 0
                  ? 'opacity-30 cursor-not-allowed bg-zinc-900 text-zinc-600 border border-zinc-800'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            {esUltimoPaso ? (
              <button
                onClick={() => onIrAPaso(0)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            ) : (
              <button
                onClick={onSiguiente}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 transition-all hover:translate-x-0.5"
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
