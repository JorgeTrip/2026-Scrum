/**
 * Definición formal de los 10 capítulos narrativos del flujo Scrum (Storytelling).
 * Incorpora el ciclo canónico de Product Discovery: Vision Board ➔ Impact Mapping ➔ User Story Mapping ➔ Product Backlog.
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
    titulo: 'Alineación de Impacto: Impact Mapping',
    subtitulo: 'Metas, Actores, Impactos y Entregables',
    narrativa:
      'Antes de generar historias aisladas, se aplica Impact Mapping (Gojko Adzic). Conecta el objetivo estratégico de negocio con los actores clave, los cambios de comportamiento medibles que se buscan provocar y las hipótesis de entregables necesarias, evitando construir funcionalidades que no agreguen valor real.',
    idsNodosNuevos: ['artifact-impact-mapping'],
    idsDestacados: ['artifact-impact-mapping', 'artifact-vision-board']
  },
  {
    id: 2,
    pasoNumero: 3,
    titulo: 'Descubrimiento y User Journey: User Story Mapping',
    subtitulo: 'Estructuración Bidimensional del Viaje del Usuario',
    narrativa:
      'Con los impactos definidos, se construye el User Story Mapping (Jeff Patton). Se mapea la columna vertebral del viaje del cliente de izquierda a derecha (actividades y pasos) y se desglosan verticalmente las historias de usuario, erradicando la pérdida de contexto del backlog plano y permitiendo definir cortes de valor.',
    idsNodosNuevos: ['artifact-user-story-mapping'],
    idsDestacados: ['artifact-user-story-mapping', 'artifact-impact-mapping']
  },
  {
    id: 3,
    pasoNumero: 4,
    titulo: 'El Product Backlog y el Product Goal',
    subtitulo: 'La lista ordenada y emergente de valor',
    narrativa:
      'Nutrido directamente de las historias descubiertas en el Story Map, el Product Owner formaliza el Product Goal (Objetivo del Producto a largo plazo) y consolida el Product Backlog: la única fuente ordenada y transparente de trabajo que el equipo emprenderá.',
    idsNodosNuevos: ['artifact-product-backlog'],
    idsDestacados: ['artifact-product-backlog', 'artifact-user-story-mapping', 'role-product-owner']
  },
  {
    id: 4,
    pasoNumero: 5,
    titulo: 'El Equipo Scrum y el Contenedor',
    subtitulo: 'Developers, Scrum Master & Sprint',
    narrativa:
      'Para hacer realidad la visión, se forma el Scrum Team: los Developers (quienes construyen la solución técnica con altos estándares de calidad) y el Scrum Master (líder servicial que promueve la efectividad). Todo el trabajo ocurrirá dentro del Sprint: un ciclo regular fijo de 1 a 4 semanas.',
    idsNodosNuevos: ['role-developers', 'role-scrum-master', 'event-sprint'],
    idsDestacados: ['role-developers', 'role-scrum-master', 'event-sprint']
  },
  {
    id: 5,
    pasoNumero: 6,
    titulo: 'Sprint Planning: El Compromiso',
    subtitulo: 'Definición del Sprint Goal & Sprint Backlog',
    narrativa:
      'Al iniciar el Sprint, el equipo completo realiza el Sprint Planning. Seleccionan elementos del Product Backlog, formalizan el Sprint Goal y desglosan el plan táctico de trabajo en el Sprint Backlog.',
    idsNodosNuevos: ['event-sprint-planning', 'artifact-sprint-backlog'],
    idsDestacados: ['event-sprint-planning', 'artifact-sprint-backlog']
  },
  {
    id: 6,
    pasoNumero: 7,
    titulo: 'Ejecución Diaria y Sincronización',
    subtitulo: 'La Daily Scrum de 15 minutos',
    narrativa:
      'Día a día, los Developers trabajan coordinadamente. Cada 24 horas realizan la Daily Scrum (15 minutos) para inspeccionar el progreso hacia el Sprint Goal, detectar impedimentos tempranos y adaptar el plan de trabajo.',
    idsNodosNuevos: ['event-daily-scrum'],
    idsDestacados: ['event-daily-scrum', 'role-developers']
  },
  {
    id: 7,
    pasoNumero: 8,
    titulo: 'Nacimiento del Incremento Terminado',
    subtitulo: 'Compromiso: Definition of Done (DoD)',
    narrativa:
      'Como resultado del esfuerzo de ingeniería, los Developers generan un Incremento utilizable. No es un borrador: cumple estrictamente la Definition of Done y aporta valor tangible que puede ponerse en producción.',
    idsNodosNuevos: ['artifact-increment'],
    idsDestacados: ['artifact-increment']
  },
  {
    id: 8,
    pasoNumero: 9,
    titulo: 'Sprint Review: Inspección de Valor',
    subtitulo: 'Colaboración activa con los Interesados',
    narrativa:
      'Hacia el final del Sprint, el Scrum Team se reúne con los clientes e interesados clave en el Sprint Review. Presentan el Incremento terminado, reciben retroalimentación y adaptan el Product Backlog para maximizar el valor futuro.',
    idsNodosNuevos: ['event-sprint-review'],
    idsDestacados: ['event-sprint-review', 'artifact-increment']
  },
  {
    id: 9,
    pasoNumero: 10,
    titulo: 'Sprint Retrospective: La Mejora Continua',
    subtitulo: 'Cierre del ciclo y adaptación al próximo Sprint',
    narrativa:
      'Antes de concluir el Sprint, el equipo se reúne en la Sprint Retrospective facilitada por el Scrum Master. Inspeccionan personas, procesos y herramientas para acordar mejoras concretas que se aplicarán en el siguiente ciclo.',
    idsNodosNuevos: ['event-sprint-retrospective'],
    idsDestacados: ['event-sprint-retrospective', 'role-scrum-master']
  }
];
