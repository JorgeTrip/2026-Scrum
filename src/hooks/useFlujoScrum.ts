/**
 * Custom Hook para gestionar el tooltip interactivo emergente de los nodos de Scrum.
 */

import { useState, useCallback, useEffect } from 'react';
import type { DatosNodoScrum } from '../types/scrum';

export function useFlujoScrum() {
  const [idNodoConTooltip, setIdNodoConTooltip] = useState<string | null>(null);

  const alternarTooltipNodo = useCallback((datosNodo: DatosNodoScrum) => {
    setIdNodoConTooltip((prev) => (prev === datosNodo.id ? null : datosNodo.id));
  }, []);

  const cerrarTooltip = useCallback(() => {
    setIdNodoConTooltip(null);
  }, []);

  // Cierre accesible mediante la tecla Escape y eventos personalizados
  useEffect(() => {
    const manejarTeclaEscape = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape' && idNodoConTooltip !== null) {
        cerrarTooltip();
      }
    };

    const manejarEventoCierre = () => {
      cerrarTooltip();
    };

    window.addEventListener('keydown', manejarTeclaEscape);
    window.addEventListener('cerrar-tooltip-scrum', manejarEventoCierre);

    return () => {
      window.removeEventListener('keydown', manejarTeclaEscape);
      window.removeEventListener('cerrar-tooltip-scrum', manejarEventoCierre);
    };
  }, [idNodoConTooltip, cerrarTooltip]);

  return {
    idNodoConTooltip,
    alternarTooltipNodo,
    cerrarTooltip
  };
}
