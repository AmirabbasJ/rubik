import { Html, useContextBridge } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import jeasings from 'jeasings';
import { useRef } from 'react';
import { type Group, type Object3DEventMap } from 'three';
import { ColorContext, useColor } from '../Context/ColorContext';
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

Cube.initSolver();
console.log(Cube.random().asString());

const moveList = [];

export const Rubik: React.FC = () => {
  const side = useColor();
  const ContextProviders = useContextBridge(ColorContext);

  const rotationGroupRef = useRef<Group<Object3DEventMap>>(
    null as unknown as Group<Object3DEventMap>
  );

  const cubeGroupRef = useRef<Group<Object3DEventMap>>(
    null as unknown as Group<Object3DEventMap>
  );

  const moveMap: Record<Moves, VoidFunction> = {
    U: () => {
      rotate('y', 0.5, -1);

      moveList.push('U');
    },
    D: () => {
      rotate('y', -0.5, 1);
      moveList.push('D');
    },
    R: () => {
      rotate('x', 0.5, -1);
      moveList.push('R');
    },
    L: () => {
      rotate('x', -0.5, 1);
      moveList.push('L');
    },
    F: () => {
      rotate('z', 0.5, -1);
      moveList.push('F');
    },
    B: () => {
      rotate('z', -0.5, 1);
      moveList.push('B');
    },
    "U'": () => {
      rotate('y', 0.5, 1);
      moveList.push("U'");
    },
    "D'": () => {
      rotate('y', -0.5, -1);
      moveList.push("D'");
    },
    "R'": () => {
      rotate('x', 0.5, 1);
      moveList.push("R'");
    },
    "L'": () => {
      rotate('x', -0.5, -1);
      moveList.push("L'");
    },
    "F'": () => {
      rotate('z', 0.5, 1);
      moveList.push("F'");
    },
    "B'": () => {
      rotate('z', -0.5, -1);
      moveList.push("B'");
    },
  };

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
          moveMap[c as Moves]();
        }, index * 500);
      });
    console.log('here');
    if (moveList.length > 0) cube.move(Cube.inverse(moveList.join(' ')));
  }

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
          <div style={{ position: 'absolute', top: '0', width: '100%' }}>
            <Navbar solve={solve} />
          </div>

          <Palette />
          <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
            <Controls moveMap={moveMap} />
          </div>
        </ContextProviders>
      </Html>
      <group ref={rotationGroupRef} />
      <group ref={cubeGroupRef}>
        {initRubikPieces.map((cube, index) => (
          <RubikPiece
            pieces={cubeGroupRef.current?.children}
            id={index}
            position={cube.position}
            pieceSize={pieceSize}
            spacing={pieceSpacing}
            key={index}
            sides={cube.sides}
          />
        ))}
      </group>
    </>
  );
};
