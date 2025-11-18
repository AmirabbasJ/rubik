import shuffle from 'lodash.shuffle';
import { orderedSides, type VisibleSide } from '../RubikPiece';

export function shuffleEncodedCenter(encoded: string) {
  const unorderedEncoded = shuffle(encoded.match(/.{1,9}/g)).join('');

  const swapMap = unorderedEncoded
    .match(/.{1,9}/g)!
    .flatMap((x) => x[4])
    .reduce(
      (acc, curr, i) => ({ ...acc, [curr]: orderedSides[i] }),
      {} as Record<VisibleSide, VisibleSide>
    );

  const encodedOrdered = (encoded.split('') as VisibleSide[])
    .map((side) => swapMap[side])
    .join('');

  return encodedOrdered;
}
