import React, { useMemo } from 'react';
import { TopBar } from './components/TopBar';
import { FlowCanvas } from './components/FlowCanvas';
import { PanelHistoria } from './components/PanelHistoria';
import { LeyendaRelaciones } from './components/LeyendaRelaciones';
import { Footer } from './components/Footer';
import { useFiltroScrum, aplicarFiltroANodos } from './hooks/useFiltroScrum';
import { useFlujoScrum } from './hooks/useFlujoScrum';
import { useHistoriaScrum } from './hooks/useHistoriaScrum';
import { nodosScrum, aristasScrum } from './data/scrumData';

/**
 * Componente raíz de la aplicación Scrum Interactivo.
 * Orquesta la barra superior, el lienzo con tooltips emergentes, la leyenda y la historia.
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
    idNodoConTooltip,
    alternarTooltipNodo,
    cerrarTooltip
  } = useFlujoScrum();

  // Calcula los nodos a renderizar inyectando el estado del tooltip emergente
  const nodosFinales = useMemo(() => {
    let nodosBase = modoActivo === 'mapa'
      ? aplicarFiltroANodos(nodosScrum, categoriaSeleccionada, busqueda)
      : nodosVisibles;

    if (modoActivo === 'historia' && busqueda.trim()) {
      nodosBase = aplicarFiltroANodos(nodosBase, 'all', busqueda);
    }

    return nodosBase.map((nodo) => ({
      ...nodo,
      data: {
        ...nodo.data,
        estaAbiertoTooltip: nodo.id === idNodoConTooltip
      }
    }));
  }, [modoActivo, categoriaSeleccionada, busqueda, nodosVisibles, idNodoConTooltip]);

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
          onSeleccionarNodo={alternarTooltipNodo}
          onCerrarTooltip={cerrarTooltip}
        />

        {/* Panel interactivo arrastrable para el modo Historia */}
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

        {/* Leyenda interactiva de líneas y relaciones */}
        <LeyendaRelaciones />
      </main>

      {/* Pie de página institucional con autoría y copyright */}
      <Footer />
    </div>
  );
};

export default App;
