import React, { useMemo } from 'react';
import { TopBar } from './components/TopBar';
import { FlowCanvas } from './components/FlowCanvas';
import { DetailDrawer } from './components/DetailDrawer';
import { PanelHistoria } from './components/PanelHistoria';
import { useFiltroScrum, aplicarFiltroANodos } from './hooks/useFiltroScrum';
import { useFlujoScrum } from './hooks/useFlujoScrum';
import { useHistoriaScrum } from './hooks/useHistoriaScrum';
import { nodosScrum, aristasScrum } from './data/scrumData';

/**
 * Componente raíz de la aplicación Scrum Interactivo.
 * Coordina el modo Historia guiada (Storytelling) y el modo Mapa Libre.
 */
export const App: React.FC = () => {
  const {
    busqueda,
    setBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    limpiarFiltros
  } = useFiltroScrum();

  const {
    pasoActual,
    capituloActual,
    totalPasos,
    modoActivo,
    setModoActivo,
    siguientePaso,
    anteriorPaso,
    irAPaso,
    nodosVisibles,
    aristasVisibles
  } = useHistoriaScrum(nodosScrum, aristasScrum);

  const {
    entidadSeleccionada,
    drawerAbierto,
    seleccionarNodo,
    cerrarDrawer
  } = useFlujoScrum();

  // En modo mapa libre se aplican los filtros de búsqueda y categoría
  const nodosFinales = useMemo(() => {
    if (modoActivo === 'mapa') {
      return aplicarFiltroANodos(nodosScrum, categoriaSeleccionada, busqueda);
    }
    // En modo historia, si el usuario busca algo específico, también se atenúa
    if (busqueda.trim()) {
      return aplicarFiltroANodos(nodosVisibles, 'all', busqueda);
    }
    return nodosVisibles;
  }, [modoActivo, categoriaSeleccionada, busqueda, nodosVisibles]);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#121214] text-[#F5F5F7] overflow-hidden select-none font-sans">
      <TopBar
        busqueda={busqueda}
        onCambioBusqueda={setBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        onSeleccionCategoria={setCategoriaSeleccionada}
        onResetFiltros={limpiarFiltros}
        modoActivo={modoActivo}
        onCambiarModo={setModoActivo}
      />

      <main className="flex-1 relative">
        <FlowCanvas
          nodos={nodosFinales}
          aristas={aristasVisibles}
          onSeleccionarNodo={seleccionarNodo}
        />

        {/* Panel inferior interactivo para el modo Historia */}
        {modoActivo === 'historia' && (
          <PanelHistoria
            capitulo={capituloActual}
            pasoActual={pasoActual}
            totalPasos={totalPasos}
            onSiguiente={siguientePaso}
            onAnterior={anteriorPaso}
            onIrAPaso={irAPaso}
            onAlternarModoMapa={() => setModoActivo('mapa')}
          />
        )}
      </main>

      <DetailDrawer
        entidad={entidadSeleccionada}
        abierto={drawerAbierto}
        onCerrar={cerrarDrawer}
      />
    </div>
  );
};

export default App;
