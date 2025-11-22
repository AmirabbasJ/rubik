import Cube from '../../libs/cubejs/internal';
import { orderedSides } from '../RubikPiece';

function parity(arr: number[]) {
  let inv = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) inv++;
    }
  }
  return inv % 2;
}

export const isEncodedRubikValid = (encoded: string) => {
  const encodedArr = encoded.split('');
  const hasDuplicatedSide = !orderedSides.every(
    (side) => encodedArr.filter((s) => s === side).length === 9
  );
  if (hasDuplicatedSide) return false;

  const cube = Cube.fromString(encoded);
  if (cube.asString() !== encoded) return false;

  const jsonEncoded = cube.toJSON();

  const coSum = jsonEncoded.co.reduce((a, b) => a + b, 0);
  if (coSum % 3 !== 0) return false;

  const eoSum = jsonEncoded.eo.reduce((a, b) => a + b, 0);
  if (eoSum % 2 !== 0) return false;

  const cpParity = parity(jsonEncoded.cp);
  const epParity = parity(jsonEncoded.ep);
  if (cpParity !== epParity) return false;

  return true;
};
