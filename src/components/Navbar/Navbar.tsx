import clsx from 'clsx';
import { useState } from 'react';
import { InfoIcon, ResetIcon, VolumeIcon, VolumeOffIcon } from '../../icons';
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
  shuffle: VoidFunction;
  isMuted: boolean;
  toggleMute: VoidFunction;
}

export const Navbar = ({
  solve,
  isSolving,
  isSolved,
  reset,
  hasColorsChanged,
  isRubikInvalid,
  shuffle,
  isMuted,
  toggleMute,
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
          <Button circle square type="button" title="Info">
            <InfoIcon width={24} height={24} />
          </Button>
          <Button
            circle
            square
            type="button"
            title="Volume"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeOffIcon width={24} height={24} />
            ) : (
              <VolumeIcon width={24} height={24} />
            )}
          </Button>
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

        <div className={classes.row}>
          <Button
            type="button"
            title="Shuffle Rubik"
            disabled={isSolving}
            onClick={shuffle}
          >
            SHUFFLE
          </Button>
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
    </div>
  );
};
