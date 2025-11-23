import { useContext } from 'react';
import { ColoringContext } from './ColorContext';
import type { ColoringContextType } from './ColorContextProvider';

export function useColoring(): ColoringContextType {
  const ctx = useContext(ColoringContext);
  if (!ctx) {
    throw new Error('useColor must be used within a ColoringProvider');
  }
  return ctx;
}
