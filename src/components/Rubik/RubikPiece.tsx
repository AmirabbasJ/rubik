import type { Group, MeshBasicMaterial } from 'three';
import { type Mesh } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js';
import { useColoring } from '../../Context/ColorContext';
import { type CubePiece, type Side } from '../../domain/CubePiece';
import { RectangleRounded } from '../../libs/threejs-addons';

export type PieceMesh = Mesh<RoundedBoxGeometry, MeshBasicMaterial>;
export type PiecesGroup = Group & {
  children: PieceMesh[];
};

type Props = CubePiece & { pieceSize: number; index: number };

const sideConfig = {
  offset: 0.01,
  scale: 0.9,
  radius: 0.1,
  smoothness: 3,
};

export function RubikPiece({ position, sides, pieceSize, index }: Props) {
  const { selectedSideRef, sideToColorMapRef } = useColoring();

  const sideToColorMap = sideToColorMapRef.current;

  const sidePositionMapping = [
    [pieceSize / 2 + sideConfig.offset, 0, 0],
    [-pieceSize / 2 - sideConfig.offset, 0, 0],
    [0, pieceSize / 2 + sideConfig.offset, 0],
    [0, -pieceSize / 2 - sideConfig.offset, 0],
    [0, 0, pieceSize / 2 + sideConfig.offset],
    [0, 0, -pieceSize / 2 - sideConfig.offset],
  ] as const;

  const sideRotationsMapping = [
    [0, Math.PI / 2, 0],
    [0, -Math.PI / 2, 0],
    [-Math.PI / 2, 0, 0],
    [Math.PI / 2, 0, 0],
    [0, 0, 0],
    [0, Math.PI, 0],
  ] as const;

  return (
    <group
      name={String(index)}
      position={[
        position.x * pieceSize,
        position.y * pieceSize,
        position.z * pieceSize,
      ]}
    >
      <mesh
        geometry={
          new RoundedBoxGeometry(pieceSize, pieceSize, pieceSize, 16, 0.08)
        }
      >
        <meshBasicMaterial color={sideToColorMap['-']} />
      </mesh>

      {sides.map((indexedSide, index) => {
        const side =
          indexedSide === '-' ? indexedSide : (indexedSide[0] as Side);
        const name = indexedSide === '-' ? undefined : indexedSide;
        return (
          <mesh
            key={indexedSide + index}
            geometry={RectangleRounded(
              pieceSize * sideConfig.scale,
              pieceSize * sideConfig.scale,
              sideConfig.radius,
              sideConfig.smoothness
            )}
            position={sidePositionMapping[index]}
            rotation={sideRotationsMapping[index]}
            onClick={(event) => {
              const selectedSide = selectedSideRef.current;

              event.stopPropagation();
              const { face, object } = event;
              const piece = object as PieceMesh;
              if (!face || !selectedSide) return;

              const clickedMaterial = piece.material;
              const index = clickedMaterial.name[1];

              clickedMaterial.name = `${selectedSide}${index}`;
              clickedMaterial.color.setStyle(sideToColorMap[selectedSide]);
            }}
          >
            <meshBasicMaterial
              name={name}
              key={index}
              color={sideToColorMap[side]}
            />
          </mesh>
        );
      })}
    </group>
  );
}
