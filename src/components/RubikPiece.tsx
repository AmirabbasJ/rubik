import { useRef } from 'react';
import { type Mesh } from 'three';
import { pieceSize } from '../data/Rubik';
import type { CubePiece } from '../domain/CubePiece';

type Props = CubePiece;

export function RubikPiece({ position = [0, 0, 0], colors }: Props) {
  const meshRef = useRef<Mesh>(null as unknown as Mesh);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry attach="geometry" args={[pieceSize, pieceSize, pieceSize]} />
      {colors.map((color, index) => (
        <meshBasicMaterial
          key={index}
          attach={`material-${index}`}
          color={color}
        />
      ))}
    </mesh>
  );
}
