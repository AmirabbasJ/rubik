import { RubikPieces } from '../data/Rubik';
import { RubikPiece } from './RubikPiece';

export const Rubik = () => {
  return RubikPieces.map((cube, index) => (
    <RubikPiece key={index} position={cube.position} colors={cube.colors} />
  ));
};
