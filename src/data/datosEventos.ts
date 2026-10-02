/**
 * Definición de los Eventos oficiales de Scrum (Ceremonias).
 * Carril Medio: y = 290
 */

import type { NodoScrum } from '../types/scrum';

export const nodosEventos: NodoScrum[] = [
  {
    id: 'event-sprint',
    type: 'eventNode',
    position: { x: 430, y: 257 },
    data: {
      id: 'event-sprint',
      label: 'Sprint',
      category: 'event',
      summary: 'El corazón de Scrum; un contenedor de longitud fija donde se materializan ideas en valor tangible.',
      akas: ['El Sprint', 'Iteración', 'Ciclo de Desarrollo', 'Timebox'],
      details: {
        timebox: '1 a 4 semanas (duración constante durante el desarrollo).',
        inputs: ['Product Backlog refinado', 'Visión del producto', 'Capacidad del equipo'],
        outputs: ['Al menos un Incremento utilizable e inspeccionable con Definition of Done'],
        theoreticalBasis:
          'Cada Sprint puede considerarse un proyecto corto. Permite predictibilidad al asegurar la inspección y adaptación del progreso hacia el Product Goal al menos una vez al mes.'
      }
    }
  },
  {
    id: 'event-sprint-planning',
    type: 'eventNode',
    position: { x: 851, y: 257 },
    data: {
      id: 'event-sprint-planning',
      label: 'Sprint Planning',
      category: 'event',
      summary: 'Evento que da inicio al Sprint definiendo el trabajo que se llevará a cabo durante su ciclo.',
      akas: ['Planificación del Sprint', 'Planning', 'Reunión de Planificación'],
      details: {
        timebox: 'Máximo 8 horas para un Sprint de un mes (proporcionalmente menor para Sprints más breves).',
        inputs: ['Product Backlog', 'Rendimiento pasado del equipo', 'Capacidad proyectada'],
        outputs: ['Sprint Goal formalizado', 'Selección de PBI para el Sprint', 'Plan de ejecución inicial'],
        theoreticalBasis:
          'Aborda tres temas esenciales: ¿Por qué es valioso este Sprint? (Sprint Goal), ¿Qué se puede hacer en este Sprint? y ¿Cómo se llevará a cabo el trabajo seleccionado?'
      }
    }
  },
  {
    id: 'event-daily-scrum',
    type: 'eventNode',
    position: { x: 1334, y: 257 },
    data: {
      id: 'event-daily-scrum',
      label: 'Daily Scrum',
      category: 'event',
      summary: 'Evento diario de 15 minutos para que los Developers inspeccionen el progreso hacia el Sprint Goal.',
      akas: ['Daily Standup', 'Daily', 'Scrum Diario', 'Reunión Diaria'],
      details: {
        timebox: '15 minutos diarios a la misma hora y en el mismo lugar.',
        inputs: ['Sprint Backlog actual', 'Estado de las tareas en curso', 'Impedimentos emergentes'],
        outputs: ['Sprint Backlog adaptado', 'Plan táctico de trabajo para las siguientes 24 horas'],
        theoreticalBasis:
          'Mejora las comunicaciones, identifica impedimentos tempranos, promueve la rápida toma de decisiones y elimina la necesidad de otras reuniones innecesarias.'
      }
    }
  },
  {
    id: 'event-sprint-review',
    type: 'eventNode',
    position: { x: 1815, y: 257 },
    data: {
      id: 'event-sprint-review',
      label: 'Sprint Review',
      category: 'event',
      summary: 'Sesión colaborativa donde el Scrum Team y los interesados inspeccionan el resultado del Sprint.',
      akas: ['Revisión del Sprint', 'Demo', 'Sprint Demo', 'Demostración'],
      details: {
        timebox: 'Máximo 4 horas para un Sprint de un mes.',
        inputs: ['Incremento completado que cumple la Definition of Done', 'Cambios del mercado/negocio'],
        outputs: ['Product Backlog adaptado con feedback fresco', 'Proyecciones de lanzamiento actualizadas'],
        theoreticalBasis:
          'Es una sesión de trabajo activa donde los asistentes colaboran sobre lo que se completó y lo que ha cambiado en el entorno de negocio para decidir qué hacer a continuación.'
      }
    }
  },
  {
    id: 'event-sprint-retrospective',
    type: 'eventNode',
    position: { x: 2205, y: 262 },
    data: {
      id: 'event-sprint-retrospective',
      label: 'Sprint Retrospective',
      category: 'event',
      summary: 'Espacio para que el Scrum Team inspeccione su desempeño y diseñe un plan de mejoras de calidad y efectividad.',
      akas: ['Retrospectiva del Sprint', 'Retro', 'Sprint Retro'],
      details: {
        timebox: 'Máximo 3 horas para un Sprint de un mes.',
        inputs: ['Experiencia vivida durante el Sprint (personas, relaciones, procesos y herramientas)'],
        outputs: ['Mejoras accionables priorizadas para ser implementadas en el siguiente Sprint'],
        theoreticalBasis:
          'Cierra el ciclo del Sprint actual fomentando la mejora continua. Se analizan qué salió bien, qué problemas surgieron y cómo se resolvieron o pueden resolverse mejor.'
      }
    }
  }
];
