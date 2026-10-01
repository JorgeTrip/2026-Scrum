import React, { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Users, ShieldCheck, Code2 } from 'lucide-react';
import type { NodoScrum } from '../../types/scrum';
import { HandlesConSeparacion } from './HandlesConSeparacion';

/**
 * Componente visual para nodos de la dimensión Personas (Roles).
 */
export const RoleNode: React.FC<NodeProps<NodoScrum>> = memo(({ data, selected }) => {
  const opacidad = data.opacity ?? 1.0;
  const esFoco = selected || Boolean(data.isSelected);

  const obtenerIcono = () => {
    switch (data.id) {
      case 'role-product-owner':
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'role-developers':
        return <Code2 className="w-5 h-5 text-sky-400" />;
      case 'role-scrum-master':
        return <Users className="w-5 h-5 text-purple-400" />;
      default:
        return <Users className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div
      style={{ opacity: opacidad }}
      className={`group relative w-64 rounded-2xl p-4 transition-all duration-300 backdrop-blur-md cursor-grab active:cursor-grabbing
        bg-[#1C1C1E]/95 hover:bg-[#252528] border-2 shadow-xl shadow-black/30
        ${esFoco ? 'border-amber-400 ring-4 ring-amber-400/20 scale-[1.03] shadow-amber-500/10' : 'border-amber-500/30 hover:border-amber-500/60'}
      `}
    >
      <HandlesConSeparacion />

      <div className="flex items-center justify-between mb-2">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
          {obtenerIcono()}
        </div>
        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
          Rol Scrum
        </span>
      </div>

      <h3 className="text-sm font-bold text-white tracking-wide mb-1 group-hover:text-amber-300 transition-colors">
        {data.label}
      </h3>
      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
        {data.summary}
      </p>

      <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
        <span>{data.details.responsibilities?.length ?? 0} responsabilidades</span>
        <span className="text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">
          Ver ficha &rarr;
        </span>
      </div>
    </div>
  );
});

RoleNode.displayName = 'RoleNode';
