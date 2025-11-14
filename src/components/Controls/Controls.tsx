import { useEffect } from 'react';
import { Moves } from '../../domain/Moves';
import classes from './Controls.module.css';

interface Props {
  move: (m: Moves) => void;
}

const keyToMoveSideMap = {
  d: 'R',
  w: 'U',
  s: 'F',
  a: 'L',
  q: 'D',
  e: 'B',
} as const;

export function Controls({ move }: Props) {
  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (!(key in keyToMoveSideMap)) return;

    const moveSide = keyToMoveSideMap[key as keyof typeof keyToMoveSideMap];
    const moveName = event.shiftKey ? (`${moveSide}'` as const) : moveSide;
    move(moveName);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        {Object.values(Moves).map((moveName) => (
          <button
            key={moveName}
            className={classes.button}
            onClick={() => move(moveName)}
          >
            {moveName}
          </button>
        ))}
      </div>
    </div>
  );
}
