import React, { useMemo, useRef, type RefObject } from 'react';
import type { Side } from '../../domain/RubikPiece';
import { ColoringContext } from './ColorContext';

export type ColoringContextType = {
  selectedSideRef: RefObject<Side | null>;
  sideToColorMapRef: RefObject<Record<Side, string>>;
};

export function ColoringProvider({ children }: { children: React.ReactNode }) {
  const selectedSideRef = useRef<Side | null>(null);

  // TODO allow setting
  const sideToColorMapRef = useRef<Record<Side, string>>({
    L: '#009922',
    B: '#EE6700',
    U: '#2255DD',
    R: '#CC0100',
    D: '#FFCC01',
    F: '#FFFFFF',
    '-': '#000000',
  });

  const value = useMemo(
    () => ({
      selectedSideRef,
      sideToColorMapRef,
    }),
    []
  );

  return (
    <ColoringContext.Provider value={value}>
      {children}
    </ColoringContext.Provider>
  );
}
