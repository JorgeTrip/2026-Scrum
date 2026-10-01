/**
 * Definición de los Artefactos oficiales de Scrum y sus Compromisos.
 * Carril Inferior: y = 520
 */

import type { NodoScrum } from '../types/scrum';

export const nodosArtefactos: NodoScrum[] = [
  {
    id: 'artifact-product-backlog',
    type: 'artifactNode',
    position: { x: 200, y: 520 },
    data: {
      id: 'artifact-product-backlog',
      label: 'Product Backlog',
      category: 'artifact',
      summary: 'Lista emergente y ordenada de todo lo que se sabe necesario para mejorar el producto.',
      details: {
        inputs: ['Visión estratégica', 'Investigación de usuarios', 'Feedback continuo del mercado'],
        outputs: [
          'Compromiso: Product Goal (Objetivo del Producto)',
          'Elementos del Product Backlog (PBI) refinados y ordenados'
        ],
        theoreticalBasis:
          'Es la única fuente de trabajo emprendido por el Scrum Team. El Product Goal describe un estado futuro del producto que sirve como objetivo a largo plazo hacia el cual el equipo puede planificar.'
      }
    }
  },
  {
    id: 'artifact-sprint-backlog',
    type: 'artifactNode',
    position: { x: 580, y: 520 },
    data: {
      id: 'artifact-sprint-backlog',
      label: 'Sprint Backlog',
      category: 'artifact',
      summary: 'Plan detallado por y para los Developers compuesto por el Sprint Goal, los PBI seleccionados y un plan accionable.',
      details: {
        inputs: ['Product Backlog priorizado', 'Capacidad del equipo', 'Definition of Done'],
        outputs: [
          'Compromiso: Sprint Goal (Objetivo del Sprint)',
          'Plan detallado de entrega diaria de tareas de ingeniería'
        ],
        theoreticalBasis:
          'Es un pronóstico realizado por los Developers sobre el trabajo necesario para lograr el Sprint Goal. Es altamente visible y se actualiza a lo largo del Sprint a medida que se aprende más.'
      }
    }
  },
  {
    id: 'artifact-increment',
    type: 'artifactNode',
    position: { x: 960, y: 520 },
    data: {
      id: 'artifact-increment',
      label: 'Increment',
      category: 'artifact',
      summary: 'Un peldaño concreto hacia el Product Goal; utilizable de inmediato y validado con la Definition of Done.',
      details: {
        inputs: ['Tareas técnicas completadas', 'Criterios de aceptación satisfechos'],
        outputs: [
          'Compromiso: Definition of Done (Definición de Terminado)',
          'Software o solución operativa potencialmente desplegable a producción'
        ],
        theoreticalBasis:
          'En el momento en que un elemento del Product Backlog cumple la Definition of Done, nace un Incremento. Si un elemento no cumple la Definition of Done, no puede ser lanzado ni presentado en el Sprint Review.'
      }
    }
  }
];
