import React, { useMemo, useRef, type RefObject } from 'react';
import type { Side } from '../../domain/CubePiece';
import { ColoringContext } from './ColorContext';

export type ColoringContextType = {
  selectedSideRef: RefObject<Side | null>;
  sideToColorMapRef: RefObject<Record<Side, string>>;
};

export function ColoringProvider({ children }: { children: React.ReactNode }) {
  const selectedSideRef = useRef<Side | null>(null);

  // TODO allow setting
  const sideToColorMapRef = useRef<Record<Side, string>>({
    L: '#CC0100',
    B: '#EE6700',
    U: '#FFFFFF',
    R: '#009922',
    D: '#FFCC01',
    F: '#2255DD',
    '-': '#000000',
  });

  const value = useMemo(
    () => ({
      selectedSideRef: selectedSideRef,
      sideToColorMapRef: sideToColorMapRef,
    }),
    []
  );

  return (
    <ColoringContext.Provider value={value}>
      {children}
    </ColoringContext.Provider>
  );
}
