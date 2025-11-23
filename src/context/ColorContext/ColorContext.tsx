import { createContext } from 'react';
import type { ColoringContextType } from './ColorContextProvider';

export const ColoringContext = createContext<ColoringContextType | undefined>(
  undefined
);
