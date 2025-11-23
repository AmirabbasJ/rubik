import type { IndexedSide } from './RubikPiece';

export type Side = 'L' | 'B' | 'U' | 'R' | 'D' | 'F' | '-';
export const orderedSides = ['U', 'R', 'F', 'D', 'L', 'B'] as const;

export const indexedSides = orderedSides.flatMap((c) =>
  Array(9)
    .fill(c)
    .map((c, i) => `${c}${i}` as IndexedSide)
);
