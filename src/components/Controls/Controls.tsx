import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { keyToMoveSideMap } from '../../domain/keyToMoveSideMap';
import { Move } from '../../domain/Moves';
import { ChevronRightIcon } from '../../icons';
import { Button } from '../../ui';
import classes from './Controls.module.css';

interface Props {
  move: (m: Move[]) => void;
  isMoving: boolean;
  solution?: string | null;
  solutionIndex: number | null;
  gotoSolutionMove: (index: number) => void;
}

export function Controls({
  move,
  isMoving,
  solution,
  solutionIndex,
  gotoSolutionMove,
}: Props) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isMoving) return;
      const key = event.key.toLowerCase();
      if (!(key in keyToMoveSideMap)) return;

      const moveSide = keyToMoveSideMap[key as keyof typeof keyToMoveSideMap];
      const moveName = event.shiftKey ? (`${moveSide}'` as const) : moveSide;
      move([moveName]);
    },
    [isMoving, move]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMoving, handleKeyDown]);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        {Object.values(Move).map((moveName) => (
          <Button
            square
            disabled={isMoving}
            key={moveName}
            onClick={() => {
              move([moveName]);
            }}
          >
            {moveName}
          </Button>
        ))}
      </div>

      <div className={classes.solutionViewer}>
        {solution
          ? solution.split(' ').map((move, index, arr) => (
              <div
                className={clsx(classes.solutionMove, {
                  [classes.active]: solutionIndex === index,
                })}
                key={index}
              >
                <button
                  onClick={() => {
                    if (!isMoving) gotoSolutionMove(index);
                  }}
                  disabled={isMoving}
                >
                  {move}
                </button>
                {arr.length === index + 1 ? null : (
                  <ChevronRightIcon color="inherit" />
                )}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
