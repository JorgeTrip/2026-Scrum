import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ReactFlowProvider } from '@xyflow/react';
import { ControlZoomPreciso } from '../src/components/ControlZoomPreciso';

describe('Componente ControlZoomPreciso', () => {
  it('renderiza los botones de zoom fino y encuadre', () => {
    const html = renderToStaticMarkup(
      React.createElement(
        ReactFlowProvider,
        null,
        React.createElement(ControlZoomPreciso)
      )
    );

    expect(html).toContain('Acercar (paso fino)');
    expect(html).toContain('Alejar (paso fino)');
    expect(html).toContain('Encuadrar todo el mapa');
  });
});
