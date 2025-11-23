import { orderedSides, type VisibleSide } from '@/domain';
import shuffle from 'lodash.shuffle';

export function shuffleEncodedCenter(encoded: string) {
  const unorderedEncoded = shuffle(orderedSides).join('');

  const swapMap = orderedSides.reduce(
    (acc, curr, i) => ({ ...acc, [curr]: unorderedEncoded[i] }),
    {} as Record<VisibleSide, VisibleSide>
  );

  const encodedOrdered = (encoded.split('') as VisibleSide[])
    .map((side) => swapMap[side])
    .join('');

  return encodedOrdered;
}
