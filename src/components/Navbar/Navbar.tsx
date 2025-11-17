import clsx from 'clsx';
import { useState } from 'react';
import { ResetIcon } from '../../icons';
import { Button } from '../../ui';
import FuzzyText from '../../ui/FuzzyText/FuzzyText';
import { Palette } from '../Palette/Palette';
import type { PieceMesh } from '../Rubik/RubikPiece';
import classes from './Navbar.module.css';

interface Props {
  solve: () => void;
  isSolving: boolean;
  isSolved: boolean;
  getPieceMeshes: () => PieceMesh[][];
  hasColorsChanged: boolean;
  reset: VoidFunction;
  isRubikInvalid: boolean;
}

export const Navbar = ({
  solve,
  isSolving,
  isSolved,
  reset,
  hasColorsChanged,
  isRubikInvalid,
}: Props) => {
  const [isAnimatingReset, setIsAnimatingReset] = useState(false);

  function handleResetClick() {
    if (isSolving || !hasColorsChanged) return;
    setIsAnimatingReset(true);
    reset();
    if (isAnimatingReset) return;
    setTimeout(() => {
      setIsAnimatingReset(false);
    }, 1000);
  }

  return (
    <div className={classes.container}>
      <div className={classes.navbar}>
        <div className={classes.row}>
          <Palette isDisabled={isSolving} />
          <Button
            circle
            square
            type="button"
            title="Reset colors"
            className={clsx({
              [classes.reset]: isAnimatingReset,
            })}
            disabled={isSolving || !hasColorsChanged}
            onClick={handleResetClick}
          >
            <ResetIcon />
          </Button>
        </div>
        <Button
          title={
            isRubikInvalid
              ? 'Invalid Rubik'
              : isSolved
              ? 'Rubik is already solved!'
              : isSolving
              ? 'Solving...'
              : 'Solve Rubik'
          }
          onClick={solve}
          disabled={isSolving || isSolved || isRubikInvalid}
        >
          {isRubikInvalid ? (
            <FuzzyText color="#ffffff66" fontSize="1.1rem">
              SOLVE
            </FuzzyText>
          ) : (
            <p>SOLVE</p>
          )}
        </Button>
      </div>
    </div>
  );
};
