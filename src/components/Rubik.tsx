import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import type { Group, Object3DEventMap } from 'three';
import { RubikPieces } from '../data/Rubik';
import { RubikPiece } from './RubikPiece';

export const Rubik = () => {
  const pivotRef = useRef<Group<Object3DEventMap>>(
    null as unknown as Group<Object3DEventMap>
  );

  useEffect(() => {
    gsap.to(pivotRef.current.rotation, {
      x: Math.PI / 2,
      duration: 2,
      delay: 1,
      ease: 'power2.inOut',
    });
  });

  const firstThree = RubikPieces.filter((c) => c.position[0] < 0);
  const rest = RubikPieces.filter((c) => c.position[0] >= 0);

  return (
    <>
      <group ref={pivotRef} position={[0, 0, 0]}>
        {firstThree.map((cube, index) => (
          <RubikPiece
            key={index}
            position={cube.position}
            colors={cube.colors}
          />
        ))}
      </group>
      {rest.map((cube, index) => (
        <RubikPiece key={index} position={cube.position} colors={cube.colors} />
      ))}
    </>
  );
};
