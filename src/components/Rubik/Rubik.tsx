import {
  Html,
  PresentationControls,
  useContextBridge,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import jeasings from 'jeasings';
import { useRef, useState } from 'react';
import { type Group } from 'three';
import { ColoringContext } from '../../Context/ColorContext';
import { initialRubikPieces as initRubikPieces } from '../../data/Rubik';
import type { Axis } from '../../domain/Axis';
import { encodeRubik } from '../../domain/encodeRubik';
import type { MoveWithDoubles } from '../../domain/Moves';
import type { Sides } from '../../domain/RubikPiece';
import CubeJs from '../../libs/cubejs';
import { Controls } from '../Controls/Controls';
import { Navbar } from '../Navbar/Navbar';
import { RubikPiece, type PieceMesh } from './RubikPiece';

const pieceSize = 0.75;
const initialRotation = Math.PI / 5;

interface Rotation {
  axis: Axis;
  limit: number;
  multiplier: number;
}

export const Rubik = () => {
  const ContextProviders = useContextBridge(ColoringContext);
  const [isSolving, setIsSolving] = useState(false);

  const rotationGroupRef = useRef<Group>(null as unknown as Group);

  const cubeGroupRef = useRef<Group>(null as unknown as Group);

  const moveListRef = useRef<MoveWithDoubles[]>([]);

  //TODO random code
  // useEffect(() => {
  //   const randomCube = Cube.random();
  //   const string = randomCube.asString();
  //   const map = ['U', 'R', 'F', 'D', 'L', 'B']
  //     .flatMap((c) =>
  //       Array(9)
  //         .fill(c)
  //         .map((c, i) => `${c}${i}`)
  //     )
  //     .map((v, i) => ({ [v]: `${string[i]}${v[1]}` }))
  //     .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  //   console.log(string);

  //   [...cubeGroupRef.current.children]
  //     .toSorted((a, b) => Number(a.name) - Number(b.name))
  //     .forEach((c) =>
  //       c.material.forEach((m) => {
  //         if (m.name !== '' && m.name !== '-' && m.name) {
  //           const color = sideToColorMapPalette[map[m.name][0]];

  //           m.name = map[m.name];
  //           m.color.setStyle(color);
  //         }
  //       })
  //     );
  // }, []);

  useFrame(() => {
    jeasings.update();
  });

  function resetCubeGroup(): void {
    const rotationGroup = rotationGroupRef.current;
    const cubeGroup = cubeGroupRef.current;

    [...rotationGroup.children].forEach((c) => {
      cubeGroup.attach(c);
    });
    rotationGroup.quaternion.set(0, 0, 0, 1);
  }

  function attachToRotationGroup({ axis, limit }: Rotation): void {
    const rotationGroup = rotationGroupRef.current;
    const cubeGroup = cubeGroupRef.current;

    [...cubeGroup.children]
      .filter((c) => {
        return limit < 0 ? c.position[axis] < limit : c.position[axis] > limit;
      })
      .forEach((c) => {
        rotationGroup.attach(c);
      });
  }

  function getRotationAnimationEasing({ axis, multiplier }: Rotation) {
    const rotationGroup = rotationGroupRef.current;

    return new jeasings.JEasing(rotationGroup.rotation)
      .to(
        {
          [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier,
        },
        250 * (Math.abs(multiplier) + (Math.abs(multiplier) - 1) * 0.6)
      )
      .easing(jeasings.Cubic.InOut);
  }

  function rotate(rotations: Rotation[]) {
    const isAnimating = jeasings.getLength() > 0;
    if (isAnimating) return;

    resetCubeGroup();
    attachToRotationGroup(rotations[0]);
    const [first] = rotations
      .map((rotation) => ({
        animation: getRotationAnimationEasing(rotation),
        rotation,
      }))
      .map(({ animation }, index, mappedRotations) => {
        const next = mappedRotations[index + 1];
        if (next) {
          animation.onComplete(() => {
            resetCubeGroup();
            attachToRotationGroup(next.rotation);
          });
          animation.chain(next.animation);
        } else {
          animation.onComplete(() => {
            setIsSolving(false);
            resetCubeGroup();
          });
        }
        return animation;
      });

    first.start();
  }

  const moveToRotation = (moveName: MoveWithDoubles): Rotation => {
    switch (moveName) {
      case 'U':
        return { axis: 'y', limit: 0.5, multiplier: -1 };
      case 'D':
        return { axis: 'y', limit: -0.5, multiplier: 1 };
      case 'R':
        return { axis: 'x', limit: 0.5, multiplier: -1 };
      case 'L':
        return { axis: 'x', limit: -0.5, multiplier: 1 };
      case 'F':
        return { axis: 'z', limit: 0.5, multiplier: -1 };
      case 'B':
        return { axis: 'z', limit: -0.5, multiplier: 1 };
      case "U'":
        return { axis: 'y', limit: 0.5, multiplier: 1 };
      case "D'":
        return { axis: 'y', limit: -0.5, multiplier: -1 };
      case "R'":
        return { axis: 'x', limit: 0.5, multiplier: 1 };
      case "L'":
        return { axis: 'x', limit: -0.5, multiplier: -1 };
      case "F'":
        return { axis: 'z', limit: 0.5, multiplier: 1 };
      case "B'":
        return { axis: 'z', limit: -0.5, multiplier: -1 };
      case 'U2':
        return { axis: 'y', limit: 0.5, multiplier: -2 };
      case 'D2':
        return { axis: 'y', limit: -0.5, multiplier: 2 };
      case 'R2':
        return { axis: 'x', limit: 0.5, multiplier: -2 };
      case 'L2':
        return { axis: 'x', limit: -0.5, multiplier: 2 };
      case 'F2':
        return { axis: 'z', limit: 0.5, multiplier: -2 };
      case 'B2':
        return { axis: 'z', limit: -0.5, multiplier: 2 };
    }
  };

  const move = (moves: MoveWithDoubles[]) => {
    const isAnimating = jeasings.getLength() > 0;
    if (isSolving || isAnimating) return;

    moveListRef.current = moveListRef.current.concat(moves);

    const rotations = moves.map((moveName) => moveToRotation(moveName));
    rotate(rotations);
  };

  function solve() {
    if (isSolving) return;
    const moveList = moveListRef.current;

    const representation = encodeRubik(
      (
        cubeGroupRef.current.children
          .toSorted((a, b) => Number(a.name) - Number(b.name))
          .map((m) => m.children.slice(1)) as PieceMesh[][]
      ).map((ms) => ms.map((m) => m.material.name) as Sides)
    );

    const cube = CubeJs.fromString(representation);

    if (moveList.length > 0) cube.move(moveList.join(' '));

    setIsSolving(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        move(cube.solve().split(' ') as MoveWithDoubles[]);
      });
    });
  }

  return (
    <>
      <Html fullscreen>
        <ContextProviders>
          <Navbar isDisabled={isSolving} solve={solve} />
          <Controls disabled={isSolving} move={move} />
        </ContextProviders>
      </Html>
      <group position={[0, 0.3, 0]}>
        <PresentationControls
          global
          speed={2}
          rotation={[initialRotation, Math.PI / 4, 0]}
          polar={[
            -Math.PI / 2 - initialRotation,
            Math.PI / 2 - initialRotation,
          ]}
          azimuth={[-Infinity, Infinity]}
        >
          <group ref={rotationGroupRef} />
          <group ref={cubeGroupRef}>
            {initRubikPieces.map((cube, index) => (
              <RubikPiece
                index={index}
                key={index}
                position={cube.position}
                sides={cube.sides}
                pieceSize={pieceSize}
              />
            ))}
          </group>
        </PresentationControls>
      </group>
    </>
  );
};
