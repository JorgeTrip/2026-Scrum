import React from 'react';
import { X, Clock, ArrowRightCircle, CheckCircle, BookOpen, Users, Calendar, Layers } from 'lucide-react';
import type { DatosNodoScrum, CategoriaScrum } from '../../types/scrum';

interface TooltipFichaTecnicaProps {
  datos: DatosNodoScrum;
  onCerrar: (e: React.MouseEvent) => void;
}

/**
 * Tooltip enriquecido que emerge directamente del nodo seleccionado en el lienzo.
 * Cuenta con 'nowheel nopan nodrag' y detención de propagación de eventos wheel
 * para que la rueda del ratón desplace el contenido interno sin alterar el zoom general.
 */
export const TooltipFichaTecnica: React.FC<TooltipFichaTecnicaProps> = ({ datos, onCerrar }) => {
  const { label, category, summary, details } = datos;

  const obtenerInfoCategoria = (cat: CategoriaScrum) => {
    switch (cat) {
      case 'role':
        return { texto: 'Rol Scrum', icono: <Users className="w-3.5 h-3.5 text-amber-400" />, badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      case 'event':
        return { texto: 'Ceremonia', icono: <Calendar className="w-3.5 h-3.5 text-indigo-400" />, badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' };
      case 'artifact':
        return { texto: 'Artefacto', icono: <Layers className="w-3.5 h-3.5 text-emerald-400" />, badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    }
  };

  const infoCat = obtenerInfoCategoria(category);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      className="nowheel nopan nodrag w-80 md:w-96 bg-[#1C1C1E]/98 backdrop-blur-2xl border border-zinc-700/90 rounded-2xl p-4 shadow-2xl shadow-black/90 text-zinc-200 text-xs select-text cursor-default animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Cabecera del Tooltip */}
      <div className="flex items-start justify-between pb-2.5 mb-2.5 border-b border-zinc-800">
        <div>
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${infoCat.badge} mb-1`}>
            {infoCat.icono}
            <span>{infoCat.texto}</span>
          </div>
          <h4 className="text-sm font-bold text-white tracking-tight">{label}</h4>
        </div>

        <button
          onClick={onCerrar}
          aria-label="Cerrar ficha técnica"
          className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Contenido desplazable con aislamiento de rueda de zoom */}
      <div
        onWheel={(e) => e.stopPropagation()}
        className="nowheel space-y-3 max-h-64 overflow-y-auto pr-1"
      >
        {/* Resumen */}
        <div>
          <p className="text-[11px] text-zinc-300 leading-relaxed bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80">
            {summary}
          </p>
        </div>

        {/* Timebox si aplica */}
        {details.timebox && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-indigo-300 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">{details.timebox}</span>
          </div>
        )}

        {/* Responsabilidades */}
        {details.responsibilities && details.responsibilities.length > 0 && (
          <div>
            <span className="font-bold text-[10px] uppercase text-zinc-400 tracking-wider block mb-1">
              Responsabilidades
            </span>
            <ul className="space-y-1">
              {details.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-300">
                  <CheckCircle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Insumos / Entradas */}
        {details.inputs && details.inputs.length > 0 && (
          <div>
            <span className="font-bold text-[10px] uppercase text-zinc-400 tracking-wider block mb-1">
              Entradas
            </span>
            <div className="space-y-1">
              {details.inputs.map((inp, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <ArrowRightCircle className="w-3 h-3 text-zinc-500 shrink-0" />
                  <span>{inp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Salidas y Compromisos */}
        {details.outputs && details.outputs.length > 0 && (
          <div>
            <span className="font-bold text-[10px] uppercase text-zinc-400 tracking-wider block mb-1">
              Compromisos y Entregables
            </span>
            <div className="space-y-1">
              {details.outputs.map((out, i) => (
                <div key={i} className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium flex items-start gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fundamentación Teórica */}
        <div className="pt-1">
          <span className="font-bold text-[10px] uppercase text-zinc-400 tracking-wider flex items-center gap-1 mb-1">
            <BookOpen className="w-3 h-3" />
            Guía Scrum
          </span>
          <blockquote className="p-2 rounded-lg bg-zinc-950 border-l-2 border-zinc-600 text-[10px] italic text-zinc-400">
            "{details.theoreticalBasis}"
          </blockquote>
        </div>
      </div>
    </div>
  );
};
