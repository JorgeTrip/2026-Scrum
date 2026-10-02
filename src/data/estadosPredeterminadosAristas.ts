import type { EstadoEtiquetaArista } from '../utils/persistenciaPosiciones';

/**
 * Estados predeterminados de posición y desvío para etiquetas de aristas.
 * Extraídos directamente de las ubicaciones personalizadas por el usuario.
 */
export const estadosPredeterminadosAristas: Record<string, EstadoEtiquetaArista> = {
  'edge-po-to-vision': { t: 0.538, desvio: -19 },
  'edge-sprint-to-planning': { t: 0.413, desvio: 4 },
  'edge-planning-to-sb': { t: 0.45, desvio: -3 },
  'edge-retro-to-next-cycle': { t: 0.138, desvio: 224 },
  'edge-planning-to-daily': { t: 0.488, desvio: 0 },
  'edge-devs-to-sb': { t: 0.438, desvio: -113 },
  'edge-sm-to-po': { t: 0.588, desvio: -78 },
  'edge-po-to-pb': { t: 0.775, desvio: 129 },
  'edge-devs-to-daily': { t: 0.613, desvio: -1 },
  'edge-sm-to-sprint': { t: 0.838, desvio: 3 },
  'edge-sm-to-increment': { t: 0.688, desvio: 154 },
  'edge-po-to-planning': { t: 0.3, desvio: -21 },
  'edge-po-to-review': { t: 0.8, desvio: -1 },
  'edge-increment-to-review': { t: 0.875, desvio: -146 },
  'edge-sm-to-devs': { t: 0.5, desvio: 0 },
  'edge-po-to-devs': { t: 0.5, desvio: 0 },
  'edge-vision-to-im': { t: 0.5, desvio: 0 },
  'edge-im-to-usm': { t: 0.5, desvio: 0 },
  'edge-usm-to-pb': { t: 0.5, desvio: 0 }
};
