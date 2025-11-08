import type { Axis } from '../../domain/Axis';
import classes from './Controls.module.css';

interface Props {
  rotate: (axis: Axis, limit: number, multiplier: number) => void;
}
export function Controls({ rotate }: Props) {
  return (
    <div className={classes.controls}>
      <button className={classes.button} onClick={() => rotate('x', 0.5, -1)}>
        R
      </button>
      <button className={classes.button} onClick={() => rotate('y', 0.5, 1)}>
        U
      </button>
      <button className={classes.button} onClick={() => rotate('z', 0.5, -1)}>
        F
      </button>
      <button className={classes.button} onClick={() => rotate('x', -0.5, 1)}>
        L
      </button>
      <button className={classes.button} onClick={() => rotate('y', -0.5, -1)}>
        D
      </button>
      <button className={classes.button} onClick={() => rotate('z', -0.5, 1)}>
        B
      </button>

      <button className={classes.button} onClick={() => rotate('x', 0.5, 1)}>
        R'
      </button>

      <button className={classes.button} onClick={() => rotate('y', 0.5, -1)}>
        U'
      </button>

      <button className={classes.button} onClick={() => rotate('z', 0.5, 1)}>
        F'
      </button>

      <button className={classes.button} onClick={() => rotate('x', -0.5, -1)}>
        L'
      </button>

      <button className={classes.button} onClick={() => rotate('y', -0.5, 1)}>
        D'
      </button>
      <button className={classes.button} onClick={() => rotate('z', -0.5, -1)}>
        B'
      </button>
    </div>
  );
}
