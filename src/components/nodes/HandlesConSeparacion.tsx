import React from 'react';
import { Handle, Position } from '@xyflow/react';

/**
 * Puntos de anclaje (Handles) distribuidos simétricamente a lo largo de los bordes.
 * Permite que múltiples conexiones no se solapen en el mismo punto exacto.
 */
export const HandlesConSeparacion: React.FC = () => {
  const claseHandle = '!opacity-0 !pointer-events-none !w-2 !h-2 !border-0';

  return (
    <>
      {/* Handles Superiores (Top) */}
      <Handle type="target" position={Position.Top} id="top-left" style={{ left: '25%' }} className={claseHandle} />
      <Handle type="target" position={Position.Top} id="top-center" style={{ left: '50%' }} className={claseHandle} />
      <Handle type="target" position={Position.Top} id="top-right" style={{ left: '75%' }} className={claseHandle} />
      <Handle type="source" position={Position.Top} id="top-center-source" style={{ left: '50%' }} className={claseHandle} />

      {/* Handles Inferiores (Bottom) */}
      <Handle type="source" position={Position.Bottom} id="bottom-left" style={{ left: '25%' }} className={claseHandle} />
      <Handle type="source" position={Position.Bottom} id="bottom-center" style={{ left: '50%' }} className={claseHandle} />
      <Handle type="source" position={Position.Bottom} id="bottom-right" style={{ left: '75%' }} className={claseHandle} />
      <Handle type="target" position={Position.Bottom} id="bottom-right-target" style={{ left: '75%' }} className={claseHandle} />

      {/* Handles Izquierdos (Left) */}
      <Handle type="target" position={Position.Left} id="left-top" style={{ top: '35%' }} className={claseHandle} />
      <Handle type="target" position={Position.Left} id="left-center" style={{ top: '50%' }} className={claseHandle} />
      <Handle type="target" position={Position.Left} id="left-bottom" style={{ top: '65%' }} className={claseHandle} />
      <Handle type="source" position={Position.Left} id="left-center-source" style={{ top: '50%' }} className={claseHandle} />

      {/* Handles Derechos (Right) */}
      <Handle type="source" position={Position.Right} id="right-top" style={{ top: '35%' }} className={claseHandle} />
      <Handle type="source" position={Position.Right} id="right-center" style={{ top: '50%' }} className={claseHandle} />
      <Handle type="source" position={Position.Right} id="right-bottom" style={{ top: '65%' }} className={claseHandle} />
      <Handle type="target" position={Position.Right} id="right-center-target" style={{ top: '50%' }} className={claseHandle} />
    </>
  );
};
