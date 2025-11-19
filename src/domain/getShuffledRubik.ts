import { initialRubik } from '../data/initialRubik';
import CubeJs from '../libs/cubejs';
import { indexedSides, type Sides } from './RubikPiece';
import { shuffleEncodedCenter } from './encoder/shuffleEncodedCenter';

export function getShuffledRubik() {
  const randomCube = CubeJs.random();
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
