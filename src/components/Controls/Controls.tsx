import { useEffect } from 'react';
import type { Axis } from '../../domain/Axis';
import type { Moves } from '../../domain/Moves';
import classes from './Controls.module.css';

interface Props {
  rotate: (axis: Axis, limit: number, multiplier: number) => void;
}

const keyToMoveMap = {
  d: 'R',
  w: 'U',
  s: 'F',
  a: 'L',
  q: 'D',
  e: 'B',
} as const;

export function Controls({ rotate }: Props) {
  useEffect(() => {}, []);

  const moveMap: Record<Moves, VoidFunction> = {
    U: () => rotate('y', 0.5, 1),
    D: () => rotate('y', -0.5, -1),
    R: () => rotate('x', 0.5, -1),
    L: () => rotate('x', -0.5, 1),
    F: () => rotate('z', 0.5, -1),
    B: () => rotate('z', -0.5, 1),
    "U'": () => rotate('y', 0.5, -1),
    "D'": () => rotate('y', -0.5, 1),
    "R'": () => rotate('x', 0.5, 1),
    "L'": () => rotate('x', -0.5, -1),
    "F'": () => rotate('z', 0.5, 1),
    "B'": () => rotate('z', -0.5, -1),
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (!(key in keyToMoveMap)) return;

    const move = keyToMoveMap[key as keyof typeof keyToMoveMap];
    const moveAction = event.shiftKey ? moveMap[`${move}'`] : moveMap[move];
    moveAction();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={classes.controls}>
      {Object.entries(moveMap).map(([key, action]) => (
        <button key={key} className={classes.button} onClick={action}>
          {key}
        </button>
      ))}
    </div>
  );
}
