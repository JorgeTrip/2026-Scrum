import React from 'react';
import { carrilesScrum } from '../data/scrumData';
import { Users, Calendar, Layers } from 'lucide-react';

/**
 * Componente que renderiza los tres carriles horizontales de Scrum (Swimlanes).
 * Se ubica en el fondo del lienzo manteniendo coherencia espacial absoluta con los nodos.
 */
export const Swimlanes: React.FC = () => {
  const obtenerIconoCarril = (id: string) => {
    switch (id) {
      case 'lane-roles':
        return <Users className="w-5 h-5 text-amber-400" />;
      case 'lane-events':
        return <Calendar className="w-5 h-5 text-indigo-400" />;
      case 'lane-artifacts':
        return <Layers className="w-5 h-5 text-emerald-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-visible">
      {carrilesScrum.map((carril) => (
        <div
          key={carril.id}
          style={{
            top: `${carril.y}px`,
            height: `${carril.altura}px`,
            left: '-20px',
            width: '1650px'
          }}
          className={`absolute rounded-3xl border ${carril.colorBorde} ${carril.colorFondo}
            backdrop-blur-[2px] transition-colors duration-500`}
        >
          {/* Etiqueta fija en el extremo izquierdo del carril */}
          <div className="absolute left-6 top-5 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#1C1C1E]/80 border border-zinc-800 shadow-md">
              {obtenerIconoCarril(carril.id)}
            </div>
            <div>
              <h2 className={`text-sm font-bold uppercase tracking-wider ${carril.colorTexto}`}>
                {carril.titulo}
              </h2>
              <p className="text-[11px] text-zinc-400 max-w-xs mt-0.5">
                {carril.descripcion}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
