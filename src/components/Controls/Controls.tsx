import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { Move } from '../../domain/Moves';
import { ChevronRightIcon } from '../../icons';
import { Button } from '../../ui';
import classes from './Controls.module.css';

interface Props {
  move: (m: Move[]) => void;
  disabled?: boolean;
  solution?: string | null;
  solutionIndex: number | null;
  gotoSolutionMove: (index: number) => void;
}

const keyToMoveSideMap = {
  d: 'R',
  w: 'U',
  s: 'F',
  a: 'L',
  q: 'D',
  e: 'B',
} as const;

export function Controls({
  move,
  disabled = false,
  solution,
  solutionIndex,
  gotoSolutionMove,
}: Props) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return;
      const key = event.key.toLowerCase();
      if (!(key in keyToMoveSideMap)) return;

      const moveSide = keyToMoveSideMap[key as keyof typeof keyToMoveSideMap];
      const moveName = event.shiftKey ? (`${moveSide}'` as const) : moveSide;
      move([moveName]);
    },
    [disabled, move]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [disabled, handleKeyDown]);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        {Object.values(Move).map((moveName) => (
          <Button
            square
            disabled={disabled}
            key={moveName}
            onClick={() => {
              move([moveName]);
            }}
          >
            {moveName}
          </Button>
        ))}
      </div>
      {solution ? (
        <div
          className={clsx(classes.solutionViewer, {
            [classes.active]: solution !== null,
          })}
        >
          {solution.split(' ').map((move, index, arr) => (
            <div
              className={clsx(classes.solutionMove, {
                [classes.active]: solutionIndex === index,
              })}
              key={index}
            >
              <button
                onClick={() => {
                  // setSolutionIndex(index);
                  gotoSolutionMove(index);
                }}
              >
                {move}
              </button>
              {arr.length === index + 1 ? null : (
                <ChevronRightIcon color="inherit" />
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
