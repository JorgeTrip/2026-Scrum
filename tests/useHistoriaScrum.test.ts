import { describe, it, expect } from 'vitest';
import { capitulosHistoria } from '../src/data/datosHistoria';
import { calcularElementosVisiblesHistoria } from '../src/hooks/useHistoriaScrum';
import { nodosScrum, aristasScrum } from '../src/data/scrumData';

describe('Capítulos de la Historia de Scrum (datosHistoria)', () => {
  it('debe tener exactamente 7 capítulos cronológicos', () => {
    expect(capitulosHistoria).toHaveLength(7);
  });

  it('el primer capítulo debe involucrar al Product Owner y al Product Backlog', () => {
    const primerPaso = capitulosHistoria[0];
    expect(primerPaso.idsNodosNuevos).toContain('role-product-owner');
    expect(primerPaso.idsNodosNuevos).toContain('artifact-product-backlog');
  });

  it('el último capítulo debe contemplar la Sprint Retrospective', () => {
    const ultimoPaso = capitulosHistoria[6];
    expect(ultimoPaso.idsNodosNuevos).toContain('event-sprint-retrospective');
  });
});

describe('Lógica de Revelación Progresiva (calcularElementosVisiblesHistoria)', () => {
  it('en el paso 1 solo debe revelar los nodos del primer capítulo', () => {
    const { nodosVisibles, aristasVisibles } = calcularElementosVisiblesHistoria(
      nodosScrum,
      aristasScrum,
      0
    );

    const idsVisibles = nodosVisibles.map((n) => n.id);
    expect(idsVisibles).toContain('role-product-owner');
    expect(idsVisibles).toContain('artifact-product-backlog');
    expect(idsVisibles).not.toContain('event-sprint-review');

    // Solo debe haber aristas entre nodos visibles
    aristasVisibles.forEach((a) => {
      expect(idsVisibles).toContain(a.source);
      expect(idsVisibles).toContain(a.target);
    });
  });

  it('en el paso final deben estar todos los nodos de Scrum visibles', () => {
    const { nodosVisibles } = calcularElementosVisiblesHistoria(
      nodosScrum,
      aristasScrum,
      6
    );

    expect(nodosVisibles.length).toBe(nodosScrum.length);
  });
});
