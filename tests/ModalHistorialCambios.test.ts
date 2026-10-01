import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ModalHistorialCambios } from '../src/components/ModalHistorialCambios';

describe('Componente ModalHistorialCambios', () => {
  it('no renderiza nada cuando abierto es false', () => {
    const html = renderToStaticMarkup(
      React.createElement(ModalHistorialCambios, { abierto: false, alCerrar: () => {} })
    );
    expect(html).toBe('');
  });

  it('renderiza la bitácora de commits y enlaces a GitHub cuando abierto es true', () => {
    const html = renderToStaticMarkup(
      React.createElement(ModalHistorialCambios, { abierto: true, alCerrar: () => {} })
    );
    expect(html).toContain('Historial de Cambios');
    expect(html).toContain('Buscar en el historial');
    expect(html).toContain('github.com/JorgeTrip/2026-Scrum');
    expect(html).toContain('Jorge O. Tripodi');
  });
});
