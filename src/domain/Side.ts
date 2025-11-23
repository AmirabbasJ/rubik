export type Side = 'L' | 'B' | 'U' | 'R' | 'D' | 'F' | '-';
export const orderedSides = ['U', 'R', 'F', 'D', 'L', 'B'] as const;

export type VisibleSide = Exclude<Side, '-'>;
export type IndexedSide = `${VisibleSide}${number}` | '-';
export type Sides = [
  IndexedSide,
  IndexedSide,
  IndexedSide,
  IndexedSide,
  IndexedSide,
  IndexedSide
];
