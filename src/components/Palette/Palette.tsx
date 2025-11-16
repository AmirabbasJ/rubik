import classes from './Palette.module.css';

import { useState } from 'react';
import { useColoring } from '../../Context/ColorContext';
import type { Side } from '../../domain/RubikPiece';

interface Props {
  isDisabled?: boolean;
}

export const Palette = ({ isDisabled = false }: Props) => {
  const { selectedSideRef, sideToColorMapRef } = useColoring();
  const [selected, setLocalSelected] = useState<Side | null>(
    selectedSideRef.current
  );

  const setSelected = (side: Side | null) => {
    selectedSideRef.current = side as Side;
    setLocalSelected(side);
  };

  return (
    <div className={classes.palette} role="toolbar" aria-orientation="vertical">
      {Object.entries(sideToColorMapRef.current)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .toSorted(([_, colorA], [__, colorB]) => colorA.localeCompare(colorB))
        .filter(([side]) => side !== '-')
        .map(([side, color]) => {
          const isSelected = selected === side;
          return (
            <button
              key={side}
              className={`${isSelected ? classes.selected : ''} ${
                classes.colorButton
              }`}
              title={color}
              aria-label={`Select color ${color}`}
              onClick={() => {
                if (isDisabled) return;
                setSelected(side as Side);
              }}
              style={{ background: color }}
              type="button"
              disabled={isDisabled}
            />
          );
        })}
    </div>
  );
};
