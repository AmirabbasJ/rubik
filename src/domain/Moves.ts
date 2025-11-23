export type Move =
  | 'U'
  | 'D'
  | 'R'
  | 'L'
  | 'F'
  | 'B'
  | "U'"
  | "D'"
  | "R'"
  | "L'"
  | "F'"
  | "B'"
  | 'U2'
  | 'D2'
  | 'R2'
  | 'L2'
  | 'F2'
  | 'B2';

export const Move = {
  Up: 'U',
  Down: 'D',
  Right: 'R',
  Left: 'L',
  Front: 'F',
  Back: 'B',
  UpReverse: "U'",
  DownReverse: "D'",
  RightReverse: "R'",
  LeftReverse: "L'",
  FrontReverse: "F'",
  BackReverse: "B'",
} as const;
