import { initialRubikPieces } from '../data/Rubik';
import { orderedSides, type Sides, type VisibleSide } from './RubikPiece';

const sidesIndexMap = orderedSides
  .flatMap((c) =>
    Array(9)
      .fill(c)
      .map((c, i) => `${c}${i}` as VisibleSide)
  )
  .map((c) =>
    initialRubikPieces.reduce(
      (acc, row, i) =>
        row.sides.includes(c) ? [i, row.sides.indexOf(c)] : acc,
      [-1, -1]
    )
  );

// TODO write test for it
export function encodeRubik(sides: Sides[]): string {
  const string = sidesIndexMap
    .map((s) => {
      const [index, innerIndex] = s;
      const indexedSide = sides[index][innerIndex];
      return indexedSide[0];
    })
    .join('');

  const sideSwapMap = string
    .match(/.{1,9}/g)!
    .flatMap((x) => x[4])
    .reduce(
      (acc, curr, i) => ({ ...acc, [curr]: orderedSides[i] }),
      {} as Record<VisibleSide, VisibleSide>
    );

  return (string.split('') as VisibleSide[])
    .map((side) => sideSwapMap[side])
    .join('');
}
