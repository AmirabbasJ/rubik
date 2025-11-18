import { initialRubik } from '../../data/initialRubik';

import {
  orderedSides,
  type IndexedSide,
  type Sides,
  type VisibleSide,
} from '../RubikPiece';
import { isEncodedRubikValid } from './isEncodedRubikValid';

export const sidesIndexMap = orderedSides
  .flatMap((c) =>
    Array(9)
      .fill(c)
      .map((c, i) => `${c}${i}` as IndexedSide)
  )
  .map((c) =>
    initialRubik.reduce(
      (acc, row, i) =>
        row.sides.includes(c) ? [i, row.sides.indexOf(c)] : acc,
      [-1, -1]
    )
  );

export function encodeRubikUnordered(sides: Sides[]) {
  return sidesIndexMap
    .map((s) => {
      const [index, innerIndex] = s;
      const indexedSide = sides[index][innerIndex];
      return indexedSide[0];
    })
    .join('');
}

// TODO write test for it
export function encodeRubik(sides: Sides[]): {
  encoded: string;
  unorderedEncoded: string;
  swapMap: Record<VisibleSide, VisibleSide>;
} | null {
  const unorderedEncoded = encodeRubikUnordered(sides);

  const swapMap = unorderedEncoded
    .match(/.{1,9}/g)!
    .flatMap((x) => x[4])
    .reduce(
      (acc, curr, i) => ({ ...acc, [curr]: orderedSides[i] }),
      {} as Record<VisibleSide, VisibleSide>
    );

  const encoded = (unorderedEncoded.split('') as VisibleSide[])
    .map((side) => swapMap[side])
    .join('');

  const isEncodedValid = isEncodedRubikValid(encoded);
  if (!isEncodedValid) return null;
  return { encoded, unorderedEncoded, swapMap };
}
