/**
 * Custom Hook para gestionar la selección de nodos y el estado del Drawer lateral.
 */

import { useState, useCallback, useEffect } from 'react';
import type { DatosNodoScrum } from '../types/scrum';

export function useFlujoScrum() {
  const [entidadSeleccionada, setEntidadSeleccionada] = useState<DatosNodoScrum | null>(null);
  const [drawerAbierto, setDrawerAbierto] = useState(false);

  const seleccionarNodo = useCallback((datosNodo: DatosNodoScrum) => {
    setEntidadSeleccionada(datosNodo);
    setDrawerAbierto(true);
  }, []);

  const cerrarDrawer = useCallback(() => {
    setDrawerAbierto(false);
  }, []);

  // Cierre accesible mediante la tecla Escape
  useEffect(() => {
    const manejarTeclaEscape = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape' && drawerAbierto) {
        cerrarDrawer();
      }
    };

    window.addEventListener('keydown', manejarTeclaEscape);
    return () => {
      window.removeEventListener('keydown', manejarTeclaEscape);
    };
  }, [drawerAbierto, cerrarDrawer]);

  return {
    entidadSeleccionada,
    drawerAbierto,
    seleccionarNodo,
    cerrarDrawer
  };
}
