import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Calendar, Clock, RotateCcw, Eye, Sparkles, Repeat } from 'lucide-react';
import type { NodoScrum } from '../../types/scrum';

/**
 * Componente visual para nodos de la dimensión Eventos del Ciclo (Ceremonias).
 */
export const EventNode: React.FC<NodeProps<NodoScrum>> = memo(({ data, selected }) => {
  const opacidad = data.opacity ?? 1.0;
  const esFoco = selected || Boolean(data.isSelected);

  const obtenerIcono = () => {
    switch (data.id) {
      case 'event-sprint':
        return <Repeat className="w-5 h-5 text-indigo-400" />;
      case 'event-sprint-planning':
        return <Calendar className="w-5 h-5 text-indigo-400" />;
      case 'event-daily-scrum':
        return <Clock className="w-5 h-5 text-indigo-400" />;
      case 'event-sprint-review':
        return <Eye className="w-5 h-5 text-indigo-400" />;
      case 'event-sprint-retrospective':
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
      default:
        return <RotateCcw className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div
      style={{ opacity: opacidad }}
      className={`group relative w-64 rounded-2xl p-4 transition-all duration-300 backdrop-blur-md cursor-pointer
        bg-[#1C1C1E]/95 hover:bg-[#252528] border-2 shadow-xl shadow-black/30
        ${esFoco ? 'border-indigo-400 ring-4 ring-indigo-400/20 scale-[1.03] shadow-indigo-500/10' : 'border-indigo-500/30 hover:border-indigo-500/60'}
      `}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        className="!opacity-0 !pointer-events-none !w-2 !h-2 !border-0"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        className="!opacity-0 !pointer-events-none !w-2 !h-2 !border-0"
      />

      <div className="flex items-center justify-between mb-2">
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          {obtenerIcono()}
        </div>
        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
          Ceremonia
        </span>
      </div>

      <h3 className="text-sm font-bold text-white tracking-wide mb-1 group-hover:text-indigo-300 transition-colors">
        {data.label}
      </h3>
      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-2.5">
        {data.summary}
      </p>

      {data.details.timebox && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-300">
          <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="truncate font-mono">{data.details.timebox}</span>
        </div>
      )}

      <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
        <span>{data.details.outputs?.length ?? 0} entregables</span>
        <span className="text-indigo-400 font-medium group-hover:translate-x-0.5 transition-transform">
          Ver ficha &rarr;
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        className="!opacity-0 !pointer-events-none !w-2 !h-2 !border-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        className="!opacity-0 !pointer-events-none !w-2 !h-2 !border-0"
      />
    </div>
  );
});

EventNode.displayName = 'EventNode';
