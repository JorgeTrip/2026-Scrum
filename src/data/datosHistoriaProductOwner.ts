/**
 * Definición formal de los 5 capítulos narrativos del modo temático:
 * "El Rol del Product Owner" (Maximizador de Valor).
 */

import type { CapituloHistoria } from './datosHistoria';

export const capitulosHistoriaProductOwner: CapituloHistoria[] = [
  {
    id: 0,
    pasoNumero: 1,
    titulo: 'La Visión Estratégica',
    subtitulo: 'Product Owner & Product Vision Board',
    narrativa:
      'El Product Owner define la brújula estratégica del producto utilizando el Product Vision Board. Responde quién es el público objetivo, qué necesidades críticas insatisfechas se resolverán y cómo la propuesta de valor apoya los objetivos del negocio.',
    idsNodosNuevos: ['role-product-owner', 'artifact-vision-board'],
    idsDestacados: ['role-product-owner', 'artifact-vision-board']
  },
  {
    id: 1,
    pasoNumero: 2,
    titulo: 'Product Goal y Product Backlog',
    subtitulo: 'La Única Fuente de Trabajo',
    narrativa:
      'Formaliza el Product Goal a largo plazo y desglosa la visión en un Product Backlog transparente y dinámico. Ordena continuamente los elementos según valor, urgencia y dependencias para asegurar el mayor retorno de inversión.',
    idsNodosNuevos: ['artifact-product-backlog'],
    idsDestacados: ['role-product-owner', 'artifact-product-backlog']
  },
  {
    id: 2,
    pasoNumero: 3,
    titulo: 'Alineación en Sprint Planning',
    subtitulo: 'El Foco de Valor para el Sprint',
    narrativa:
      'Al comenzar el Sprint, el Product Owner presenta el objetivo de negocio prioritario en el Sprint Planning. Colabora activamente con los Developers para seleccionar los elementos del backlog que harán posible un Sprint Goal viable y motivador.',
    idsNodosNuevos: ['event-sprint-planning'],
    idsDestacados: ['role-product-owner', 'event-sprint-planning']
  },
  {
    id: 3,
    pasoNumero: 4,
    titulo: 'Clarificación y Soporte Continuo',
    subtitulo: 'Colaboración Directa con Developers',
    narrativa:
      'Durante todo el ciclo del Sprint, el Product Owner acompaña a los Developers. Está disponible para resolver dudas de negocio, precisar criterios de aceptación y renegociar el alcance táctico si emergen complejidades imprevistas.',
    idsNodosNuevos: ['role-developers', 'artifact-sprint-backlog'],
    idsDestacados: ['role-product-owner', 'role-developers', 'artifact-sprint-backlog']
  },
  {
    id: 4,
    pasoNumero: 5,
    titulo: 'Inspección de Valor con Stakeholders',
    subtitulo: 'La Sprint Review',
    narrativa:
      'En la Sprint Review, el Product Owner reúne a los clientes y partes interesadas para inspeccionar el Incremento completado. Recoge retroalimentación de primera mano y adapta el Product Backlog para guiar las decisiones de los futuros Sprints.',
    idsNodosNuevos: ['event-sprint-review', 'artifact-increment'],
    idsDestacados: ['role-product-owner', 'event-sprint-review', 'artifact-increment']
  }
];
