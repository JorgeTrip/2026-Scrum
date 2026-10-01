import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Footer } from '../src/components/Footer';

describe('Componente Footer', () => {
  it('renderiza la autoría de Jorge O. Tripodi y copyright', () => {
    const html = renderToStaticMarkup(React.createElement(Footer));
    expect(html).toContain('Jorge O. Tripodi');
    expect(html).toContain('Todos los derechos reservados');
  });

  it('indica que es para fines formativos y educativos en UTN FRBA', () => {
    const html = renderToStaticMarkup(React.createElement(Footer));
    expect(html).toContain('Fines formativos y educativos');
    expect(html).toContain('UTN FRBA');
  });
});
