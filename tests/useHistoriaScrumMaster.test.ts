import { describe, it, expect } from 'vitest';
import { capitulosHistoriaScrumMaster } from '../src/data/datosHistoriaScrumMaster';
import { calcularElementosVisiblesHistoria } from '../src/hooks/useHistoriaScrum';
import { nodosScrum, aristasScrum } from '../src/data/scrumData';

describe('Capítulos de la Historia del Scrum Master (datosHistoriaScrumMaster)', () => {
  it('debe tener exactamente 5 etapas temáticas de servicio', () => {
    expect(capitulosHistoriaScrumMaster).toHaveLength(5);
  });

  it('el primer paso debe vincular al Scrum Master con el contenedor Sprint', () => {
    const paso1 = capitulosHistoriaScrumMaster[0];
    expect(paso1.idsNodosNuevos).toContain('role-scrum-master');
    expect(paso1.idsNodosNuevos).toContain('event-sprint');
    expect(paso1.idsDestacados).toContain('role-scrum-master');
  });

  it('el segundo paso debe incorporar el servicio a los Developers', () => {
    const paso2 = capitulosHistoriaScrumMaster[1];
    expect(paso2.idsNodosNuevos).toContain('role-developers');
  });

  it('el tercer paso debe incorporar el servicio al Product Owner y Product Backlog', () => {
    const paso3 = capitulosHistoriaScrumMaster[2];
    expect(paso3.idsNodosNuevos).toContain('role-product-owner');
    expect(paso3.idsNodosNuevos).toContain('artifact-product-backlog');
  });

  it('el cuarto paso debe incorporar el compromiso de calidad con el Incremento', () => {
    const paso4 = capitulosHistoriaScrumMaster[3];
    expect(paso4.idsNodosNuevos).toContain('artifact-increment');
  });

  it('el quinto paso debe contemplar la Sprint Retrospective', () => {
    const paso5 = capitulosHistoriaScrumMaster[4];
    expect(paso5.idsNodosNuevos).toContain('event-sprint-retrospective');
  });
});

describe('Aristas Metodológicas del Scrum Master', () => {
  it('debe contener todas las aristas clave del Scrum Master en aristasScrum', () => {
    const idsAristas = aristasScrum.map((a) => a.id);
    expect(idsAristas).toContain('edge-sm-to-sprint');
    expect(idsAristas).toContain('edge-sm-to-devs');
    expect(idsAristas).toContain('edge-sm-to-po');
    expect(idsAristas).toContain('edge-sm-to-increment');
    expect(idsAristas).toContain('edge-sm-to-retro');
  });
});

describe('Revelación Progresiva del Modo Scrum Master', () => {
  it('en el paso 0 solo deben estar visibles el Scrum Master y el Sprint', () => {
    const { nodosVisibles, aristasVisibles } = calcularElementosVisiblesHistoria(
      nodosScrum,
      aristasScrum,
      0,
      capitulosHistoriaScrumMaster
    );

    const idsVisibles = nodosVisibles.map((n) => n.id);
    expect(idsVisibles).toContain('role-scrum-master');
    expect(idsVisibles).toContain('event-sprint');
    expect(idsVisibles).not.toContain('role-developers');
    expect(idsVisibles).not.toContain('artifact-increment');

    aristasVisibles.forEach((a) => {
      expect(idsVisibles).toContain(a.source);
      expect(idsVisibles).toContain(a.target);
    });
  });
});

describe('Componente PanelHistoria con Selector de Historia', () => {
  it('renderiza las opciones de Flujo General y Scrum Master', async () => {
    const React = await import('react');
    const { renderToStaticMarkup } = await import('react-dom/server');
    const { PanelHistoria } = await import('../src/components/PanelHistoria');

    const html = renderToStaticMarkup(
      React.createElement(PanelHistoria, {
        capitulo: capitulosHistoriaScrumMaster[0],
        pasoActual: 0,
        totalPasos: 5,
        tipoHistoria: 'scrum-master',
        onCambiarTipoHistoria: () => {},
        onSiguiente: () => {},
        onAnterior: () => {},
        onIrAPaso: () => {},
        onAlternarModoMapa: () => {}
      })
    );

    expect(html).toContain('Flujo General');
    expect(html).toContain('Scrum Master');
    expect(html).toContain('Etapa 1 de 5');
    expect(html).toContain('El Líder Servicial y el Contenedor');
  });
});
