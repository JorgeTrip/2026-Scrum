import React from 'react';
import { X, Clock, ArrowRightCircle, CheckCircle, BookOpen, Users, Calendar, Layers } from 'lucide-react';
import type { DatosNodoScrum, CategoriaScrum } from '../../types/scrum';

interface TooltipFichaTecnicaProps {
  datos: DatosNodoScrum;
  onCerrar: (e: React.MouseEvent) => void;
}

/**
 * Tooltip enriquecido con tipografía ampliada para máxima legibilidad.
 * Emerge directamente del nodo y aísla el scroll interno para no afectar el zoom.
 */
export const TooltipFichaTecnica: React.FC<TooltipFichaTecnicaProps> = ({ datos, onCerrar }) => {
  const { label, category, summary, details } = datos;

  const obtenerInfoCategoria = (cat: CategoriaScrum) => {
    switch (cat) {
      case 'role':
        return { texto: 'Rol Scrum', icono: <Users className="w-4 h-4 text-amber-400" />, badge: 'bg-amber-500/15 text-amber-300 border-amber-500/40' };
      case 'event':
        return { texto: 'Ceremonia', icono: <Calendar className="w-4 h-4 text-indigo-400" />, badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40' };
      case 'artifact':
        return { texto: 'Artefacto', icono: <Layers className="w-4 h-4 text-emerald-400" />, badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40' };
    }
  };

  const infoCat = obtenerInfoCategoria(category);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      className="nowheel nopan nodrag w-96 md:w-[430px] max-w-[92vw] bg-[#1C1C1E]/98 backdrop-blur-2xl border border-zinc-700 rounded-2xl p-5 shadow-2xl shadow-black/90 text-zinc-200 select-text cursor-default animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Cabecera del Tooltip */}
      <div className="flex items-start justify-between pb-3 mb-3 border-b border-zinc-800">
        <div>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${infoCat.badge} mb-1.5`}>
            {infoCat.icono}
            <span>{infoCat.texto}</span>
          </div>
          <h4 className="text-base font-extrabold text-white tracking-tight">{label}</h4>
        </div>

        <button
          onClick={onCerrar}
          aria-label="Cerrar ficha técnica"
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Contenido desplazable con tipografía ampliada */}
      <div
        onWheel={(e) => e.stopPropagation()}
        className="nowheel space-y-4 max-h-72 overflow-y-auto pr-1.5 text-xs md:text-sm"
      >
        {/* Resumen Ejecutivo */}
        <div>
          <p className="text-xs md:text-sm text-zinc-200 leading-relaxed bg-zinc-900/70 p-3 rounded-xl border border-zinc-800/80">
            {summary}
          </p>
        </div>

        {/* Timebox si aplica */}
        {details.timebox && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-semibold">
            <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{details.timebox}</span>
          </div>
        )}

        {/* Responsabilidades */}
        {details.responsibilities && details.responsibilities.length > 0 && (
          <div>
            <span className="font-extrabold text-xs uppercase text-zinc-300 tracking-wider block mb-1.5">
              Responsabilidades Principales
            </span>
            <ul className="space-y-1.5">
              {details.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-200 leading-relaxed bg-zinc-900/40 p-2 rounded-lg border border-zinc-800/60">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Insumos / Entradas */}
        {details.inputs && details.inputs.length > 0 && (
          <div>
            <span className="font-extrabold text-xs uppercase text-zinc-300 tracking-wider block mb-1.5">
              Entradas e Insumos
            </span>
            <div className="space-y-1.5">
              {details.inputs.map((inp, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-300">
                  <ArrowRightCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>{inp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Salidas y Compromisos */}
        {details.outputs && details.outputs.length > 0 && (
          <div>
            <span className="font-extrabold text-xs uppercase text-zinc-300 tracking-wider block mb-1.5">
              Compromisos y Entregables
            </span>
            <div className="space-y-1.5">
              {details.outputs.map((out, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-emerald-950/25 border border-emerald-500/35 text-emerald-300 text-xs font-medium flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fundamentación Teórica */}
        <div className="pt-1">
          <span className="font-extrabold text-xs uppercase text-zinc-300 tracking-wider flex items-center gap-1.5 mb-1.5">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            Guía Scrum
          </span>
          <blockquote className="p-3 rounded-xl bg-zinc-950/90 border-l-4 border-zinc-500 text-xs italic text-zinc-300 leading-relaxed">
            "{details.theoreticalBasis}"
          </blockquote>
        </div>
      </div>
    </div>
  );
};
