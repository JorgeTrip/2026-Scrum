import React, { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Layers, ListOrdered, CheckCircle2, BookmarkCheck, Compass } from 'lucide-react';
import type { NodoScrum } from '../../types/scrum';
import { HandlesConSeparacion } from './HandlesConSeparacion';

/**
 * Componente visual para nodos de la dimensión Documentos (Artefactos y Compromisos).
 */
export const ArtifactNode: React.FC<NodeProps<NodoScrum>> = memo(({ data, selected }) => {
  const opacidad = data.opacity ?? 1.0;
  const esFoco = selected || Boolean(data.isSelected);

  const obtenerIcono = () => {
    switch (data.id) {
      case 'artifact-vision-board':
        return <Compass className="w-5 h-5 text-emerald-400" />;
      case 'artifact-product-backlog':
        return <ListOrdered className="w-5 h-5 text-emerald-400" />;
      case 'artifact-sprint-backlog':
        return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'artifact-increment':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Layers className="w-5 h-5 text-emerald-400" />;
    }
  };

  const compromiso = data.details.outputs?.find((o) => o.startsWith('Compromiso:')) ?? null;

  return (
    <div
      style={{ opacity: opacidad }}
      className={`group relative w-64 rounded-2xl p-4 transition-all duration-300 backdrop-blur-md cursor-grab active:cursor-grabbing
        bg-[#1C1C1E]/95 hover:bg-[#252528] border-2 shadow-xl shadow-black/30
        ${esFoco ? 'border-emerald-400 ring-4 ring-emerald-400/20 scale-[1.03] shadow-emerald-500/10' : 'border-emerald-500/30 hover:border-emerald-500/60'}
      `}
    >
      <HandlesConSeparacion />

      <div className="flex items-center justify-between mb-2">
        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          {obtenerIcono()}
        </div>
        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          Artefacto
        </span>
      </div>

      <h3 className="text-sm font-bold text-white tracking-wide mb-1 group-hover:text-emerald-300 transition-colors">
        {data.label}
      </h3>
      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-2.5">
        {data.summary}
      </p>

      {compromiso && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300">
          <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate font-medium">{compromiso}</span>
        </div>
      )}

      <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
        <span>{data.details.inputs?.length ?? 0} insumos</span>
        <span className="text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform">
          Ver ficha &rarr;
        </span>
      </div>
    </div>
  );
});

ArtifactNode.displayName = 'ArtifactNode';
