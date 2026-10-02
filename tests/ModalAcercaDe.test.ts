import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ModalAcercaDe } from '../src/components/ModalAcercaDe';

describe('Componente ModalAcercaDe', () => {
  it('no renderiza nada cuando abierto es false', () => {
    const html = renderToStaticMarkup(
      React.createElement(ModalAcercaDe, { abierto: false, alCerrar: () => {} })
    );
    expect(html).toBe('');
  });

  it('renderiza la autoría, copyright y aclaración de la Guía 2020 cuando abierto es true', () => {
    const html = renderToStaticMarkup(
      React.createElement(ModalAcercaDe, { abierto: true, alCerrar: () => {} })
    );
    expect(html).toContain('Jorge O. Tripodi');
    expect(html).toContain('Analista Desarrollador Universitario de Sistemas');
    expect(html).toContain('UTN FRBA');
    expect(html).toContain('Guía Oficial de Scrum 2020');
    expect(html).toContain('Product Goal');
    expect(html).toContain('Developers');
    expect(html).toContain('Todos los derechos reservados');
  });
});
