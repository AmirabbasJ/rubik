import { useRef } from 'react';
import { type Mesh } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js';
import type { CubePiece } from '../domain/CubePiece';

type Props = CubePiece & { spacing: number; pieceSize: number };

export function RubikPiece({ position, colors, spacing, pieceSize }: Props) {
  const meshRef = useRef<Mesh>(null as unknown as Mesh);
  console.log(position.x);

  return (
    <mesh
      ref={meshRef}
      geometry={
        new RoundedBoxGeometry(pieceSize, pieceSize, pieceSize, 16, 0.1)
      }
      position={[
        position.x * (pieceSize + spacing),
        position.y * (pieceSize + spacing),
        position.z * (pieceSize + spacing),
      ]}
    >
      {colors.map((color, index) => (
        <meshLambertMaterial
          key={index}
          attach={`material-${index}`}
          color={color}
        />
      ))}
    </mesh>
  );
}
