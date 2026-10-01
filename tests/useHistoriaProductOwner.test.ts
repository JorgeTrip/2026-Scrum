import { describe, it, expect } from 'vitest';
import { capitulosHistoriaProductOwner } from '../src/data/datosHistoriaProductOwner';
import { calcularElementosVisiblesHistoria } from '../src/hooks/useHistoriaScrum';
import { nodosScrum, aristasScrum } from '../src/data/scrumData';

describe('Capítulos de la Historia del Product Owner (datosHistoriaProductOwner)', () => {
  it('debe tener exactamente 5 etapas temáticas de gestión de valor', () => {
    expect(capitulosHistoriaProductOwner).toHaveLength(5);
  });

  it('el primer paso debe vincular al Product Owner con el Product Vision Board', () => {
    const paso1 = capitulosHistoriaProductOwner[0];
    expect(paso1.idsNodosNuevos).toContain('role-product-owner');
    expect(paso1.idsNodosNuevos).toContain('artifact-vision-board');
    expect(paso1.idsDestacados).toContain('role-product-owner');
  });

  it('el segundo paso debe incorporar el Product Backlog', () => {
    const paso2 = capitulosHistoriaProductOwner[1];
    expect(paso2.idsNodosNuevos).toContain('artifact-product-backlog');
  });

  it('el tercer paso debe incorporar el Sprint Planning', () => {
    const paso3 = capitulosHistoriaProductOwner[2];
    expect(paso3.idsNodosNuevos).toContain('event-sprint-planning');
  });

  it('el cuarto paso debe incorporar a los Developers para soporte continuo', () => {
    const paso4 = capitulosHistoriaProductOwner[3];
    expect(paso4.idsNodosNuevos).toContain('role-developers');
  });

  it('el quinto paso debe contemplar la Sprint Review con el Incremento', () => {
    const paso5 = capitulosHistoriaProductOwner[4];
    expect(paso5.idsNodosNuevos).toContain('event-sprint-review');
    expect(paso5.idsNodosNuevos).toContain('artifact-increment');
  });
});

describe('Aristas Metodológicas del Product Owner', () => {
  it('debe contener todas las aristas clave del Product Owner en aristasScrum', () => {
    const idsAristas = aristasScrum.map((a) => a.id);
    expect(idsAristas).toContain('edge-po-to-vision');
    expect(idsAristas).toContain('edge-po-to-pb');
    expect(idsAristas).toContain('edge-po-to-planning');
    expect(idsAristas).toContain('edge-po-to-devs');
    expect(idsAristas).toContain('edge-po-to-review');
  });
});

describe('Revelación Progresiva del Modo Product Owner', () => {
  it('en el paso 0 solo deben estar visibles el Product Owner y el Vision Board', () => {
    const { nodosVisibles, aristasVisibles } = calcularElementosVisiblesHistoria(
      nodosScrum,
      aristasScrum,
      0,
      capitulosHistoriaProductOwner
    );

    const idsVisibles = nodosVisibles.map((n) => n.id);
    expect(idsVisibles).toContain('role-product-owner');
    expect(idsVisibles).toContain('artifact-vision-board');
    expect(idsVisibles).not.toContain('role-developers');
    expect(idsVisibles).not.toContain('event-sprint-review');

    aristasVisibles.forEach((a) => {
      expect(idsVisibles).toContain(a.source);
      expect(idsVisibles).toContain(a.target);
    });
  });
});

describe('Componente PanelHistoria con las 3 Opciones de Historia', () => {
  it('renderiza General, Scrum Master y Product Owner', async () => {
    const React = await import('react');
    const { renderToStaticMarkup } = await import('react-dom/server');
    const { PanelHistoria } = await import('../src/components/PanelHistoria');

    const html = renderToStaticMarkup(
      React.createElement(PanelHistoria, {
        capitulo: capitulosHistoriaProductOwner[0],
        pasoActual: 0,
        totalPasos: 5,
        tipoHistoria: 'product-owner',
        onCambiarTipoHistoria: () => {},
        onSiguiente: () => {},
        onAnterior: () => {},
        onIrAPaso: () => {},
        onAlternarModoMapa: () => {}
      })
    );

    expect(html).toContain('General');
    expect(html).toContain('Scrum Master');
    expect(html).toContain('Product Owner');
    expect(html).toContain('Etapa 1 de 5');
    expect(html).toContain('La Visión Estratégica');
  });
});
