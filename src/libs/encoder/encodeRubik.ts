import { initialRubik } from '@/data';

import { orderedSides, type Sides, type VisibleSide } from '@/domain';
import { indexedSides } from './indexedSides';
import { isEncodedRubikValid } from './isEncodedRubikValid';

const sidesIndexMap = indexedSides.map((s) =>
  initialRubik.reduce(
    (acc, row, i) => (row.sides.includes(s) ? [i, row.sides.indexOf(s)] : acc),
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

export const orderEncoded = (unorderedEncoded: string): string => {
  const swapMap = unorderedEncoded
    .match(/.{1,9}/g)!
    .flatMap((x) => x[4])
    .reduce(
      (acc, curr, i) => ({ ...acc, [curr]: orderedSides[i] }),
      {} as Record<VisibleSide, VisibleSide>
    );

  return (unorderedEncoded.split('') as VisibleSide[])
    .map((side) => swapMap[side])
    .join('');
};

export type Encoded = {
  cube: string;
  unorderedEncoded: string;
  swapMap: Record<VisibleSide, VisibleSide>;
};

// TODO write test for it
export function encodeRubik(sides: Sides[]): Encoded | null {
  const unorderedEncoded = encodeRubikUnordered(sides);

  const swapMap = unorderedEncoded
    .match(/.{1,9}/g)!
    .flatMap((x) => x[4])
    .reduce(
      (acc, curr, i) => ({ ...acc, [curr]: orderedSides[i] }),
      {} as Record<VisibleSide, VisibleSide>
    );

  const cube = (unorderedEncoded.split('') as VisibleSide[])
    .map((side) => swapMap[side])
    .join('');

  const isEncodedValid = isEncodedRubikValid(cube);
  if (!isEncodedValid) return null;
  return { cube: cube, unorderedEncoded, swapMap };
}
