import React, { useMemo, useState } from 'react';
import type { Side } from '../../domain/CubePiece';
import { ColoringContext } from './ColorContext';

export type ColoringContextType = {
  selectedSide: Side | null;
  setSelectedSide: (c: Side | null) => void;
  sideToColorMap: Record<Side, string>;
};

export function ColoringProvider({ children }: { children: React.ReactNode }) {
  const [selectedSide, setSelectedSide] = useState<Side | null>(null);
  // TODO allow setting
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sideToColorMap, setSideToColorMap] = useState<Record<Side, string>>({
    L: '#CC0100',
    B: '#EE6700',
    U: '#FFFFFF',
    R: '#009922',
    D: '#FFCC01',
    F: '#2255DD',
    '-': '#000000',
  });

  const value = useMemo(
    () => ({ selectedSide, setSelectedSide, sideToColorMap }),
    [selectedSide, sideToColorMap]
  );
  return (
    <ColoringContext.Provider value={value}>
      {children}
    </ColoringContext.Provider>
  );
}
