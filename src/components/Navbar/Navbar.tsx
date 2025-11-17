import clsx from 'clsx';
import { useState } from 'react';
import { useColoring } from '../../Context/ColorContext';
import { initialRubik } from '../../data/initialRubik';
import type { Side } from '../../domain/RubikPiece';
import { ResetIcon } from '../../icons';
import { Button } from '../../ui';
import { Palette } from '../Palette/Palette';
import type { PieceMesh } from '../Rubik/RubikPiece';
import classes from './Navbar.module.css';

interface Props {
  solve: () => void;
  isDisabled?: boolean;
  getPieceMeshes: () => PieceMesh[][];
  hasColorsChanged: boolean;
  setHasColorsChanged: (value: boolean) => void;
}

export const Navbar = ({
  solve,
  isDisabled = false,
  getPieceMeshes,
  hasColorsChanged,
  setHasColorsChanged,
}: Props) => {
  const { sideToColorMapRef } = useColoring();
  const [isAnimatingReset, setIsAnimatingReset] = useState(false);

  function reset() {
    const sideToColorMap = sideToColorMapRef.current;
    const meshes = getPieceMeshes();

    initialRubik
      .map(({ sides }) => sides)
      .map((sides, index) => {
        meshes[index].forEach((m, i) => {
          const name = sides[i];
          const side = name[0] as Side;
          m.material.name = name === '-' ? '' : name;
          m.material.color.setStyle(sideToColorMap[side]);
        });
      });
  }

  function handleResetClick() {
    if (isDisabled || !hasColorsChanged) return;
    setIsAnimatingReset(true);
    reset();
    if (isAnimatingReset) return;
    setTimeout(() => {
      setIsAnimatingReset(false);
      setHasColorsChanged(false);
    }, 1000);
  }

  return (
    <div className={classes.container}>
      <div className={classes.navbar}>
        <div className={classes.row}>
          <Palette isDisabled={isDisabled} />
          <Button
            circle
            square
            type="button"
            aria-label="Reset colors"
            className={clsx({
              [classes.reset]: isAnimatingReset,
            })}
            disabled={isDisabled || !hasColorsChanged}
            onClick={handleResetClick}
          >
            <ResetIcon />
          </Button>
        </div>
        <Button onClick={solve} disabled={isDisabled}>
          SOLVE
        </Button>
      </div>
    </div>
  );
};
