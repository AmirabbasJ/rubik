import type { CSSProperties } from 'react';
import classes from './Palette.module.css';

import { useColor } from '../../Context/ColorContext';

export const sideToColorMapPalette: Record<string, string> = {
  L: '#EF476F',
  B: '#F78C6B',
  U: '#FFD166',
  R: '#06D6A0',
  D: '#118AB2',
  F: '#FFFFFF',
  '-': '#000000',
};

export const Palette = () => {
  const ctx = useColor();

  const selected = ctx?.color;

  return (
    <div className={classes.palette} role="toolbar" aria-orientation="vertical">
      {Object.entries(sideToColorMapPalette)
        .toSorted(([sA, colorA], [sB, colorB]) => colorA.localeCompare(colorB))
        .filter(([side]) => side !== '-')
        .map(([side, color]) => {
          const isSelected = selected === side;

          const style: CSSProperties = { background: color };
          return (
            <button
              key={side}
              className={`${classes.colorButton} ${
                isSelected ? classes.selected : ''
              }`}
              title={`${side} — ${color}`}
              aria-label={`Select color ${side}`}
              onClick={() => {
                if (ctx?.setColor) {
                  ctx.setColor(side);
                } else {
                  console.warn('Palette: setColor not found in ColorContext');
                }
              }}
              style={style}
              type="button"
            />
          );
        })}
    </div>
  );
};
