export type Moves =
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
  | "B'";

export const Moves = {
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
