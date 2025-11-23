import { ColoringContext } from '@/context';
import { useContext } from 'react';

export function useColoring(): ColoringContext {
  const ctx = useContext(ColoringContext);
  if (!ctx) {
    throw new Error('useColor must be used within a ColoringProvider');
  }
  return ctx;
}
