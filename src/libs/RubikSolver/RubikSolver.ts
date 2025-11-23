import { initialRubik } from '@/data';
import { orderedSides, type Sides, type VisibleSide } from '@/domain';
import { type Encoded } from '@/libs/encoder';
import Cube, { type CubeState } from 'cubejs';
import shuffle from 'lodash.shuffle';
import { indexedSides } from '../encoder/indexedSides';

export class RubikSolver {
  static solvedEncoded: string = new Cube().asString();
  static worker: Worker;

  static initSolver(cb: (solution: string | null, encoded: Encoded) => void) {
    if (this.worker) this.worker.terminate();

    this.worker = new Worker(new URL('./solverWorker.js', import.meta.url));
    this.worker.postMessage({ type: 'generateTables' });

    this.worker.addEventListener('message', (e) => {
      if (e.data.type === 'solution') cb(e.data.result, e.data);
    });
  }

  static shuffle() {
    const randomCube = Cube.random();

    const unorderedEncoded = shuffle(orderedSides).join('');

    const swapMap = orderedSides.reduce(
      (acc, curr, i) => ({ ...acc, [curr]: unorderedEncoded[i] }),
      {} as Record<VisibleSide, VisibleSide>
    );

    const encodedShuffle = (randomCube.asString().split('') as VisibleSide[])
      .map((side) => swapMap[side])
      .join('');

    const nameShuffleMap = indexedSides
      .map((v, i) => ({ [v]: `${encodedShuffle[i]}${v[1]}` }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const shuffledSides = initialRubik.map(({ sides: c }) =>
      c.map((m) => {
        if (m === '-') return '-';
        else return nameShuffleMap[m];
      })
    ) as Sides[];

    return shuffledSides;
  }

  static fromString(string: string) {
    return Cube.fromString(string).asString();
  }

  static toJson(string: string): CubeState {
    return Cube.fromString(string).toJSON();
  }

  static inverse(string: string) {
    return Cube.inverse(string);
  }

  static solve(encoded: Encoded) {
    if (!this.worker)
      throw new Error(
        'Worker is not initialized, you need call initSolver first'
      );

    this.worker.postMessage({
      ...encoded,
      type: 'solve',
      maxDepth: 22,
      maxTime: 10,
    });
  }

  static move(string: string, moves: string[]) {
    if (moves.length === 0) return string;
    const cube = Cube.fromString(string);
    cube.move(moves.join(' '));
    return cube.asString();
  }
}
