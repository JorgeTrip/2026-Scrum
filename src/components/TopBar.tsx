import React, { useState } from 'react';
import { Search, X, Users, Calendar, Layers, Sparkles, BookOpen, Compass } from 'lucide-react';
import type { CategoriaScrum } from '../types/scrum';
import { ModalAcercaDe } from './ModalAcercaDe';

interface TopBarProps {
  busqueda: string;
  onCambioBusqueda: (texto: string) => void;
  categoriaSeleccionada: CategoriaScrum | 'all';
  onSeleccionCategoria: (cat: CategoriaScrum | 'all') => void;
  onResetFiltros: () => void;
  modoActivo: 'historia' | 'mapa';
  onCambiarModo: (modo: 'historia' | 'mapa') => void;
}

/**
 * Barra superior con selector de modo (Historia / Mapa), buscador y filtros.
 */
export const TopBar: React.FC<TopBarProps> = ({
  busqueda,
  onCambioBusqueda,
  categoriaSeleccionada,
  onSeleccionCategoria,
  onResetFiltros,
  modoActivo,
  onCambiarModo
}) => {
  const [modalAbierto, setModalAbierto] = useState(false);

  const filtros: { id: CategoriaScrum | 'all'; label: string; icono: React.ReactNode }[] = [
    { id: 'all', label: 'Todos', icono: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'role', label: 'Roles', icono: <Users className="w-3.5 h-3.5" /> },
    { id: 'event', label: 'Eventos', icono: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'artifact', label: 'Artefactos', icono: <Layers className="w-3.5 h-3.5" /> }
  ];

  return (
    <header className="h-16 px-6 bg-[#1C1C1E]/95 backdrop-blur-xl border-b border-zinc-800/80 flex items-center justify-between z-20 shadow-md">
      {/* Logotipo y Título interactivo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setModalAbierto(true)}
          title="Acerca del proyecto y la Guía Oficial 2020 (clic para ver detalles)"
          aria-label="Abrir información del proyecto y Guía Oficial de Scrum 2020"
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <span className="font-black text-white text-base group-hover:rotate-6 transition-transform">S</span>
        </button>
        <div>
          <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            Flujo Metodológico Scrum
            <button
              type="button"
              onClick={() => setModalAbierto(true)}
              title="¿Por qué Guía 2020? Clic para ver fundamentos"
              className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 transition-colors cursor-pointer"
            >
              Guía 2020
            </button>
          </h1>
          <p className="text-[11px] text-zinc-400">
            Estructura tridimensional: Personas, Eventos y Documentos
          </p>
        </div>
      </div>

      {/* Controles Centrales: Selector de Modo (Historia vs Mapa Libre) */}
      <div className="flex items-center p-1 bg-zinc-900/90 rounded-2xl border border-zinc-800 shadow-inner">
        <button
          onClick={() => onCambiarModo('historia')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            modoActivo === 'historia'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Modo Historia (Paso a Paso)</span>
        </button>
        <button
          onClick={() => onCambiarModo('mapa')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            modoActivo === 'mapa'
              ? 'bg-zinc-800 text-white shadow-md border border-zinc-700'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Mapa Libre</span>
        </button>
      </div>

      {/* Controles de Búsqueda y Filtros */}
      <div className="flex items-center gap-3">
        {/* Input de Búsqueda */}
        <div className="relative w-56 md:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => onCambioBusqueda(e.target.value)}
            placeholder="Buscar concepto..."
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

        {/* Filtros por Categoría (en modo Mapa) */}
        {modoActivo === 'mapa' && (
          <div className="flex items-center p-1 bg-zinc-900/80 rounded-xl border border-zinc-800">
            {filtros.map((f) => {
              const activo = categoriaSeleccionada === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => onSeleccionCategoria(f.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
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
        )}

        {(busqueda || (modoActivo === 'mapa' && categoriaSeleccionada !== 'all')) && (
          <button
            onClick={onResetFiltros}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium px-1"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Modal explicativo del marco metodológico y autoría */}
      <ModalAcercaDe
        abierto={modalAbierto}
        alCerrar={() => setModalAbierto(false)}
      />
    </header>
  );
};
