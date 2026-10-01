import { execFileSync } from 'child_process';
import { appendFileSync } from 'fs';

/**
 * Script de versionado semántico para GitHub Actions.
 * Analiza los commits para determinar el bump de versión (major, minor, patch)
 * sin realizar commits a la rama master, evitando conflictos con git push locales.
 */
function ejecutarGit(args) {
  try {
    return execFileSync('git', args, { encoding: 'utf-8' }).trim();
  } catch {
    return '';
  }
}

// 1. Obtener última etiqueta o usar base 0.1.0
let ultimoTag = ejecutarGit(['describe', '--tags', '--abbrev=0']);
let versionBase = '0.1.0';

if (ultimoTag && /^v?\d+\.\d+\.\d+$/.test(ultimoTag)) {
  versionBase = ultimoTag.replace(/^v/, '');
}

const [majorStr, minorStr, patchStr] = versionBase.split('.');
let major = parseInt(majorStr, 10) || 0;
let minor = parseInt(minorStr, 10) || 1;
let patch = parseInt(patchStr, 10) || 0;

// 2. Obtener lista de commits desde la última etiqueta
const rangoCommits = ultimoTag ? `${ultimoTag}..HEAD` : 'HEAD';
const commitsStr = ejecutarGit(['log', rangoCommits, '--pretty=format:%s']);
const lineasCommits = commitsStr.split('\n').filter(Boolean);

let tipoBump = 'patch';

for (const msg of lineasCommits) {
  const m = msg.trim().toLowerCase();
  if (m.startsWith('breaking:')) {
    tipoBump = 'major';
    break;
  }
  if (m.startsWith('feat:') || m.includes('🚀')) {
    tipoBump = 'minor';
  }
}

if (tipoBump === 'major') {
  major += 1;
  minor = 0;
  patch = 0;
} else if (tipoBump === 'minor') {
  minor += 1;
  patch = 0;
} else {
  patch += 1;
}

const siguienteVersion = `v${major}.${minor}.${patch}`;
console.log(`📌 Última versión: ${ultimoTag || 'Ninguna'}`);
console.log(`🚀 Siguiente versión calculada: ${siguienteVersion} (Tipo: ${tipoBump})`);

// Exportar a GITHUB_OUTPUT si se ejecuta en GitHub Actions
const archivoOutput = process.env.GITHUB_OUTPUT;
if (archivoOutput) {
  appendFileSync(archivoOutput, `version=${siguienteVersion}\n`);
  appendFileSync(archivoOutput, `bump=${tipoBump}\n`);
}
