/**
 * Representa una entrada individual en el historial de cambios del repositorio.
 */
export interface EntradaHistorial {
  hash: string;
  mensaje: string;
  autor: string;
  fecha: string;
  tipo?: 'feat' | 'fix' | 'breaking' | 'otro';
}
