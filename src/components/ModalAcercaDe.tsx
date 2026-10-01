import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, BookOpen, CheckCircle2, GraduationCap, ShieldCheck } from 'lucide-react';

interface PropsModalAcercaDe {
  abierto: boolean;
  alCerrar: () => void;
}

/**
 * Modal informativo institucional que explica la fundamentación metodológica
 * de la Guía Oficial de Scrum 2020, la autoría académica y los derechos de autor.
 */
export const ModalAcercaDe: React.FC<PropsModalAcercaDe> = ({ abierto, alCerrar }) => {
  // Manejo de la tecla Escape para accesibilidad
  useEffect(() => {
    if (!abierto) return;
    const manejarTeclaEscape = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') alCerrar();
    };
    window.addEventListener('keydown', manejarTeclaEscape);
    return () => window.removeEventListener('keydown', manejarTeclaEscape);
  }, [abierto, alCerrar]);

  if (!abierto) return null;

  const contenidoModal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-acerca-de"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={alCerrar}
    >
      <div
        className="w-full max-w-2xl bg-[#1C1C1E] border border-zinc-700/80 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden text-zinc-300 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del Modal */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-[#252528]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center shadow-md shadow-indigo-500/30">
              <span className="font-black text-white text-lg">S</span>
            </div>
            <div>
              <h2 id="titulo-acerca-de" className="text-base font-bold text-white tracking-tight">
                Acerca de Scrum Flow & Guía 2020
              </h2>
              <p className="text-xs text-zinc-400">
                Fundamentación del estándar oficial y contexto pedagógico
              </p>
            </div>
          </div>
          <button
            onClick={alCerrar}
            aria-label="Cerrar modal de información"
            className="p-1.5 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido Desplazable */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 text-xs leading-relaxed">
          {/* Sección 1: ¿Por qué la Guía 2020? */}
          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
            <div className="flex items-center gap-2 mb-2 text-indigo-400 font-semibold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>¿Por qué se indica «Guía 2020»?</span>
            </div>
            <p className="text-zinc-300 mb-3">
              La plataforma está alineada con la <strong>Guía Oficial de Scrum 2020</strong> redactada por Ken Schwaber y Jeff Sutherland (los creadores de Scrum), la cual constituye la <strong>versión oficial y vigente a nivel global</strong> del marco de trabajo.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-start gap-2 p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Product Goal</strong>
                  <span>Introducido formalmente como el compromiso del Product Backlog para dar dirección estratégica a largo plazo.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Un solo Scrum Team</strong>
                  <span>Se eliminó la jerarquía de «Equipo de Desarrollo»; ahora existe un equipo unificado con el rol de <strong>Developers</strong>.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">3 Compromisos Formales</strong>
                  <span>Product Goal (Product Backlog), Sprint Goal (Sprint Backlog) y Definition of Done (Incremento).</span>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Menos Prescriptivo</strong>
                  <span>Mayor libertad a los equipos para autoorganizarse e inspeccionar el progreso con verdadero empirismo.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 2: Autoría y Propósito Institucional */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800/80">
            <div className="flex items-center gap-2 mb-2 text-amber-400 font-semibold text-sm">
              <GraduationCap className="w-4 h-4" />
              <span>Autoría y Propósito Educativo</span>
            </div>
            <div className="space-y-1.5 text-zinc-300">
              <p>
                <strong>Autor:</strong> Jorge O. Tripodi
              </p>
              <p>
                <strong>Institución:</strong> Universidad Tecnológica Nacional (UTN FRBA)
              </p>
              <p className="text-zinc-400 text-[11px] pt-1">
                Herramienta concebida para la enseñanza interactiva, divulgación académica y comprensión integral de las interconexiones en proyectos ágiles.
              </p>
            </div>
          </div>

          {/* Sección 3: Derechos de Autor y Licencia */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 text-[11px] text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>© 2026 Jorge O. Tripodi. Todos los derechos reservados.</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60">
              Versión 0.1.0
            </span>
          </div>
        </div>

        {/* Pie del Modal */}
        <div className="p-4 border-t border-zinc-800 bg-[#252528]/40 flex justify-end">
          <button
            onClick={alCerrar}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-indigo-600/30 transition-all active:scale-95"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' && document.body
    ? createPortal(contenidoModal, document.body)
    : contenidoModal;
};
