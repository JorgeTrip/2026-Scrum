/**
 * Definición de los Artefactos oficiales y herramientas estratégicas de Scrum.
 * Carril Inferior: y = 520
 */

import type { NodoScrum } from '../types/scrum';

export const nodosArtefactos: NodoScrum[] = [
  {
    id: 'artifact-vision-board',
    type: 'artifactNode',
    position: { x: 60, y: 520 },
    data: {
      id: 'artifact-vision-board',
      label: 'Product Vision Board',
      category: 'artifact',
      summary: 'Marco visual estratégico que define el grupo objetivo, necesidades del usuario, propuesta de valor y metas del negocio.',
      akas: ['Tablero de Visión', 'Product Vision Canvas', 'Visión del Producto'],
      details: {
        inputs: ['Investigación de mercado', 'Entrevistas con clientes', 'Visión corporativa'],
        outputs: [
          'Compromiso: Visión Clara del Producto',
          'Fundamento conceptual del Product Goal y del Product Backlog inicial'
        ],
        theoreticalBasis:
          'Desarrollado por Roman Pichler; actúa como la brújula estratégica que responde el "por qué" y "para quién" antes de iniciar la gestión del backlog.'
      }
    }
  },
  {
    id: 'artifact-product-backlog',
    type: 'artifactNode',
    position: { x: 380, y: 520 },
    data: {
      id: 'artifact-product-backlog',
      label: 'Product Backlog',
      category: 'artifact',
      summary: 'Lista emergente y ordenada de todo lo que se sabe necesario para mejorar el producto.',
      akas: ['PBL', 'Pila del Producto', 'Backlog del Producto', 'PBI List'],
      details: {
        inputs: ['Product Vision Board', 'Visión estratégica', 'Feedback continuo del mercado'],
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
    position: { x: 700, y: 520 },
    data: {
      id: 'artifact-sprint-backlog',
      label: 'Sprint Backlog',
      category: 'artifact',
      summary: 'Plan detallado por y para los Developers compuesto por el Sprint Goal, los PBI seleccionados y un plan accionable.',
      akas: ['SBL', 'Pila del Sprint', 'Backlog del Sprint', 'Plan del Sprint'],
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
    position: { x: 1020, y: 520 },
    data: {
      id: 'artifact-increment',
      label: 'Increment',
      category: 'artifact',
      summary: 'Un peldaño concreto hacia el Product Goal; utilizable de inmediato y validado con la Definition of Done.',
      akas: ['Incremento de Producto', 'Entregable Terminado', 'PSPI (Potentially Shippable)'],
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
