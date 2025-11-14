import type { CSSProperties } from 'react';
import classes from './Palette.module.css';

import { useColoring } from '../../Context/ColorContext';

export const Palette = () => {
  const { selectedSide, setSelectedSide, sideToColorMap } = useColoring();

  return (
    <div className={classes.palette} role="toolbar" aria-orientation="vertical">
      {Object.entries(sideToColorMap)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .toSorted(([_, colorA], [__, colorB]) => colorA.localeCompare(colorB))
        .filter(([side]) => side !== '-')
        .map(([side, color]) => {
          const isSelected = selectedSide === side;

          const style: CSSProperties = { background: color };
          return (
            <button
              key={side}
              className={`${isSelected ? classes.selected : ''} ${
                classes.colorButton
              }`}
              title={color}
              aria-label={`Select color ${color}`}
              onClick={() => {
                setSelectedSide(side);
              }}
              style={style}
              type="button"
            />
          );
        })}
    </div>
  );
};
