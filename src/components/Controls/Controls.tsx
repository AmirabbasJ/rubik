import { useEffect } from 'react';
import classes from './Controls.module.css';

interface Props {
  moveMap: Record<string, VoidFunction>;
}

const keyToMoveMap = {
  d: 'R',
  w: 'U',
  s: 'F',
  a: 'L',
  q: 'D',
  e: 'B',
} as const;

export function Controls({ moveMap }: Props) {
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
    <div className={classes.container}>
      <div className={classes.controls}>
        {Object.entries(moveMap).map(([key, action]) => (
          <button key={key} className={classes.button} onClick={action}>
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
