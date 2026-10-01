import { describe, it, expect } from 'vitest';
import { capitulosHistoria } from '../src/data/datosHistoria';
import { calcularElementosVisiblesHistoria } from '../src/hooks/useHistoriaScrum';
import { nodosScrum, aristasScrum } from '../src/data/scrumData';

describe('Capítulos de la Historia de Scrum (datosHistoria)', () => {
  it('debe tener exactamente 8 capítulos cronológicos comenzando con el prólogo', () => {
    expect(capitulosHistoria).toHaveLength(8);
  });

  it('el primer capítulo (prólogo) debe involucrar al Product Owner y al Product Vision Board', () => {
    const primerPaso = capitulosHistoria[0];
    expect(primerPaso.idsNodosNuevos).toContain('role-product-owner');
    expect(primerPaso.idsNodosNuevos).toContain('artifact-vision-board');
  });

  it('el segundo capítulo debe incorporar el Product Backlog', () => {
    const segundoPaso = capitulosHistoria[1];
    expect(segundoPaso.idsNodosNuevos).toContain('artifact-product-backlog');
  });

  it('el último capítulo debe contemplar la Sprint Retrospective', () => {
    const ultimoPaso = capitulosHistoria[7];
    expect(ultimoPaso.idsNodosNuevos).toContain('event-sprint-retrospective');
  });
});

describe('Lógica de Revelación Progresiva (calcularElementosVisiblesHistoria)', () => {
  it('en el paso 1 solo debe revelar los nodos del primer capítulo (PO y Vision Board)', () => {
    const { nodosVisibles, aristasVisibles } = calcularElementosVisiblesHistoria(
      nodosScrum,
      aristasScrum,
      0
    );

    const idsVisibles = nodosVisibles.map((n) => n.id);
    expect(idsVisibles).toContain('role-product-owner');
    expect(idsVisibles).toContain('artifact-vision-board');
    expect(idsVisibles).not.toContain('artifact-product-backlog');
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
      7
    );

    expect(nodosVisibles.length).toBe(nodosScrum.length);
  });
});
