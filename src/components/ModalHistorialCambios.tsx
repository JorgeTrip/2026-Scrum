import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, History, ExternalLink, Search, ArrowLeft } from 'lucide-react';
import { useHistorialCambios } from '../hooks/useHistorialCambios';

interface PropsModalHistorial {
  abierto: boolean;
  alCerrar: () => void;
  alVolverAcercaDe?: () => void;
}

/**
 * Modal centrado en el viewport que muestra la bitácora completa de commits
 * con categorización semántica, filtrado por texto y enlaces directos a GitHub.
 */
export const ModalHistorialCambios: React.FC<PropsModalHistorial> = ({
  abierto,
  alCerrar,
  alVolverAcercaDe
}) => {
  const { historial, cargando } = useHistorialCambios();
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<'all' | 'feat' | 'fix' | 'breaking'>('all');

  useEffect(() => {
    if (!abierto) return;
    const manejarEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') alCerrar();
    };
    window.addEventListener('keydown', manejarEscape);
    return () => window.removeEventListener('keydown', manejarEscape);
  }, [abierto, alCerrar]);

  const cambiosFiltrados = useMemo(() => {
    return historial.filter((item) => {
      const coincideTexto = item.mensaje.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.hash.toLowerCase().includes(busqueda.toLowerCase());
      const coincideTipo = filtroTipo === 'all' || item.tipo === filtroTipo;
      return coincideTexto && coincideTipo;
    });
  }, [historial, busqueda, filtroTipo]);

  if (!abierto) return null;

  const contenido = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-historial"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={alCerrar}
    >
      <div
        className="w-full max-w-2xl bg-[#1C1C1E] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden text-zinc-300 animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#252528]/50 shrink-0">
          <div className="flex items-center gap-2.5">
            {alVolverAcercaDe && (
              <button
                onClick={alVolverAcercaDe}
                title="Volver a Acerca de"
                className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 id="titulo-historial" className="text-sm font-bold text-white tracking-tight">
                Historial de Cambios (Changelog)
              </h2>
              <p className="text-[11px] text-zinc-400">
                {historial.length} actualizaciones registradas automáticamente
              </p>
            </div>
          </div>
          <button
            onClick={alCerrar}
            aria-label="Cerrar historial"
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="p-3 border-b border-zinc-800 bg-zinc-900/60 flex flex-wrap gap-2 items-center justify-between shrink-0">
          <div className="relative flex-1 min-w-[160px]">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar en el historial..."
              className="w-full bg-zinc-950/80 border border-zinc-700/60 rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            {(['all', 'feat', 'fix', 'breaking'] as const).map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFiltroTipo(tipo)}
                className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                  filtroTipo === tipo ? 'bg-indigo-600 text-white shadow-sm' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {tipo === 'all' ? 'Todos' : tipo.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Cambios */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 text-xs">
          {cargando && historial.length === 0 ? (
            <p className="text-center py-6 text-zinc-500">Cargando bitácora de versiones...</p>
          ) : cambiosFiltrados.length === 0 ? (
            <p className="text-center py-6 text-zinc-500">No se encontraron cambios con ese filtro.</p>
          ) : (
            cambiosFiltrados.map((item) => (
              <div
                key={item.hash}
                className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex items-start justify-between gap-3"
              >
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                      item.tipo === 'feat' ? 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30' :
                      item.tipo === 'fix' ? 'bg-amber-950/60 text-amber-300 border-amber-500/30' :
                      item.tipo === 'breaking' ? 'bg-red-950/60 text-red-300 border-red-500/30' :
                      'bg-zinc-800 text-zinc-300 border-zinc-700'
                    }`}>
                      {item.tipo ?? 'commit'}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">{item.fecha}</span>
                  </div>
                  <p className="text-white text-xs font-medium leading-relaxed">{item.mensaje}</p>
                  <p className="text-[10px] text-zinc-400">Por <strong className="text-zinc-300">{item.autor}</strong></p>
                </div>
                <a
                  href={`https://github.com/JorgeTrip/scrum/commit/${item.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ver commit en GitHub"
                  className="flex items-center gap-1 font-mono text-[11px] text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded bg-zinc-950 border border-zinc-800 shrink-0"
                >
                  <span>{item.hash}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))
          )}
        </div>

        {/* Pie del Modal */}
        <div className="p-3 border-t border-zinc-800 bg-[#252528]/40 flex items-center justify-between shrink-0">
          <a
            href="https://github.com/JorgeTrip/scrum"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span>Ver repositorio en GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={alCerrar}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md transition-all active:scale-95"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' && document.body
    ? createPortal(contenido, document.body)
    : contenido;
};
