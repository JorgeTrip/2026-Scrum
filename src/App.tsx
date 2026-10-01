import React from 'react';
import { TopBar } from './components/TopBar';
import { FlowCanvas } from './components/FlowCanvas';
import { DetailDrawer } from './components/DetailDrawer';
import { useFiltroScrum } from './hooks/useFiltroScrum';
import { useFlujoScrum } from './hooks/useFlujoScrum';

/**
 * Componente raíz de la aplicación Scrum Interactivo.
 * Orquesta la barra superior, el lienzo de diagramación y el drawer de detalles.
 */
export const App: React.FC = () => {
  const {
    busqueda,
    setBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    nodosFiltrados,
    limpiarFiltros
  } = useFiltroScrum();

  const {
    entidadSeleccionada,
    drawerAbierto,
    seleccionarNodo,
    cerrarDrawer
  } = useFlujoScrum();

  return (
    <div className="w-screen h-screen flex flex-col bg-[#121214] text-[#F5F5F7] overflow-hidden select-none font-sans">
      <TopBar
        busqueda={busqueda}
        onCambioBusqueda={setBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        onSeleccionCategoria={setCategoriaSeleccionada}
        onResetFiltros={limpiarFiltros}
      />

      <main className="flex-1 relative">
        <FlowCanvas
          nodos={nodosFiltrados}
          onSeleccionarNodo={seleccionarNodo}
        />
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
