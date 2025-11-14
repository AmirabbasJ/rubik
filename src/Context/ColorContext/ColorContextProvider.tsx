import React, { useMemo, useState } from 'react';
import type { Side } from '../../domain/CubePiece';
import { ColoringContext } from './ColorContext';

export type ColoringContextType = {
  selectedSide: string | null;
  setSelectedSide: (c: string) => void;
  sideToColorMap: Record<Side, string>;
};

export function ColoringProvider({ children }: { children: React.ReactNode }) {
  const [selectedSide, setSelectedSide] = useState<string | null>(null);
  // TODO allow setting
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sideToColorMap, setSideToColorMap] = useState<Record<Side, string>>({
    L: '#EF476F',
    B: '#F78C6B',
    U: '#FFD166',
    R: '#06D6A0',
    D: '#118AB2',
    F: '#FFFFFF',
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
