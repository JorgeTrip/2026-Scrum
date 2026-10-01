import React from 'react';
import { Search, X, Users, Calendar, Layers, Sparkles } from 'lucide-react';
import type { CategoriaScrum } from '../types/scrum';

interface TopBarProps {
  busqueda: string;
  onCambioBusqueda: (texto: string) => void;
  categoriaSeleccionada: CategoriaScrum | 'all';
  onSeleccionCategoria: (cat: CategoriaScrum | 'all') => void;
  onResetFiltros: () => void;
}

/**
 * Barra superior de navegación, búsqueda reactiva y filtros dimensionales.
 */
export const TopBar: React.FC<TopBarProps> = ({
  busqueda,
  onCambioBusqueda,
  categoriaSeleccionada,
  onSeleccionCategoria,
  onResetFiltros
}) => {
  const filtros: { id: CategoriaScrum | 'all'; label: string; icono: React.ReactNode }[] = [
    { id: 'all', label: 'Todos', icono: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'role', label: 'Roles', icono: <Users className="w-3.5 h-3.5" /> },
    { id: 'event', label: 'Eventos', icono: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'artifact', label: 'Artefactos', icono: <Layers className="w-3.5 h-3.5" /> }
  ];

  return (
    <header className="h-16 px-6 bg-[#1C1C1E]/90 backdrop-blur-xl border-b border-zinc-800/80 flex items-center justify-between z-20 shadow-md">
      {/* Logotipo y Título */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="font-black text-white text-base">S</span>
        </div>
        <div>
          <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            Flujo Metodológico Scrum
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60">
              Guía 2020
            </span>
          </h1>
          <p className="text-[11px] text-zinc-400">
            Estructura tridimensional: Personas, Eventos y Documentos
          </p>
        </div>
      </div>

      {/* Controles de Búsqueda y Filtros */}
      <div className="flex items-center gap-4">
        {/* Input de Búsqueda */}
        <div className="relative w-64 md:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => onCambioBusqueda(e.target.value)}
            placeholder="Buscar rol, evento o artefacto..."
            className="w-full h-9 pl-9 pr-8 bg-zinc-900/90 hover:bg-zinc-900 focus:bg-zinc-950 text-xs text-white rounded-xl border border-zinc-700/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-zinc-500"
          />
          {busqueda && (
            <button
              onClick={() => onCambioBusqueda('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Botones de Filtro por Categoría */}
        <div className="flex items-center p-1 bg-zinc-900/80 rounded-xl border border-zinc-800">
          {filtros.map((f) => {
            const activo = categoriaSeleccionada === f.id;
            return (
              <button
                key={f.id}
                onClick={() => onSeleccionCategoria(f.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activo
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/80'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                {f.icono}
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>

        {(busqueda || categoriaSeleccionada !== 'all') && (
          <button
            onClick={onResetFiltros}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium px-2 py-1"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </header>
  );
};
