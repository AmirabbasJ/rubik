import { useEffect } from 'react';
import { Move } from '../../domain/Moves';
import { Button } from '../../ui';
import classes from './Controls.module.css';

interface Props {
  move: (m: Move[]) => void;
  disabled?: boolean;
}

const keyToMoveSideMap = {
  d: 'R',
  w: 'U',
  s: 'F',
  a: 'L',
  q: 'D',
  e: 'B',
} as const;

export function Controls({ move, disabled = false }: Props) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (disabled) return;
    const key = event.key.toLowerCase();
    if (!(key in keyToMoveSideMap)) return;

    const moveSide = keyToMoveSideMap[key as keyof typeof keyToMoveSideMap];
    const moveName = event.shiftKey ? (`${moveSide}'` as const) : moveSide;
    move([moveName]);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [disabled]);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        {Object.values(Move).map((moveName) => (
          <Button
            square
            disabled={disabled}
            key={moveName}
            onClick={() => move([moveName])}
          >
            {moveName}
          </Button>
        ))}
      </div>
    </div>
  );
}
