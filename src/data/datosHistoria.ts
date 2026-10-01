/**
 * Definición formal de los 8 capítulos narrativos del flujo Scrum (Storytelling).
 * Inicia con el Prólogo Estratégico del Product Vision Board.
 */

export interface CapituloHistoria {
  id: number;
  pasoNumero: number;
  titulo: string;
  subtitulo: string;
  narrativa: string;
  /** Nodos que se incorporan por primera vez en este capítulo */
  idsNodosNuevos: string[];
  /** Nodos foco a destacar visualmente */
  idsDestacados: string[];
}

export const capitulosHistoria: CapituloHistoria[] = [
  {
    id: 0,
    pasoNumero: 1,
    titulo: 'Prólogo Estratégico: La Visión del Producto',
    subtitulo: 'Product Owner & Product Vision Board',
    narrativa:
      'Todo proyecto Scrum nace de una visión estratégica. Antes de redactar requerimientos o tareas técnicas, el Product Owner diseña el Product Vision Board. Esta herramienta responde: ¿Para quién es el producto?, ¿Qué necesidades críticas resuelve?, ¿Cuáles son sus atributos diferenciadores? y ¿Cuáles son los objetivos de negocio?',
    idsNodosNuevos: ['role-product-owner', 'artifact-vision-board'],
    idsDestacados: ['role-product-owner', 'artifact-vision-board']
  },
  {
    id: 1,
    pasoNumero: 2,
    titulo: 'El Product Backlog y el Product Goal',
    subtitulo: 'La lista ordenada y emergente de valor',
    narrativa:
      'Con la visión estratégica consolidada, el Product Owner define el Product Goal (Objetivo del Producto a largo plazo) y crea el Product Backlog: la única fuente ordenada y transparente de trabajo que el equipo emprenderá.',
    idsNodosNuevos: ['artifact-product-backlog'],
    idsDestacados: ['artifact-product-backlog', 'role-product-owner']
  },
  {
    id: 2,
    pasoNumero: 3,
    titulo: 'El Equipo Scrum y el Contenedor',
    subtitulo: 'Developers, Scrum Master & Sprint',
    narrativa:
      'Para hacer realidad la visión, se forma el Scrum Team: los Developers (quienes construyen la solución técnica con altos estándares de calidad) y el Scrum Master (líder servicial que promueve la efectividad). Todo el trabajo ocurrirá dentro del Sprint: un ciclo regular fijo de 1 a 4 semanas.',
    idsNodosNuevos: ['role-developers', 'role-scrum-master', 'event-sprint'],
    idsDestacados: ['role-developers', 'role-scrum-master', 'event-sprint']
  },
  {
    id: 3,
    pasoNumero: 4,
    titulo: 'Sprint Planning: El Compromiso',
    subtitulo: 'Definición del Sprint Goal & Sprint Backlog',
    narrativa:
      'Al iniciar el Sprint, el equipo completo realiza el Sprint Planning. Seleccionan elementos del Product Backlog, formalizan el Sprint Goal y desglosan el plan táctico de trabajo en el Sprint Backlog.',
    idsNodosNuevos: ['event-sprint-planning', 'artifact-sprint-backlog'],
    idsDestacados: ['event-sprint-planning', 'artifact-sprint-backlog']
  },
  {
    id: 4,
    pasoNumero: 5,
    titulo: 'Ejecución Diaria y Sincronización',
    subtitulo: 'La Daily Scrum de 15 minutos',
    narrativa:
      'Día a día, los Developers trabajan coordinadamente. Cada 24 horas realizan la Daily Scrum (15 minutos) para inspeccionar el progreso hacia el Sprint Goal, detectar impedimentos tempranos y adaptar el plan de trabajo.',
    idsNodosNuevos: ['event-daily-scrum'],
    idsDestacados: ['event-daily-scrum', 'role-developers']
  },
  {
    id: 5,
    pasoNumero: 6,
    titulo: 'Nacimiento del Incremento Terminado',
    subtitulo: 'Compromiso: Definition of Done (DoD)',
    narrativa:
      'Como resultado del esfuerzo de ingeniería, los Developers generan un Incremento utilizable. No es un borrador: cumple estrictamente la Definition of Done y aporta valor tangible que puede ponerse en producción.',
    idsNodosNuevos: ['artifact-increment'],
    idsDestacados: ['artifact-increment']
  },
  {
    id: 6,
    pasoNumero: 7,
    titulo: 'Sprint Review: Inspección de Valor',
    subtitulo: 'Colaboración activa con los Interesados',
    narrativa:
      'Hacia el final del Sprint, el Scrum Team se reúne con los clientes e interesados clave en el Sprint Review. Presentan el Incremento terminado, reciben retroalimentación y adaptan el Product Backlog para maximizar el valor futuro.',
    idsNodosNuevos: ['event-sprint-review'],
    idsDestacados: ['event-sprint-review', 'artifact-increment']
  },
  {
    id: 7,
    pasoNumero: 8,
    titulo: 'Sprint Retrospective: La Mejora Continua',
    subtitulo: 'Cierre del ciclo y adaptación al próximo Sprint',
    narrativa:
      'Antes de concluir el Sprint, el equipo se reúne en la Sprint Retrospective facilitada por el Scrum Master. Inspeccionan personas, procesos y herramientas para acordar mejoras concretas que se aplicarán en el siguiente ciclo.',
    idsNodosNuevos: ['event-sprint-retrospective'],
    idsDestacados: ['event-sprint-retrospective', 'role-scrum-master']
  }
];
