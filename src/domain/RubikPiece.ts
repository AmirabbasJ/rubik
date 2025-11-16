export type Side = 'L' | 'B' | 'U' | 'R' | 'D' | 'F' | '-';
interface Position {
  x: number;
  y: number;
  z: number;
}

export const getSideIndex = (side: Side, p: Position) => {
  if (side === '-') return null;

  let movingAxisPositions: [number, number] = [p.x, p.z];

  switch (side) {
    case 'D':
      movingAxisPositions = [p.x, p.z];
      break;

    case 'L':
      movingAxisPositions = [p.z, p.y];
      break;

    case 'R':
      movingAxisPositions = [p.y, p.z];
      break;

    case 'B':
      movingAxisPositions = [p.x, p.y];
      break;

    case 'F':
      movingAxisPositions = [p.x, p.y];
      break;

    default:
      break;
  }

  const [aAxis, bAxis] = movingAxisPositions;
  return Math.abs(bAxis + 1) * 3 + Math.abs(aAxis + 1);
};

export type VisibleSide = `${Exclude<Side, '-'>}${number}` | '-';
export type Sides = [
  VisibleSide,
  VisibleSide,
  VisibleSide,
  VisibleSide,
  VisibleSide,
  VisibleSide
];

export interface RubikPiece {
  position: Position;
  sides: Sides;
}
