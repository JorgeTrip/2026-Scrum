/**
 * Definición formal de los 7 capítulos narrativos del flujo Scrum (Storytelling).
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
    titulo: 'El Origen y la Visión del Producto',
    subtitulo: 'Product Owner & Product Backlog',
    narrativa:
      'Todo proyecto Scrum nace de una necesidad de negocio. El Product Owner es el líder visionario que recopila requerimientos y define el Product Backlog, guiado por un compromiso formal: el Product Goal.',
    idsNodosNuevos: ['role-product-owner', 'artifact-product-backlog'],
    idsDestacados: ['role-product-owner', 'artifact-product-backlog']
  },
  {
    id: 1,
    pasoNumero: 2,
    titulo: 'El Equipo Scrum y el Contenedor',
    subtitulo: 'Developers, Scrum Master & Sprint',
    narrativa:
      'Para hacer realidad la visión, se forma el Scrum Team: los Developers (quienes construyen la solución) y el Scrum Master (quien facilita el proceso). Todo el trabajo se desarrollará dentro de un ciclo regular de 1 a 4 semanas: el Sprint.',
    idsNodosNuevos: ['role-developers', 'role-scrum-master', 'event-sprint'],
    idsDestacados: ['role-developers', 'role-scrum-master', 'event-sprint']
  },
  {
    id: 2,
    pasoNumero: 3,
    titulo: 'Sprint Planning: El Plan y el Compromiso',
    subtitulo: 'Definición del Sprint Goal & Sprint Backlog',
    narrativa:
      'Al iniciar el Sprint, el equipo completo realiza el Sprint Planning. Seleccionan elementos del Product Backlog, establecen el Sprint Goal y desglosan las tareas técnicas en el Sprint Backlog.',
    idsNodosNuevos: ['event-sprint-planning', 'artifact-sprint-backlog'],
    idsDestacados: ['event-sprint-planning', 'artifact-sprint-backlog']
  },
  {
    id: 3,
    pasoNumero: 4,
    titulo: 'Ejecución Diaria y Sincronización',
    subtitulo: 'La Daily Scrum de 15 minutos',
    narrativa:
      'Día a día, los Developers trabajan coordinadamente. Cada 24 horas realizan la Daily Scrum (15 minutos) para inspeccionar el progreso hacia el Sprint Goal, detectar impedimentos tempranos y adaptar el plan de trabajo.',
    idsNodosNuevos: ['event-daily-scrum'],
    idsDestacados: ['event-daily-scrum', 'role-developers']
  },
  {
    id: 4,
    pasoNumero: 5,
    titulo: 'Nacimiento del Incremento Terminado',
    subtitulo: 'Compromiso: Definition of Done (DoD)',
    narrativa:
      'Como resultado del trabajo de ingeniería, los Developers generan un Incremento utilizable. No es un prototipo ni trabajo a medias: cumple estrictamente la Definition of Done y aporta valor tangible al producto.',
    idsNodosNuevos: ['artifact-increment'],
    idsDestacados: ['artifact-increment']
  },
  {
    id: 5,
    pasoNumero: 6,
    titulo: 'Sprint Review: Inspección de Valor',
    subtitulo: 'Colaboración activa con los Interesados',
    narrativa:
      'Hacia el final del Sprint, el Scrum Team se reúne con los clientes e interesados clave en el Sprint Review. Muestran el Incremento funcionando, reciben retroalimentación en vivo y adaptan el Product Backlog para el futuro.',
    idsNodosNuevos: ['event-sprint-review'],
    idsDestacados: ['event-sprint-review', 'artifact-increment']
  },
  {
    id: 6,
    pasoNumero: 7,
    titulo: 'Sprint Retrospective: La Mejora Continua',
    subtitulo: 'Cierre del ciclo y adaptación al próximo Sprint',
    narrativa:
      'Antes de concluir el Sprint, el equipo se reúne en la Sprint Retrospective facilitada por el Scrum Master. Inspeccionan personas, relaciones y herramientas para acordar mejoras concretas que se aplicarán en el siguiente Sprint.',
    idsNodosNuevos: ['event-sprint-retrospective'],
    idsDestacados: ['event-sprint-retrospective', 'role-scrum-master']
  }
];
