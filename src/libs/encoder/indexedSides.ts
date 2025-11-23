import { type IndexedSide, orderedSides } from '../../domain/Side';

export const indexedSides = orderedSides.flatMap((c) =>
  Array(9)
    .fill(c)
    .map((c, i) => `${c}${i}` as IndexedSide)
);
