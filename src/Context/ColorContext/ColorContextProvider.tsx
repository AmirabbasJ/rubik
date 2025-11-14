import React, { useMemo, useState } from 'react';
import { ColorContext } from './ColorContext';

export type ColorContextType = {
  color: string | null;
  setColor: (c: string) => void;
};

export function ColorProvider({
  children,
  initialColor = null,
}: {
  children: React.ReactNode;
  initialColor?: string | null;
}) {
  const [color, setColor] = useState<string | null>(initialColor);
  const value = useMemo(() => ({ color, setColor }), [color]);
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}
