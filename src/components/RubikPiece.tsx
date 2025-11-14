import { useRef } from 'react';
import { type Mesh } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js';
import { useColoring } from '../Context/ColorContext';
import { type CubePiece, type Side } from '../domain/CubePiece';

type Props = CubePiece & { spacing: number; pieceSize: number; id: number };

export function RubikPiece({ position, sides, pieceSize, id }: Props) {
  const { selectedSide, sideToColorMap } = useColoring();

  const meshRef = useRef<Mesh>(null as unknown as Mesh);
  return (
    <mesh
      name={String(id)}
      onClick={(event) => {
        event.stopPropagation();
        const { face, object } = event;
        if (face) {
          const materialIndex = face.materialIndex;
          const clickedMaterial = object.material[materialIndex];
          const clickedSide = clickedMaterial.name[0];
          if (selectedSide) {
            clickedMaterial.name = `${selectedSide}${clickedMaterial.name[1]}`;
            clickedMaterial.color.setStyle(sideToColorMap[selectedSide]);
          }
        }
      }}
      ref={meshRef}
      geometry={
        new RoundedBoxGeometry(pieceSize, pieceSize, pieceSize, 16, 0.1)
      }
      position={[
        position.x * pieceSize,
        position.y * pieceSize,
        position.z * pieceSize,
      ]}
    >
      {sides.map((indexedSide, index) => {
        const side =
          indexedSide === '-' ? indexedSide : (indexedSide[0] as Side);
        const name = indexedSide === '-' ? undefined : indexedSide;
        return (
          <meshBasicMaterial
            name={name ?? undefined}
            key={index}
            attach={`material-${index}`}
            color={sideToColorMap[side]}
          />
        );
      })}
    </mesh>
  );
}
