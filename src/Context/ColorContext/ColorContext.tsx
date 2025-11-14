import { createContext } from 'react';
import type { ColorContextType } from './ColorContextProvider';

export const ColorContext = createContext<ColorContextType | undefined>(
  undefined
);
