import React, { useState, useEffect } from 'react';
import { useViewport } from '@xyflow/react';
import { Users, Calendar, Layers } from 'lucide-react';

/**
 * Componente de Swimlanes que divide el viewport vertical en tres secciones de idéntica altura.
 * Las franjas de fondo abarcan todo el viewport reactivas al zoom y desplazamiento.
 * Los títulos se mantienen 100% fijos en posición y tamaño, justificados a la izquierda del viewport.
 */
export const Swimlanes: React.FC = () => {
  const viewport = useViewport();
  const x = viewport?.x ?? 0;
  const y = viewport?.y ?? 0;
  const zoom = viewport?.zoom || 1;

  const [altoViewport, setAltoViewport] = useState(() =>
    typeof window !== 'undefined' ? Math.max(window.innerHeight - 96, 500) : 650
  );

  useEffect(() => {
    const alRedimensionar = () => {
      setAltoViewport(Math.max(window.innerHeight - 96, 500));
    };
    window.addEventListener('resize', alRedimensionar);
    return () => window.removeEventListener('resize', alRedimensionar);
  }, []);

  // Límite superior visible en coordenadas del lienzo (debajo del header)
  const yTopeVisible = -y / zoom;
  // Altura total visible del viewport en coordenadas de flujo
  const alturaTotalFlujo = altoViewport / zoom;
  // Altura idéntica y homogénea para cada uno de los 3 carriles (exactamente 1/3 cada uno)
  const alturaSeccion = alturaTotalFlujo / 3;

  return (
    <>
      {/* 1. Franjas tricolor de fondo en coordenadas de flujo (reactivas al lienzo) */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-visible"
        style={{
          transform: `translate(${x}px, ${y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {/* Carril Superior: Personas (Roles) */}
        <div
          style={{
            top: `${yTopeVisible}px`,
            height: `${alturaSeccion}px`,
            left: '-4000px',
            width: '8000px'
          }}
          className="absolute border-b border-amber-500/25 bg-amber-950/15 backdrop-blur-[1px] transition-colors"
        />

        {/* Carril Central: Eventos del Ciclo (Ceremonias) */}
        <div
          style={{
            top: `${yTopeVisible + alturaSeccion}px`,
            height: `${alturaSeccion}px`,
            left: '-4000px',
            width: '8000px'
          }}
          className="absolute border-b border-indigo-500/25 bg-indigo-950/15 backdrop-blur-[1px] transition-colors"
        />

        {/* Carril Inferior: Documentos (Artefactos y Compromisos) */}
        <div
          style={{
            top: `${yTopeVisible + alturaSeccion * 2}px`,
            height: `${alturaSeccion}px`,
            left: '-4000px',
            width: '8000px'
          }}
          className="absolute border-b border-emerald-500/25 bg-emerald-950/15 backdrop-blur-[1px] transition-colors"
        />
      </div>

      {/* 2. Títulos fijos en posición y tamaño, justificados a la izquierda del viewport */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
        {/* Etiqueta Roles */}
        <div
          style={{ top: '20px', left: '24px' }}
          className="absolute flex items-center gap-3"
        >
          <div className="p-2 rounded-xl bg-[#1C1C1E]/95 border border-amber-500/30 shadow-lg backdrop-blur-md">
            <Users className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Personas (Roles)
            </h2>
            <p className="text-[11px] text-zinc-400 max-w-xs mt-0.5">
              Quienes componen el Scrum Team y sus responsabilidades
            </p>
          </div>
        </div>

        {/* Etiqueta Eventos */}
        <div
          style={{ top: 'calc(33.333% + 20px)', left: '24px' }}
          className="absolute flex items-center gap-3"
        >
          <div className="p-2 rounded-xl bg-[#1C1C1E]/95 border border-indigo-500/30 shadow-lg backdrop-blur-md">
            <Calendar className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              Eventos del Ciclo (Ceremonias)
            </h2>
            <p className="text-[11px] text-zinc-400 max-w-xs mt-0.5">
              Ocasiones formales para la inspección y adaptación continua
            </p>
          </div>
        </div>

        {/* Etiqueta Artefactos */}
        <div
          style={{ top: 'calc(66.666% + 20px)', left: '24px' }}
          className="absolute flex items-center gap-3"
        >
          <div className="p-2 rounded-xl bg-[#1C1C1E]/95 border border-emerald-500/30 shadow-lg backdrop-blur-md">
            <Layers className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              Documentos (Artefactos y Compromisos)
            </h2>
            <p className="text-[11px] text-zinc-400 max-w-xs mt-0.5">
              Trabajo y valor que aportan transparencia e inspección
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
