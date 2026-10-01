/**
 * Versión semántica actual de la aplicación.
 * Sincronizada automáticamente con el flujo de CI/CD y el historial de cambios.
 */
export const VERSION_APP = '0.2.0';

/**
 * Retorna la versión dinámica formateada para visualización en la interfaz.
 */
export function obtenerVersionApp(versionDesdeHistorial?: string): string {
  if (versionDesdeHistorial && /^\d+\.\d+\.\d+$/.test(versionDesdeHistorial)) {
    return versionDesdeHistorial;
  }
  return VERSION_APP;
}
