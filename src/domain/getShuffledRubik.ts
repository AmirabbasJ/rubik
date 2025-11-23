import { initialRubik } from '@/data';
import { shuffleEncodedCenter } from '@/libs/encoder';
import { RubikSolver } from '@/libs/RubikSolver';
import { indexedSides, type Sides } from './RubikPiece';

export function getShuffledRubik() {
  const randomCube = RubikSolver.random();
  const encodedShuffle = shuffleEncodedCenter(randomCube.asString());

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
