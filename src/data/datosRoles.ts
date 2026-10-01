/**
 * Definición de los Roles oficiales de Scrum (Personas).
 * Carril Superior: y = 60
 */

import type { NodoScrum } from '../types/scrum';

export const nodosRoles: NodoScrum[] = [
  {
    id: 'role-product-owner',
    type: 'roleNode',
    position: { x: 107, y: -53 },
    data: {
      id: 'role-product-owner',
      label: 'Product Owner',
      category: 'role',
      summary: 'Responsable de maximizar el valor del producto y optimizar la gestión del Product Backlog.',
      akas: ['PO', 'Dueño del Producto', 'Responsable del Producto'],
      details: {
        responsibilities: [
          'Desarrollar y comunicar explícitamente el Product Goal (Objetivo del Producto).',
          'Crear y ordenar de forma transparente los elementos del Product Backlog.',
          'Garantizar que el Product Backlog sea visible, claro y entendido por todos los interesados.',
          'Tomar decisiones finales sobre el alcance del producto y representar la voz de los clientes.'
        ],
        theoreticalBasis:
          'Para que los Product Owners tengan éxito, toda la organización debe respetar sus decisiones. Estas decisiones se reflejan en el contenido y la priorización del Product Backlog.'
      }
    }
  },
  {
    id: 'role-developers',
    type: 'roleNode',
    position: { x: 631, y: -53 },
    data: {
      id: 'role-developers',
      label: 'Developers',
      category: 'role',
      summary: 'Profesionales multidisciplinarios comprometidos con crear cualquier aspecto de un incremento utilizable en cada Sprint.',
      akas: ['Dev Team', 'Equipo de Desarrollo', 'Desarrolladores'],
      details: {
        responsibilities: [
          'Crear un plan para el Sprint (el Sprint Backlog).',
          'Infundir calidad adhiriéndose estrictamente a la Definition of Done.',
          'Adaptar diariamente su plan hacia el Sprint Goal durante la Daily Scrum.',
          'Responsabilizarse mutuamente como profesionales de ingeniería sin jerarquías internas.'
        ],
        theoreticalBasis:
          'Las habilidades específicas que necesitan los Developers suelen ser amplias y varían con el ámbito del trabajo. Siempre son responsables directos de la calidad y de la estimación del esfuerzo técnico.'
      }
    }
  },
  {
    id: 'role-scrum-master',
    type: 'roleNode',
    position: { x: 1210, y: -53 },
    data: {
      id: 'role-scrum-master',
      label: 'Scrum Master',
      category: 'role',
      summary: 'Líder servicial y facilitador responsable de instaurar Scrum y promover la efectividad del Scrum Team.',
      akas: ['SM', 'Facilitador Ágil', 'Líder Servidor (Servant Leader)'],
      details: {
        responsibilities: [
          'Guiar a los miembros del equipo en autogestión y multidisciplinariedad.',
          'Ayudar a enfocarse en la creación de incrementos de alto valor que cumplan la Definition of Done.',
          'Procurar la eliminación de impedimentos que frenen el progreso del Scrum Team.',
          'Facilitar los eventos de Scrum según se requiera o solicite, asegurando que sean positivos y productivos.'
        ],
        theoreticalBasis:
          'El Scrum Master sirve al Scrum Team, al Product Owner y a toda la organización, liderando la adopción ágil, el empirismo y la mejora continua.'
      }
    }
  }
];
