import { execFileSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rutaDestino = resolve(__dirname, '../public/historial-cambios.json');

/**
 * Determina el tipo de commit a partir de su prefijo semántico.
 */
function clasificarTipo(mensaje) {
  const m = mensaje.toLowerCase().trim();
  if (m.startsWith('feat:') || m.includes('🚀')) return 'feat';
  if (m.startsWith('fix:') || m.includes('🔧')) return 'fix';
  if (m.startsWith('breaking:')) return 'breaking';
  return 'otro';
}

try {
  const salida = execFileSync('git', ['log', '--pretty=format:%h|%s|%an|%ad', '--date=short'], {
    encoding: 'utf-8'
  });

  const entradas = salida
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((linea) => {
      const [hash, mensaje, autor, fecha] = linea.split('|');
      return {
        hash,
        mensaje,
        autor,
        fecha,
        tipo: clasificarTipo(mensaje)
      };
    });

  mkdirSync(dirname(rutaDestino), { recursive: true });
  writeFileSync(rutaDestino, JSON.stringify(entradas), 'utf-8');
  console.log(`✅ [Historial] Se generó public/historial-cambios.json con ${entradas.length} commits.`);
} catch (error) {
  console.warn(`⚠️ [Historial] No se pudo leer git log (${error.message}). Se conserva archivo existente.`);
}
