import { describe, it, expect } from 'vitest';
import { aplicarFiltroANodos } from '../src/hooks/useFiltroScrum';
import { nodosScrum } from '../src/data/scrumData';

describe('Lógica de Filtrado (aplicarFiltroANodos)', () => {
  it('mantiene todos los nodos con opacidad 1.0 por defecto', () => {
    const nodos = aplicarFiltroANodos(nodosScrum, 'all', '');
    expect(nodos.every((n) => n.data.opacity === 1.0)).toBe(true);
  });

  it('atenúa los nodos que no pertenecen a la categoría seleccionada', () => {
    const nodos = aplicarFiltroANodos(nodosScrum, 'role', '');
    const roles = nodos.filter((n) => n.data.category === 'role');
    const noRoles = nodos.filter((n) => n.data.category !== 'role');

    expect(roles.every((n) => n.data.opacity === 1.0)).toBe(true);
    expect(noRoles.every((n) => n.data.opacity === 0.2)).toBe(true);
  });

  it('atenúa nodos que no coinciden con la búsqueda de texto', () => {
    const nodos = aplicarFiltroANodos(nodosScrum, 'all', 'Increment');
    const nodoIncremento = nodos.find((n) => n.id === 'artifact-increment');
    const nodoPlanning = nodos.find((n) => n.id === 'event-sprint-planning');

    expect(nodoIncremento?.data.opacity).toBe(1.0);
    expect(nodoPlanning?.data.opacity).toBe(0.2);
  });

  it('permite buscar y resaltar nodos por sus denominaciones alternativas (AKA)', () => {
    // Búsqueda por alias "Daily Standup" para encontrar Daily Scrum
    const nodosStandup = aplicarFiltroANodos(nodosScrum, 'all', 'Daily Standup');
    const nodoDaily = nodosStandup.find((n) => n.id === 'event-daily-scrum');
    const nodoReview = nodosStandup.find((n) => n.id === 'event-sprint-review');

    expect(nodoDaily?.data.opacity).toBe(1.0);
    expect(nodoReview?.data.opacity).toBe(0.2);

    // Búsqueda por acrónimo "PO" para encontrar Product Owner
    const nodosPO = aplicarFiltroANodos(nodosScrum, 'all', 'PO');
    const nodoPO = nodosPO.find((n) => n.id === 'role-product-owner');
    expect(nodoPO?.data.opacity).toBe(1.0);
  });
});
