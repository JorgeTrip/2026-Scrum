import { describe, it, expect } from 'vitest';
import { nodosArtefactos } from '../src/data/datosArtefactos';
import { capitulosHistoria } from '../src/data/datosHistoria';
import { aristasScrum } from '../src/data/scrumData';
import { calcularElementosVisiblesHistoria } from '../src/hooks/useHistoriaScrum';
import { nodosScrum } from '../src/data/scrumData';

describe('Modelos de Impact Mapping y User Story Mapping en Artefactos', () => {
  it('debe contener Impact Mapping y User Story Mapping en nodosArtefactos', () => {
    const ids = nodosArtefactos.map((a) => a.id);
    expect(ids).toContain('artifact-impact-mapping');
    expect(ids).toContain('artifact-user-story-mapping');
    expect(ids).toContain('artifact-product-backlog');
  });

  it('debe respetar el orden espacial horizontal canónico en el canvas', () => {
    const posVB = nodosArtefactos.find((a) => a.id === 'artifact-vision-board')?.position.x ?? 0;
    const posIM = nodosArtefactos.find((a) => a.id === 'artifact-impact-mapping')?.position.x ?? 0;
    const posUSM = nodosArtefactos.find((a) => a.id === 'artifact-user-story-mapping')?.position.x ?? 0;
    const posPB = nodosArtefactos.find((a) => a.id === 'artifact-product-backlog')?.position.x ?? 0;
    const posSB = nodosArtefactos.find((a) => a.id === 'artifact-sprint-backlog')?.position.x ?? 0;
    const posInc = nodosArtefactos.find((a) => a.id === 'artifact-increment')?.position.x ?? 0;

    // VB < IM < USM < PB < SB < Inc
    expect(posVB).toBeLessThan(posIM);
    expect(posIM).toBeLessThan(posUSM);
    expect(posUSM).toBeLessThan(posPB);
    expect(posPB).toBeLessThan(posSB);
    expect(posSB).toBeLessThan(posInc);
  });
});

describe('Secuencia Canónica del Flujo General (10 Capítulos)', () => {
  it('debe contener exactamente 10 capítulos en capitulosHistoria', () => {
    expect(capitulosHistoria).toHaveLength(10);
  });

  it('en el paso 2 debe introducir el Impact Mapping', () => {
    const paso2 = capitulosHistoria[1];
    expect(paso2.idsNodosNuevos).toContain('artifact-impact-mapping');
  });

  it('en el paso 3 debe introducir el User Story Mapping previo al Product Backlog', () => {
    const paso3 = capitulosHistoria[2];
    expect(paso3.idsNodosNuevos).toContain('artifact-user-story-mapping');
  });

  it('en el paso 4 debe conformarse el Product Backlog derivado del Story Map', () => {
    const paso4 = capitulosHistoria[3];
    expect(paso4.idsNodosNuevos).toContain('artifact-product-backlog');
  });
});

describe('Aristas del Flujo de Product Discovery', () => {
  it('debe enlazar secuencialmente Vision Board ➔ Impact Mapping ➔ User Story Mapping ➔ Product Backlog', () => {
    const aristaVB_IM = aristasScrum.find(
      (a) => a.source === 'artifact-vision-board' && a.target === 'artifact-impact-mapping'
    );
    const aristaIM_USM = aristasScrum.find(
      (a) => a.source === 'artifact-impact-mapping' && a.target === 'artifact-user-story-mapping'
    );
    const aristaUSM_PB = aristasScrum.find(
      (a) => a.source === 'artifact-user-story-mapping' && a.target === 'artifact-product-backlog'
    );

    expect(aristaVB_IM).toBeDefined();
    expect(aristaIM_USM).toBeDefined();
    expect(aristaUSM_PB).toBeDefined();
  });
});

describe('Revelación Progresiva del Flujo General', () => {
  it('en el paso 2 de la historia, el User Story Mapping es visible pero el Product Backlog aun no', () => {
    // paso 2 es índice 2 (pasoNumero: 3: User Story Mapping)
    const { nodosVisibles } = calcularElementosVisiblesHistoria(nodosScrum, aristasScrum, 2);
    const idsVisibles = nodosVisibles.map((n) => n.id);

    expect(idsVisibles).toContain('artifact-vision-board');
    expect(idsVisibles).toContain('artifact-impact-mapping');
    expect(idsVisibles).toContain('artifact-user-story-mapping');
    expect(idsVisibles).not.toContain('artifact-product-backlog');
  });
});
