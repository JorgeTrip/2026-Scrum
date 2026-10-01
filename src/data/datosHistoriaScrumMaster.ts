/**
 * Definición formal de los 5 capítulos narrativos del modo temático:
 * "El Rol del Scrum Master" (Líder Servicial).
 */

import type { CapituloHistoria } from './datosHistoria';

export const capitulosHistoriaScrumMaster: CapituloHistoria[] = [
  {
    id: 0,
    pasoNumero: 1,
    titulo: 'El Líder Servicial y el Contenedor',
    subtitulo: 'Scrum Master & El Sprint',
    narrativa:
      'El Scrum Master es responsable de instaurar Scrum según la Guía Oficial y fomentar la efectividad de todo el equipo. Asegura que el contenedor Sprint y todas sus ceremonias se lleven a cabo dentro de sus timeboxes de forma constructiva, positiva y enfocada en el empirismo.',
    idsNodosNuevos: ['role-scrum-master', 'event-sprint'],
    idsDestacados: ['role-scrum-master', 'event-sprint']
  },
  {
    id: 1,
    pasoNumero: 2,
    titulo: 'Servicio a los Developers',
    subtitulo: 'Autogestión y Remoción de Impedimentos',
    narrativa:
      'El Scrum Master asiste al equipo de desarrollo guiándolos en autogestión y multidisciplinariedad. Su misión primordial es derribar barreras, resolver conflictos y eliminar impedimentos organizacionales que frenen el avance técnico de los Developers.',
    idsNodosNuevos: ['role-developers'],
    idsDestacados: ['role-scrum-master', 'role-developers']
  },
  {
    id: 2,
    pasoNumero: 3,
    titulo: 'Servicio al Product Owner',
    subtitulo: 'Técnicas de Product Goal y Backlog Refinement',
    narrativa:
      'Colabora estrechamente con el Product Owner facilitando técnicas para definir un Product Goal inspirador y claro. Ayuda a estructurar y ordenar el Product Backlog con enfoque empírico para maximizar el valor entregado.',
    idsNodosNuevos: ['role-product-owner', 'artifact-product-backlog'],
    idsDestacados: ['role-scrum-master', 'role-product-owner', 'artifact-product-backlog']
  },
  {
    id: 3,
    pasoNumero: 4,
    titulo: 'Compromiso con la Calidad',
    subtitulo: 'Vela por la Definition of Done',
    narrativa:
      'El Scrum Master promueve que el Scrum Team no comprometa la calidad. Fomenta que cada Incremento generado cumpla sin excepciones la Definition of Done, protegiendo al producto de la deuda técnica y garantizando que sea utilizable.',
    idsNodosNuevos: ['artifact-increment'],
    idsDestacados: ['role-scrum-master', 'artifact-increment']
  },
  {
    id: 4,
    pasoNumero: 5,
    titulo: 'Facilitación de la Mejora Continua',
    subtitulo: 'La Sprint Retrospective',
    narrativa:
      'Al concluir cada Sprint, el Scrum Master facilita la Sprint Retrospective. Crea un entorno psicológicamente seguro para que el equipo reflexione sobre personas, relaciones y herramientas, acordando mejoras accionables para el siguiente ciclo.',
    idsNodosNuevos: ['event-sprint-retrospective'],
    idsDestacados: ['role-scrum-master', 'event-sprint-retrospective']
  }
];
