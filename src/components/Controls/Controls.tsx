import { keyToMoveSideMap, Move } from '@/domain';
import { ChevronRightIcon, CircleIcon } from '@/icons';
import { Button } from '@/ui';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import classes from './Controls.module.css';

interface Props {
  move: (m: Move[]) => void;
  isMoving: boolean;
  isSolving: boolean;
  solution?: string | null;
  solutionIndex: number | null;
  gotoSolutionMove: (index: number) => void;
}

export function Controls({
  move,
  isMoving,
  isSolving,
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
            disabled={isSolving}
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
        {solution ? (
          <>
            {solution.split(' ').map((move, index) => (
              <button
                onClick={() => {
                  if (!isMoving && !isSolving) gotoSolutionMove(index);
                }}
                className={clsx(classes.solutionMove, {
                  [classes.active]: solutionIndex === index,
                })}
                disabled={isMoving || isSolving}
                key={index}
              >
                {index === 0 ? null : <ChevronRightIcon color="inherit" />}
                <div className={classes.solutionMoveKey}>
                  {move === '-' ? <CircleIcon /> : move}
                </div>
              </button>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}
