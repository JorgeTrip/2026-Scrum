import React, { useState, useEffect } from 'react';
import { useViewport } from '@xyflow/react';
import { Users, Calendar, Layers } from 'lucide-react';

/**
 * Componente de Swimlanes que divide el viewport vertical en tres secciones de idéntica altura.
 * Elimina el desfase vertical inicial para que el título superior no quede tapado por el header
 * y el carril inferior cubra todo el fondo de la pantalla sin franjas negras residuales.
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

  // Límite superior visible en coordenadas del lienzo (exactamente debajo del header)
  const yTopeVisible = -y / zoom;
  // Altura total visible del viewport en coordenadas de flujo
  const alturaTotalFlujo = altoViewport / zoom;
  // Altura idéntica y homogénea para cada uno de los 3 carriles (exactamente 1/3 cada uno)
  const alturaSeccion = alturaTotalFlujo / 3;

  // Margen superior interno para que las etiquetas no se peguen a los divisores
  const paddingEtiquetaY = 24 / zoom;
  // Posición X visible para que las etiquetas permanezcan accesibles en el lienzo
  const posXEtiqueta = Math.max(-260, -x / zoom + 32 / zoom);

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-visible"
      style={{
        transform: `translate(${x}px, ${y}px) scale(${zoom})`,
        transformOrigin: '0 0'
      }}
    >
      {/* 1. Carril Superior: Personas (Roles) - Ocupa el primer tercio vertical */}
      <div
        style={{
          top: `${yTopeVisible}px`,
          height: `${alturaSeccion}px`,
          left: '-4000px',
          width: '8000px'
        }}
        className="absolute border-b border-amber-500/25 bg-amber-950/15 backdrop-blur-[1px] transition-colors"
      />

      {/* 2. Carril Central: Eventos del Ciclo (Ceremonias) - Ocupa el tercio central */}
      <div
        style={{
          top: `${yTopeVisible + alturaSeccion}px`,
          height: `${alturaSeccion}px`,
          left: '-4000px',
          width: '8000px'
        }}
        className="absolute border-b border-indigo-500/25 bg-indigo-950/15 backdrop-blur-[1px] transition-colors"
      />

      {/* 3. Carril Inferior: Documentos (Artefactos y Compromisos) - Ocupa el tercio inferior hasta el fondo */}
      <div
        style={{
          top: `${yTopeVisible + alturaSeccion * 2}px`,
          height: `${alturaSeccion}px`,
          left: '-4000px',
          width: '8000px'
        }}
        className="absolute border-b border-emerald-500/25 bg-emerald-950/15 backdrop-blur-[1px] transition-colors"
      />

      {/* Etiqueta Roles (Visible y despegada del encabezado) */}
      <div
        style={{
          top: `${yTopeVisible + paddingEtiquetaY}px`,
          left: `${posXEtiqueta}px`
        }}
        className="absolute flex items-center gap-3 transition-all duration-75"
      >
        <div className="p-2 rounded-xl bg-[#1C1C1E]/95 border border-amber-500/30 shadow-lg">
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
        style={{
          top: `${yTopeVisible + alturaSeccion + paddingEtiquetaY}px`,
          left: `${posXEtiqueta}px`
        }}
        className="absolute flex items-center gap-3 transition-all duration-75"
      >
        <div className="p-2 rounded-xl bg-[#1C1C1E]/95 border border-indigo-500/30 shadow-lg">
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
        style={{
          top: `${yTopeVisible + alturaSeccion * 2 + paddingEtiquetaY}px`,
          left: `${posXEtiqueta}px`
        }}
        className="absolute flex items-center gap-3 transition-all duration-75"
      >
        <div className="p-2 rounded-xl bg-[#1C1C1E]/95 border border-emerald-500/30 shadow-lg">
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
  );
};
