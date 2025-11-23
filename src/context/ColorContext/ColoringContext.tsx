import type { Side } from '@/domain';
import { createContext, type RefObject } from 'react';

export type ColoringContext = {
  selectedSideRef: RefObject<Side | null>;
  sideToColorMapRef: RefObject<Record<Side, string>>;
};

export const ColoringContext = createContext<ColoringContext | null>(null);
