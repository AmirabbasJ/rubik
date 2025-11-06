import { useRef } from 'react';
import type { Mesh } from 'three';
import { pieceSize } from '../data/Rubik';
import type { CubePiece } from '../domain/CubePiece';

export function RubikPiece({ position = [0, 0, 0], colors }: CubePiece) {
  const mesh = useRef<Mesh>(null as unknown as Mesh);

  return (
    <mesh ref={mesh} position={position}>
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
