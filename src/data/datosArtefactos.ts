/**
 * Definición de los Artefactos oficiales y herramientas estratégicas de Scrum.
 * Carril Inferior: y = 520
 */

import type { NodoScrum } from '../types/scrum';

export const nodosArtefactos: NodoScrum[] = [
  {
    id: 'artifact-vision-board',
    type: 'artifactNode',
    position: { x: -13, y: 620 },
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
    id: 'artifact-impact-mapping',
    type: 'artifactNode',
    position: { x: 215, y: 620 },
    data: {
      id: 'artifact-impact-mapping',
      label: 'Impact Mapping',
      category: 'artifact',
      summary: 'Técnica gráfica colaborativa que conecta metas de negocio con el comportamiento de actores y los entregables necesarios.',
      akas: ['Mapeo de Impacto', 'Goal-Oriented Mapping', 'Adzic Mapping'],
      details: {
        inputs: ['Product Vision Board', 'Metas estratégicas de negocio', 'Investigación de usuarios'],
        outputs: [
          'Compromiso: Hipótesis de Impacto Validadas',
          'Insumos priorizados para actividades de usuario y entregables clave'
        ],
        theoreticalBasis:
          'Desarrollado por Gojko Adzic; previene la trampa del feature-factory enfocando el esfuerzo únicamente en cambios de comportamiento medibles que mueven métricas de negocio.'
      }
    }
  },
  {
    id: 'artifact-user-story-mapping',
    type: 'artifactNode',
    position: { x: 460, y: 620 },
    data: {
      id: 'artifact-user-story-mapping',
      label: 'User Story Mapping',
      category: 'artifact',
      summary: 'Estructura visual bidimensional que organiza las historias de usuario a lo largo del viaje del cliente (Backbone) y prioriza en Slices.',
      akas: ['Mapa de Historias', 'Story Map', 'Patton Map', 'User Journey Map'],
      details: {
        inputs: ['Impact Mapping', 'Entrevistas de usuario', 'Flujo de actividades clave'],
        outputs: [
          'Compromiso: Rebanadas de Entrega (Slices)',
          'Historias de usuario contextualizadas listas para el Product Backlog'
        ],
        theoreticalBasis:
          'Creado por Jeff Patton; erradica la pérdida de contexto del backlog plano organizando las historias a lo largo del viaje del usuario para planificar iteraciones con sentido completo.'
      }
    }
  },
  {
    id: 'artifact-product-backlog',
    type: 'artifactNode',
    position: { x: 700, y: 620 },
    data: {
      id: 'artifact-product-backlog',
      label: 'Product Backlog',
      category: 'artifact',
      summary: 'Lista emergente y ordenada de todo lo que se sabe necesario para mejorar el producto, nutrida por el Story Map.',
      akas: ['PBL', 'Pila del Producto', 'Backlog del Producto', 'PBI List'],
      details: {
        inputs: ['User Story Mapping', 'Visión estratégica', 'Feedback continuo del mercado'],
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
    position: { x: 960, y: 620 },
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
    position: { x: 1300, y: 620 },
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
