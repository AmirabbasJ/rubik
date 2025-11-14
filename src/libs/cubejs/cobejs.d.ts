export interface CubeState {
  cp: number[];
  co: number[];
  ep: number[];
  eo: number[];
}

export type Move = string | number | number[];

export class Cube {
  constructor();
  constructor(cube: Cube);
  constructor(state: CubeState);

  /**
   * Initialize/reset this cube to match another cube or state.
   * @param cubeOrState Cube or CubeState
   */
  init(cubeOrState: Cube | CubeState): void;

  identity(): void;

  clone(): Cube;

  isSolved(): boolean;

  toJSON(): CubeState;

  asString(): string;

  randomize(): void;

  /**
   * Applies an algorithm to this cube.
   * @param algorithm A string algorithm (e.g. "U F R2 B' D2 L'"), or numeric moves or array.
   */
  move(algorithm: Move): void;

  /**
   * Solve this cube instance.
   * @param maxDepth Optional maximum number of moves (default 22).
   * @returns A string algorithm solving the cube.
   */
  solve(maxDepth?: number): string;

  /**
   * Construct a cube from a 54‐character facelet string.
   * @param str The facelet string.
   */
  static fromString(str: string): Cube;

  static random(): Cube;

  /**
   * Invert an algorithm or move.
   * @param algorithm Move in any of the acceptable formats.
   * @returns The inverted move/algorithm in the same type (string | number | number[]).
   */
  static inverse(algorithm: Move): Move;

  static initSolver(): void;

  static scramble(): string;

  static asyncInit(workerPath: string, callback: () => void): void;
  static asyncSolve(cube: Cube, callback: (algorithm: string) => void): void;
}

export default Cube;
