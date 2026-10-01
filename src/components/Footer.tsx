import React from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';

/**
 * Pie de página institucional y educativo de la aplicación.
 * Acredita la autoría a Jorge O. Tripodi para fines pedagógicos en UTN FRBA.
 */
export const Footer: React.FC = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="h-8 bg-[#18181B]/95 backdrop-blur-md border-t border-zinc-800/80 px-4 flex items-center justify-between text-[11px] text-zinc-400 select-none z-10 shrink-0">
      {/* Información de Autoría y Copyright */}
      <div className="flex items-center gap-2">
        <span className="text-zinc-300 font-medium">
          &copy; {anioActual} Jorge O. Tripodi
        </span>
        <span className="text-zinc-600 hidden sm:inline">&bull;</span>
        <span className="text-zinc-400 hidden sm:inline">Todos los derechos reservados</span>
      </div>

      {/* Finalidad pedagógica e Institución académica */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-zinc-400">
          <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
          <span>Fines formativos y educativos</span>
        </div>
        <span className="text-zinc-600 hidden md:inline">&bull;</span>
        <div className="flex items-center gap-1 text-indigo-400 font-medium hidden md:flex">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>UTN FRBA</span>
        </div>
      </div>
    </footer>
  );
};
