import { Html, useContextBridge } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import jeasings from 'jeasings';
import { useRef } from 'react';
import { type Group, type Object3DEventMap } from 'three';
import { ColoringContext } from '../Context/ColorContext';
import { RubikPieces as initRubikPieces, sidesToString } from '../data/Rubik';
import type { Axis } from '../domain/Axis';
import type { Moves } from '../domain/Moves';
import Cube from '../libs/cubejs';
import { Controls } from './Controls/Controls';
import { Navbar } from './Navbar/Navbar';
import { Palette } from './Palette/Palette';
import { RubikPiece } from './RubikPiece';

const pieceSize = 0.75;
const pieceSpacing = 0.03;

export const Rubik = () => {
  const ContextProviders = useContextBridge(ColoringContext);

  const rotationGroupRef = useRef<Group<Object3DEventMap>>(
    null as unknown as Group<Object3DEventMap>
  );

  const cubeGroupRef = useRef<Group<Object3DEventMap>>(
    null as unknown as Group<Object3DEventMap>
  );

  const moveListRef = useRef<Moves[]>([]);
  const moveList = moveListRef.current;

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

  function solve() {
    const x = sidesToString(
      [...cubeGroupRef.current.children]
        .toSorted((a, b) => Number(a.name) - Number(b.name))
        .map((c) => c.material.map((m) => m.name))
    );

    const cube = Cube.fromString(x);

    cube
      .solve()
      .split(' ')
      .flatMap((c) => (c.endsWith('2') ? [c[0], c[0]] : [c]))
      .forEach((c, index) => {
        setTimeout(() => {
          move[c as Moves]();
        }, index * 500);
      });
    if (moveList.length > 0) cube.move(Cube.inverse(moveList.join(' ')));
  }

  const move = (moveName: Moves) => {
    moveList.push(moveName);

    switch (moveName) {
      case 'U':
        return rotate('y', 0.5, -1);
      case 'D':
        return rotate('y', -0.5, 1);
      case 'R':
        return rotate('x', 0.5, -1);
      case 'L':
        return rotate('x', -0.5, 1);
      case 'F':
        return rotate('z', 0.5, -1);
      case 'B':
        return rotate('z', -0.5, 1);
      case "U'":
        return rotate('y', 0.5, 1);
      case "D'":
        return rotate('y', -0.5, -1);
      case "R'":
        return rotate('x', 0.5, 1);
      case "L'":
        return rotate('x', -0.5, -1);
      case "F'":
        return rotate('z', 0.5, 1);
      case "B'":
        return rotate('z', -0.5, -1);
    }
  };

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
      .start()
      .onComplete(() => {
        resetCubeGroup(cubeGroupRef.current, rotationGroupRef.current);
      });
  }

  function rotate(axis: Axis, limit: number, multiplier: number): void {
    const isAnimating = jeasings.getLength() > 0;
    if (!isAnimating) {
      attachToRotationGroup(
        cubeGroupRef.current,
        rotationGroupRef.current,
        axis,
        limit
      );
      animateRotationGroup(rotationGroupRef.current, axis, multiplier);
    }
  }

  return (
    <>
      <Html fullscreen>
        <ContextProviders>
          <Navbar solve={solve} />
          <Palette />
          <Controls move={move} />
        </ContextProviders>
      </Html>
      <group ref={rotationGroupRef} />
      <group ref={cubeGroupRef}>
        {initRubikPieces.map((cube, index) => (
          <RubikPiece
            key={index}
            position={cube.position}
            sides={cube.sides}
            pieceSize={pieceSize}
            spacing={pieceSpacing}
          />
        ))}
      </group>
    </>
  );
};
