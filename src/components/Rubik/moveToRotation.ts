import type { Axis } from '../../domain/Axis';
import type { MoveWithDoubles } from '../../domain/Moves';

export interface Rotation {
  axis: Axis;
  limit: number;
  multiplier: number;
}

export function moveToRotation(moveName: MoveWithDoubles): Rotation {
  switch (moveName) {
    case 'U':
      return { axis: 'y', limit: 0.5, multiplier: -1 };
    case 'D':
      return { axis: 'y', limit: -0.5, multiplier: 1 };
    case 'R':
      return { axis: 'x', limit: 0.5, multiplier: -1 };
    case 'L':
      return { axis: 'x', limit: -0.5, multiplier: 1 };
    case 'F':
      return { axis: 'z', limit: 0.5, multiplier: -1 };
    case 'B':
      return { axis: 'z', limit: -0.5, multiplier: 1 };
    case "U'":
      return { axis: 'y', limit: 0.5, multiplier: 1 };
    case "D'":
      return { axis: 'y', limit: -0.5, multiplier: -1 };
    case "R'":
      return { axis: 'x', limit: 0.5, multiplier: 1 };
    case "L'":
      return { axis: 'x', limit: -0.5, multiplier: -1 };
    case "F'":
      return { axis: 'z', limit: 0.5, multiplier: 1 };
    case "B'":
      return { axis: 'z', limit: -0.5, multiplier: -1 };
    case 'U2':
      return { axis: 'y', limit: 0.5, multiplier: -2 };
    case 'D2':
      return { axis: 'y', limit: -0.5, multiplier: 2 };
    case 'R2':
      return { axis: 'x', limit: 0.5, multiplier: -2 };
    case 'L2':
      return { axis: 'x', limit: -0.5, multiplier: 2 };
    case 'F2':
      return { axis: 'z', limit: 0.5, multiplier: -2 };
    case 'B2':
      return { axis: 'z', limit: -0.5, multiplier: 2 };
  }
}
