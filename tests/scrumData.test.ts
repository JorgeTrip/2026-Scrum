import { describe, it, expect } from 'vitest';
import { nodosScrum, aristasScrum } from '../src/data/scrumData';
import { calcularOpacidadNodo } from '../src/utils/filtroUtilidades';

describe('Modelo de Datos Scrum (scrumData)', () => {
  it('debe contener los 3 roles oficiales de Scrum', () => {
    const roles = nodosScrum.filter((n) => n.data.category === 'role');
    expect(roles).toHaveLength(3);
    const idsRoles = roles.map((r) => r.id);
    expect(idsRoles).toContain('role-product-owner');
    expect(idsRoles).toContain('role-scrum-master');
    expect(idsRoles).toContain('role-developers');
  });

  it('debe contener los 5 eventos oficiales de Scrum', () => {
    const eventos = nodosScrum.filter((n) => n.data.category === 'event');
    expect(eventos).toHaveLength(5);
    const idsEventos = eventos.map((e) => e.id);
    expect(idsEventos).toContain('event-sprint');
    expect(idsEventos).toContain('event-sprint-planning');
    expect(idsEventos).toContain('event-daily-scrum');
    expect(idsEventos).toContain('event-sprint-review');
    expect(idsEventos).toContain('event-sprint-retrospective');
  });

  it('debe contener el Product Vision Board y los 3 artefactos oficiales', () => {
    const artefactos = nodosScrum.filter((n) => n.data.category === 'artifact');
    expect(artefactos).toHaveLength(4);
    const idsArtefactos = artefactos.map((a) => a.id);
    expect(idsArtefactos).toContain('artifact-vision-board');
    expect(idsArtefactos).toContain('artifact-product-backlog');
    expect(idsArtefactos).toContain('artifact-sprint-backlog');
    expect(idsArtefactos).toContain('artifact-increment');

    // Verificar compromisos y conexiones
    const vb = artefactos.find((a) => a.id === 'artifact-vision-board');
    expect(vb?.data.details.outputs?.some((o) => o.includes('Visión'))).toBe(true);

    const pb = artefactos.find((a) => a.id === 'artifact-product-backlog');
    expect(pb?.data.details.outputs?.some((o) => o.includes('Product Goal'))).toBe(true);

    const sb = artefactos.find((a) => a.id === 'artifact-sprint-backlog');
    expect(sb?.data.details.outputs?.some((o) => o.includes('Sprint Goal'))).toBe(true);

    const inc = artefactos.find((a) => a.id === 'artifact-increment');
    expect(inc?.data.details.outputs?.some((o) => o.includes('Definition of Done'))).toBe(true);
  });

  it('debe contener las aristas clave del flujo metodológico', () => {
    const conexiones = aristasScrum.map((e) => `${e.source}->${e.target}`);
    expect(conexiones).toContain('role-product-owner->artifact-vision-board');
    expect(conexiones).toContain('artifact-vision-board->artifact-product-backlog');
    expect(conexiones).toContain('artifact-product-backlog->event-sprint-planning');
    expect(conexiones).toContain('event-sprint-planning->artifact-sprint-backlog');
    expect(conexiones).toContain('role-developers->event-daily-scrum');
    expect(conexiones).toContain('artifact-sprint-backlog->artifact-increment');
    expect(conexiones).toContain('artifact-increment->event-sprint-review');
  });

  it('todas las aristas deben tener sourceHandle y targetHandle separados para evitar solapamientos', () => {
    aristasScrum.forEach((a) => {
      expect(a.sourceHandle).toBeDefined();
      expect(a.targetHandle).toBeDefined();
    });

    // Validar que el Product Owner use handles distintos para sus dos salidas
    const aristasPO = aristasScrum.filter((a) => a.source === 'role-product-owner');
    const handlesPO = aristasPO.map((a) => a.sourceHandle);
    expect(new Set(handlesPO).size).toBe(aristasPO.length);

    // Validar que los Developers usen handles distintos para sus dos salidas
    const aristasDevs = aristasScrum.filter((a) => a.source === 'role-developers');
    const handlesDevs = aristasDevs.map((a) => a.sourceHandle);
    expect(new Set(handlesDevs).size).toBe(aristasDevs.length);
  });
});

describe('Utilidades de Filtrado y Opacidad (filtroUtilidades)', () => {
  const nodoPrueba = {
    id: 'role-po',
    label: 'Product Owner',
    category: 'role' as const,
    summary: 'Maximiza el valor del producto',
    details: {
      responsibilities: ['Gestión del Product Backlog'],
      theoreticalBasis: 'Guía Scrum'
    }
  };

  it('debe devolver opacidad 1.0 si coincide categoría y texto vacío', () => {
    const opacidad = calcularOpacidadNodo(nodoPrueba, 'role', '');
    expect(opacidad).toBe(1.0);
  });

  it('debe devolver opacidad atenuada (0.2) si la categoría no coincide', () => {
    const opacidad = calcularOpacidadNodo(nodoPrueba, 'event', '');
    expect(opacidad).toBe(0.2);
  });

  it('debe devolver opacidad 1.0 si la búsqueda coincide con el label o resumen', () => {
    const opacidad = calcularOpacidadNodo(nodoPrueba, 'all', 'maximiza');
    expect(opacidad).toBe(1.0);
  });

  it('debe devolver opacidad 0.2 si la búsqueda no coincide', () => {
    const opacidad = calcularOpacidadNodo(nodoPrueba, 'all', 'retrospectiva');
    expect(opacidad).toBe(0.2);
  });
});
