import { useContext } from 'react';
import { ColorContext } from './ColorContext';
import type { ColorContextType } from './ColorContextProvider';

export function useColor(): ColorContextType {
  const ctx = useContext(ColorContext);
  if (!ctx) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return ctx;
}
