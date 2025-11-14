import { useRef } from 'react';
import type { MeshBasicMaterial } from 'three';
import { type Mesh } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js';
import { useColoring } from '../Context/ColorContext';
import { type CubePiece, type Side } from '../domain/CubePiece';

type Props = CubePiece & { spacing: number; pieceSize: number };

export function RubikPiece({ position, sides, pieceSize }: Props) {
  const meshRef = useRef<Mesh>(null as unknown as Mesh);

  const { selectedSide, sideToColorMap } = useColoring();

  return (
    <mesh
      ref={meshRef}
      geometry={
        new RoundedBoxGeometry(pieceSize, pieceSize, pieceSize, 16, 0.1)
      }
      position={[
        position.x * pieceSize,
        position.y * pieceSize,
        position.z * pieceSize,
      ]}
      onClick={(event) => {
        event.stopPropagation();
        const { face, object } = event;
        const piece = object as Mesh<RoundedBoxGeometry, MeshBasicMaterial[]>;
        if (!face || !selectedSide) return;

        const materialIndex = face.materialIndex;
        const clickedMaterial = piece.material[materialIndex];
        const index = clickedMaterial.name[1];

        clickedMaterial.name = `${selectedSide}${index}`;
        clickedMaterial.color.setStyle(sideToColorMap[selectedSide]);
      }}
    >
      {sides.map((indexedSide, index) => {
        const side =
          indexedSide === '-' ? indexedSide : (indexedSide[0] as Side);
        const name = indexedSide === '-' ? undefined : indexedSide;
        return (
          <meshBasicMaterial
            name={name}
            key={index}
            attach={`material-${index}`}
            color={sideToColorMap[side]}
          />
        );
      })}
    </mesh>
  );
}
