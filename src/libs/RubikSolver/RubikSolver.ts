import Cube, { type CubeState } from 'cubejs';
import type { Encoded } from '../../domain/encoder/encodeRubik';

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

  static random() {
    return Cube.random();
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
