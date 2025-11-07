import { useFrame } from '@react-three/fiber';
import jeasings from 'jeasings';
import { useRef } from 'react';
import { type Group, type Object3DEventMap } from 'three';
import { RubikPieces as initRubikPieces } from '../data/Rubik';
import type { Axis } from '../domain/Axis';
import { RubikPiece } from './RubikPiece';

const pieceSize = 0.75;
const pieceSpacing = 0.03;

export const Rubik: React.FC = () => {
  const rotationGroupRef = useRef<Group<Object3DEventMap>>(
    null as unknown as Group<Object3DEventMap>
  );

  const pivotRef = useRef<Group<Object3DEventMap>>(
    null as unknown as Group<Object3DEventMap>
  );

  useFrame(() => {
    jeasings.update();
  });

  function resetCubeGroup(cubeGroup: Group, rotationGroup: Group): void {
    [...rotationGroup.children].forEach((c) => {
      cubeGroup.attach(c);
    });
    rotationGroup.quaternion.set(0, 0, 0, 1);
  }

  function attachToRotationGroup(
    cubeGroup: Group,
    rotationGroup: Group,
    axis: Axis,
    limit: number
  ): void {
    [...cubeGroup.children]
      .filter((c) => {
        return limit < 0 ? c.position[axis] < limit : c.position[axis] > limit;
      })
      .forEach((c) => {
        rotationGroup.attach(c);
      });
  }

  function animateRotationGroup(
    rotationGroup: Group,
    axis: Axis,
    multiplier: number
  ): void {
    new jeasings.JEasing(rotationGroup.rotation)
      .to(
        {
          [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier,
        },
        250
      )
      .easing(jeasings.Cubic.InOut)
      .start();
  }

  function rotate(
    cubeGroup: Group,
    rotationGroup: Group,
    axis: Axis,
    limit: number,
    multiplier: number
  ): void {
    if (!jeasings.getLength()) {
      resetCubeGroup(cubeGroup, rotationGroup);
      attachToRotationGroup(cubeGroup, rotationGroup, axis, limit);
      animateRotationGroup(rotationGroup, axis, multiplier);
    }
  }

  return (
    <>
      <group ref={rotationGroupRef} />
      <group ref={pivotRef}>
        {initRubikPieces.map((cube, index) => (
          <RubikPiece
            position={cube.position}
            pieceSize={pieceSize}
            spacing={pieceSpacing}
            key={index}
            colors={cube.colors}
          />
        ))}
      </group>
    </>
  );
};
