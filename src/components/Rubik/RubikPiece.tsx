import { useColoring } from '@/context';
import { type RubikPiece as RubikPieceType, type Side } from '@/domain';
import { RectangleRounded } from '@/libs/threejs-addons';
import { isAnimating } from '@/utils';
import { memo } from 'react';
import type { Group, MeshBasicMaterial } from 'three';
import { type Mesh } from 'three';
import { RoundedBoxGeometry } from 'three/addons';

export type PieceMesh = Mesh<RoundedBoxGeometry, MeshBasicMaterial>;
export type PiecesGroup = Group & {
  children: PieceMesh[];
};

type Props = RubikPieceType & {
  pieceSize: number;
  index: number;
  checkIsColored: VoidFunction;
  removeSolutionSteps: VoidFunction;
};

const sideConfig = {
  offset: 0.01,
  scale: 0.9,
  radius: 0.1,
  smoothness: 3,
};

export const RubikPiece = memo(
  ({
    position,
    sides,
    pieceSize,
    index,
    checkIsColored,
    removeSolutionSteps,
  }: Props) => {
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
          const name =
            indexedSide === '-' ? indexedSide : (indexedSide[0] as Side);
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
              onPointerEnter={(event) => {
                if (isAnimating()) return;
                const selectedSide = selectedSideRef.current;

                event.stopPropagation();
                const { face, object } = event;
                const piece = object as PieceMesh;
                if (!face || !selectedSide) return;

                const hoveredMaterial = piece.material;
                hoveredMaterial.opacity = 0.8;
              }}
              onPointerLeave={(event) => {
                if (isAnimating()) return;
                const selectedSide = selectedSideRef.current;

                event.stopPropagation();
                const { face, object } = event;
                const piece = object as PieceMesh;
                if (!face || !selectedSide) return;

                const hoveredMaterial = piece.material;
                hoveredMaterial.opacity = 1;
              }}
              onClick={(event) => {
                if (isAnimating()) return;
                const selectedSide = selectedSideRef.current;

                event.stopPropagation();
                const { face, object } = event;
                const piece = object as PieceMesh;
                if (!face || !selectedSide) return;

                const clickedMaterial = piece.material;
                const index = clickedMaterial.name[1];

                clickedMaterial.name = `${selectedSide}${index}`;
                clickedMaterial.color.setStyle(sideToColorMap[selectedSide]);
                checkIsColored();
                removeSolutionSteps();
              }}
            >
              <meshBasicMaterial
                opacity={1}
                transparent
                name={name}
                key={index}
                color={sideToColorMap[name]}
              />
            </mesh>
          );
        })}
      </group>
    );
  }
);
