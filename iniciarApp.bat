@echo off
chcp 65001 > nul
cls

echo ========================================================
echo   🚀 Iniciando Flujo Metodológico Scrum (React + Vite)
echo ========================================================
echo.

if not exist node_modules (
  echo [1/2] Dependencias no encontradas. Instalando...
  call npm install
  if %errorlevel% neq 0 (
    echo.
    echo ❌ Error al instalar dependencias.
    pause
    exit /b %errorlevel%
  )
) else (
  echo [1/2] Dependencias verificadas correctamente.
)

echo [2/2] Iniciando servidor de desarrollo en http://localhost:3000 ...
echo.
echo Presione Ctrl+C en esta ventana para detener el servidor.
echo ========================================================
echo.

start "" http://localhost:3000
call npm run dev

pause
