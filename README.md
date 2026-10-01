# 🔄 Plataforma Interactiva del Flujo Metodológico Scrum

[![Version](https://img.shields.io/badge/Versi%C3%B3n-0.2.0-indigo.svg)](https://github.com/JorgeTrip/2026-Scrum)
[![Guía Scrum](https://img.shields.io/badge/Est%C3%A1ndar-Gu%C3%ADa%20Oficial%202020-blue.svg)](https://scrumguides.org/)
[![Pruebas](https://img.shields.io/badge/Vitest-37%2F37%20Pasadas-emerald.svg)](https://vitest.dev/)
[![Auditoría](https://img.shields.io/badge/SAST%20Audit-100%25%20Aprobado-success.svg)](#)
[![Institución](https://img.shields.io/badge/UTN%20FRBA-Fines%20Educativos-amber.svg)](https://www.frba.utn.edu.ar/)

Plataforma web de ingeniería pedagógica para la enseñanza interactiva y navegación tridimensional del marco de trabajo **Scrum**, fundamentada estrictamente en la **Guía Oficial de Scrum 2020** de Ken Schwaber y Jeff Sutherland.

---

## 🧭 Fundamentación Metodológica (Guía 2020)

El sistema refleja de forma fidedigna las actualizaciones de la última versión oficial:
1. **Compromisos de Artefactos:** 
   - **Product Goal:** Brújula estratégica a largo plazo que nutre al *Product Backlog*.
   - **Sprint Goal:** Compromiso del *Sprint Backlog* para enfocar el esfuerzo en cada Sprint.
   - **Definition of Done (DoD):** Estándar de calidad formal para que cada *Increment* sea utilizable.
2. **Un Solo Scrum Team:** Eliminación de jerarquías y del antiguo "Development Team", unificando a los profesionales bajo el rol de **Developers**.
3. **Prólogo Estratégico:** Integración del **Product Vision Board** (Roman Pichler) como antesala estratégica que alimenta el Product Goal.

---

## 📐 Estructura Tridimensional (Swimlanes)

El lienzo divide verticalmente el flujo en tres secciones de idéntica altura:
- 🟡 **Personas (Roles):** Product Owner, Developers y Scrum Master.
- 🟣 **Eventos del Ciclo (Ceremonias):** Sprint, Sprint Planning, Daily Scrum, Sprint Review y Retrospective.
- 🟢 **Documentos (Artefactos y Compromisos):** Product Vision Board, Product Backlog, Sprint Backlog e Incremento.

> **Títulos Inmutables:** Los encabezados de cada carril permanecen **100% fijos en posición y tamaño** en el margen izquierdo del viewport, inmunes al zoom y paneo del usuario.

---

## ✨ Características Principales

- **Modo Historia Guiado:** Recorrido cronológico interactivo de 10 pasos con revelación progresiva de elementos y explicaciones detalladas.
- **Modo Mapa Libre:** Exploración abierta con zoom, encuadre (*fit view*), mini-mapa reactivo y controles ergonómicos.
- **Relaciones Elásticas e Inteligentes:** Conexiones directas, bucles de retroalimentación empírica punteados y flujo de valor animado con etiquetas reposicionables.
- **Tooltips Enriquecidos con Aislamiento de Scroll:** Despliegan responsabilidades, alias (AKAs) y fundamentos teóricos sin interferir con la navegación del lienzo.
- **Persistencia de Posiciones:** Guardado automático en `localStorage` de las coordenadas personalizadas de nodos y etiquetas arrastrados por el usuario.
- **Modal "Acerca de":** Justificación teórica del estándar 2020, autoría institucional y copyright.
- **Historial de Cambios (Changelog):** Visor con filtrado semántico (`feat`, `fix`, `breaking`) y enlaces directos a los commits del repositorio.

---

## 🛠️ Stack Tecnológico

- **Frontend Core:** React 19, TypeScript estricto, Vite 6.
- **Diseño & UI:** Tailwind CSS v4 con paleta profesional Grises Pro (`bg-[#1C1C1E]`), efectos glassmorphism y diseño responsive estilo Apple.
- **Motor de Grafos:** `@xyflow/react` (React Flow 12).
- **Iconografía:** Lucide React.
- **Testing & Calidad:** Vitest (37 tests unitarios automatizados).
- **Gobernanza de Código:** Estricto cumplimiento de la **Regla de Hierro** (máximo 200 líneas por archivo), SAST sin vulnerabilidades y límites de arquitectura desacoplados.

---

## 🚀 Pipeline de CI/CD Libre de Conflictos

El proyecto implementa un flujo de integración y entrega continua en GitHub Actions (`.github/workflows/ci-cd.yml`) diseñado para **garantizar CERO conflictos al hacer `git push`**:
- **Versionado Semántico por Etiquetas:** El script determina el incremento de versión analizando prefijos (`feat:`, `fix:`, `BREAKING:`) y crea **Git Tags y Releases inmutables** sin realizar commits sobre la rama `master`.
- **Changelog Estático:** Se genera automáticamente `public/historial-cambios.json` durante el build.
- **Continuous Deployment:** Despliegue automatizado en GitHub Pages tras validar pruebas y build.

---

## 💻 Instalación y Uso Local

### Prerrequisitos
- Node.js versión 20 o superior.
- Git instalado.

### Pasos de Instalación
```bash
# 1. Clonar el repositorio
git clone https://github.com/JorgeTrip/2026-Scrum.git
cd 2026-Scrum

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo local (http://localhost:3000)
npm run dev

# Alternativa rápida en Windows: doble clic en iniciarApp.bat
```

### Comandos de Calidad y Construcción
```bash
npm test         # Ejecuta la suite de 37 pruebas unitarias con Vitest
npm run build    # Compila TypeScript y empaqueta la versión de producción
npm run preview  # Previsualiza la compilación localmente
```

---

## 👥 Autoría y Derechos

- **Autor:** **Jorge O. Tripodi**
- **Institución:** Universidad Tecnológica Nacional – Facultad Regional Buenos Aires (**UTN FRBA**)
- **Finalidad:** Proyecto desarrollado exclusivamente con fines formativos, pedagógicos y de divulgación académica.
- **Copyright:** © 2026 Jorge O. Tripodi. Todos los derechos reservados.
