import React, { useCallback } from 'react';
import { useReactFlow, useStoreApi, useViewport } from '@xyflow/react';
import { Plus, Minus, Maximize2 } from 'lucide-react';

/** Factor de incremento de paso fino (5% por paso, 4x más preciso que el 20% habitual) */
const FACTOR_PASO_FINO = 1.05;

/**
 * Control ergonómico de zoom con micro-pasos de alta precisión (5%),
 * indicador dinámico de porcentaje y restablecimiento instantáneo a escala real.
 * Se ubica a la izquierda del mini-mapa en la base del lienzo.
 */
export const ControlZoomPreciso: React.FC = () => {
  const store = useStoreApi();
  const { zoomTo, fitView } = useReactFlow();
  const { zoom } = useViewport();

  const acercarFino = useCallback(() => {
    const panZoom = store.getState().panZoom;
    if (panZoom) {
      panZoom.scaleBy(FACTOR_PASO_FINO, { duration: 80 });
    }
  }, [store]);

  const alejarFino = useCallback(() => {
    const panZoom = store.getState().panZoom;
    if (panZoom) {
      panZoom.scaleBy(1 / FACTOR_PASO_FINO, { duration: 80 });
    }
  }, [store]);

  const restablecerEscalaReal = useCallback(() => {
    zoomTo(1.0, { duration: 200 });
  }, [zoomTo]);

  const encuadrarTodo = useCallback(() => {
    fitView({ padding: 0.15, duration: 300 });
  }, [fitView]);

  const porcentajeZoom = Math.round((zoom || 1) * 100);

  return (
    <div
      style={{ right: '225px', bottom: '15px' }}
      className="absolute z-10 flex flex-col items-center bg-[#1C1C1E]/95 border border-zinc-800 rounded-xl shadow-xl backdrop-blur-md overflow-hidden text-zinc-300 pointer-events-auto select-none"
    >
      {/* Botón Acercar (Paso Fino +5%) */}
      <button
        type="button"
        onClick={acercarFino}
        title="Acercar (paso fino +5%)"
        aria-label="Acercar (paso fino)"
        className="w-8 h-8 flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-colors active:bg-zinc-700"
      >
        <Plus className="w-4 h-4 text-zinc-300" />
      </button>

      {/* Indicador reactivo de porcentaje de zoom actual */}
      <button
        type="button"
        onClick={restablecerEscalaReal}
        title={`Zoom actual: ${porcentajeZoom}%. Clic para restablecer al 100%`}
        aria-label={`Zoom actual ${porcentajeZoom}%, clic para restablecer al 100%`}
        className="w-8 py-1 flex items-center justify-center font-mono text-[9px] font-bold text-indigo-400 hover:text-indigo-300 hover:bg-zinc-800/60 border-y border-zinc-800/80 transition-colors"
      >
        {porcentajeZoom}%
      </button>

      {/* Botón Alejar (Paso Fino -5%) */}
      <button
        type="button"
        onClick={alejarFino}
        title="Alejar (paso fino -5%)"
        aria-label="Alejar (paso fino)"
        className="w-8 h-8 flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-colors active:bg-zinc-700"
      >
        <Minus className="w-4 h-4 text-zinc-300" />
      </button>

      {/* Botón Encuadrar Todo el Mapa */}
      <button
        type="button"
        onClick={encuadrarTodo}
        title="Encuadrar todo el mapa (Fit View)"
        aria-label="Encuadrar todo el mapa"
        className="w-8 h-8 flex items-center justify-center hover:bg-zinc-800 hover:text-white border-t border-zinc-800/80 transition-colors active:bg-zinc-700"
      >
        <Maximize2 className="w-3.5 h-3.5 text-zinc-400" />
      </button>
    </div>
  );
};
