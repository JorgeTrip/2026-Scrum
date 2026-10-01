import React from 'react';
import { X, Clock, ArrowRightCircle, CheckCircle, BookOpen, Users, Calendar, Layers } from 'lucide-react';
import type { DatosNodoScrum, CategoriaScrum } from '../types/scrum';

interface DetailDrawerProps {
  entidad: DatosNodoScrum | null;
  abierto: boolean;
  onCerrar: () => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({ entidad, abierto, onCerrar }) => {
  if (!abierto || !entidad) return null;

  const { label, category, summary, details } = entidad;

  const obtenerInfoCategoria = (cat: CategoriaScrum) => {
    switch (cat) {
      case 'role':
        return { texto: 'Rol de Scrum (Personas)', icono: <Users className="w-4 h-4 text-amber-400" />, badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      case 'event':
        return { texto: 'Evento del Ciclo (Ceremonia)', icono: <Calendar className="w-4 h-4 text-indigo-400" />, badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' };
      case 'artifact':
        return { texto: 'Documento (Artefacto & Compromiso)', icono: <Layers className="w-4 h-4 text-emerald-400" />, badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    }
  };

  const infoCat = obtenerInfoCategoria(category);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fondo oscuro traslúcido para cerrar al hacer clic */}
      <div
        onClick={onCerrar}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Panel lateral deslizable */}
      <aside
        role="dialog"
        aria-label={`Ficha técnica de ${label}`}
        aria-modal="true"
        className="relative w-full max-w-lg h-full bg-[#1C1C1E] border-l border-zinc-800 shadow-2xl flex flex-col z-10 overflow-hidden"
      >
        {/* Cabecera del Drawer */}
        <div className="p-6 border-b border-zinc-800 flex items-start justify-between bg-zinc-900/40">
          <div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${infoCat.badge} mb-2.5`}>
              {infoCat.icono}
              <span>{infoCat.texto}</span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">{label}</h2>
          </div>
          <button
            onClick={onCerrar}
            aria-label="Cerrar panel lateral"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido scrolleable de la Ficha Técnica */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-zinc-300">
          {/* Resumen Ejecutivo */}
          <section>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Resumen Ejecutivo</h3>
            <p className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 leading-relaxed text-zinc-200">
              {summary}
            </p>
          </section>

          {/* Timebox (si aplica) */}
          {details.timebox && (
            <section>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                Timebox Oficial
              </h3>
              <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-300 font-medium text-xs">
                {details.timebox}
              </div>
            </section>
          )}

          {/* Responsabilidades (si aplica) */}
          {details.responsibilities && details.responsibilities.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Responsabilidades Principales
              </h3>
              <ul className="space-y-2">
                {details.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-xs">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Entradas / Insumos */}
          {details.inputs && details.inputs.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Entradas e Insumos Requeridos
              </h3>
              <div className="space-y-1.5">
                {details.inputs.map((inp, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-300">
                    <ArrowRightCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{inp}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Salidas y Compromisos */}
          {details.outputs && details.outputs.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Salidas, Entregables y Compromisos
              </h3>
              <div className="space-y-2">
                {details.outputs.map((out, i) => (
                  <div key={i} className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Fundamentación Teórica */}
          <section className="pt-2">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-zinc-400" />
              Fundamentación Teórica (Guía Scrum)
            </h3>
            <blockquote className="p-4 rounded-xl bg-zinc-950/80 border-l-4 border-zinc-600 text-xs italic text-zinc-400 leading-relaxed">
              "{details.theoreticalBasis}"
            </blockquote>
          </section>
        </div>

        {/* Pie del Drawer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/60 text-center text-xs text-zinc-500">
          Presione <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px] border border-zinc-700">ESC</kbd> o haga clic fuera para cerrar
        </div>
      </aside>
    </div>
  );
};
