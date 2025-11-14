import { useRef } from 'react';
import { type Mesh } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js';
import { useColor } from '../Context/ColorContext';
import { type CubePiece, type Side } from '../domain/CubePiece';
import { sideToColorMapPalette } from './Palette/Palette';

type Props = CubePiece & { spacing: number; pieceSize: number; id: number };

const sideToColorMap = {
  L: '#EF476F',
  B: '#F78C6B',
  U: '#FFD166',
  R: '#06D6A0',
  D: '#118AB2',
  F: '#FFFFFF',
  '-': '#000000',
};

const swapped = {};

export function RubikPiece({ position, sides, pieceSize, id, pieces }: Props) {
  const { color: selected, setColor } = useColor();
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
          if (selected) {
            clickedMaterial.name = `${selected}${clickedMaterial.name[1]}`;
            clickedMaterial.color.setStyle(sideToColorMapPalette[selected]);
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
