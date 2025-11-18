import {
  Html,
  PresentationControls,
  useContextBridge,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import jeasings from 'jeasings';
import { useRef, useState } from 'react';
import { type Group } from 'three';
import { ColoringContext, useColoring } from '../../Context/ColorContext';
import { initialRubik } from '../../data/initialRubik';
import { solvedEncodedRubik } from '../../domain/encoder/encodedSolvedRubik';
import {
  encodeRubik,
  encodeRubikUnordered,
} from '../../domain/encoder/encodeRubik';
import { shuffleEncodedCenter } from '../../domain/encoder/shuffleEncodedCenter';
import { InvalidRubikError } from '../../domain/InvalidRubik';
import type { MoveWithDoubles } from '../../domain/Moves';
import type { Rubik } from '../../domain/Rubik';
import {
  orderedSides,
  type Side,
  type Sides,
  type VisibleSide,
} from '../../domain/RubikPiece';
import CubeJs from '../../libs/cubejs';
import { isAnimating } from '../../utils';
import { Controls } from '../Controls/Controls';
import { Navbar } from '../Navbar/Navbar';
import { moveToRotation, type Rotation } from './moveToRotation';
import { RubikPiece, type PieceMesh } from './RubikPiece';

const pieceSize = 0.75;
const initialRotation = { x: Math.PI / 5, y: Math.PI / 4 };

export function Rubik() {
  const ContextProviders = useContextBridge(ColoringContext);
  const { sideToColorMapRef } = useColoring();
  const [isMoving, setIsMoving] = useState(false);
  const [hasColorsChanged, setHasColorsChanged] = useState(false);
  const moveListRef = useRef<MoveWithDoubles[]>([]);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isSolved, setIsSolved] = useState(true);
  const currentRotatedSolvedRubikRef = useRef<Rubik>(
    JSON.parse(JSON.stringify(initialRubik))
  );
  const [resetKey, setResetKey] = useState(0);

  const rotationGroupRef = useRef<Group>(null as unknown as Group);

  const getPieceMeshes = () => {
    return cubeGroupRef.current.children
      .toSorted((meshA, meshB) => Number(meshA.name) - Number(meshB.name))
      .map((m) => m.children.slice(1)) as PieceMesh[][];
  };

  const cubeGroupRef = useRef<Group>(null as unknown as Group);

  function shuffle() {
    const randomCube = CubeJs.random();
    const encodedShuffle = shuffleEncodedCenter(randomCube.asString());
    console.log(encodedShuffle);

    const sideToColorMap = sideToColorMapRef.current;
    const nameShuffleMap = orderedSides
      .flatMap((c) =>
        Array(9)
          .fill(c)
          .map((c, i) => `${c}${i}`)
      )
      .map((v, i) => ({ [v]: `${encodedShuffle[i]}${v[1]}` }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const shuffledSides = initialRubik.map(({ sides: c }) =>
      c.map((m) => {
        if (m === '-') return '-';
        else return nameShuffleMap[m];
      })
    );

    getPieceMeshes().forEach((c, i) =>
      c.map((m, i2) => {
        const name = shuffledSides[i][i2];
        if (
          m.material.name !== '' &&
          m.material.name !== '-' &&
          m.material.name
        ) {
          const side = name[0] as Side;
          const color = sideToColorMap[side];
          m.material.name = name;
          m.material.color.setStyle(color);
        }
      })
    );
    checkRubikStatus();
    setIsSolved(false);
  }

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
  const checkRubikStatus = () => {
    const sides = getPieceMeshes().map(
      (ms) => ms.map((m) => m.material.name) as Sides
    );

    const { encoded: encodedRubik } = encodeRubik(sides) ?? {};
    if (encodedRubik == null) {
      setIsInvalid(true);
      setHasColorsChanged(true);
      return;
    }

    const cube = CubeJs.fromString(encodedRubik);
    if (moveListRef.current.length > 0)
      cube.move(moveListRef.current.join(' '));

    setIsSolved(cube.asString() === solvedEncodedRubik);
    setIsInvalid(false);
    const unorderedEncodedRubik = encodeRubikUnordered(sides);

    setHasColorsChanged(solvedEncodedRubik !== unorderedEncodedRubik);
  };

  function rotate(rotations: Rotation[], onComplete?: VoidFunction) {
    if (isAnimating()) return;

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
            setIsMoving(false);
            setIsSolved(true);
            resetCubeGroup();
            if (onComplete) onComplete();
          });
        }
        return animation;
      });

    first.start();
  }

  const move = (moves: MoveWithDoubles[], onComplete?: VoidFunction) => {
    if (isMoving || isAnimating()) return;

    const rotations = moves.map((moveName) => moveToRotation(moveName));
    rotate(rotations, onComplete);
  };

  const clientMove = (moves: MoveWithDoubles[]) => {
    if (isMoving || isAnimating()) return;

    //NOTE the moves lead to resetting solving the rubik
    const newList = moveListRef.current.concat(moves);
    const currentCube = new CubeJs();
    currentCube.move(newList.join(' '));
    if (currentCube.asString() === solvedEncodedRubik) moveListRef.current = [];
    else moveListRef.current = newList;

    move(moves, () => {
      checkRubikStatus();
    });
  };

  function solve() {
    if (isMoving || isSolved) return;

    const sides = getPieceMeshes().map(
      (ms) => ms.map((m) => m.material.name) as Sides
    );
    const {
      encoded: encodedRubik,
      swapMap,
      unorderedEncoded,
    } = encodeRubik(sides) ?? {};

    if (encodedRubik == null) {
      setIsInvalid(true);
      return;
    }

    setIsInvalid(false);
    const cube = CubeJs.fromString(encodedRubik);

    if (moveListRef.current.length > 0)
      cube.move(moveListRef.current.join(' '));

    setIsMoving(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        try {
          const solution = cube.solve();
          move(solution.split(' ') as MoveWithDoubles[], () => {
            moveListRef.current = [];
            console.log(currentRotatedSolvedRubikRef.current);
            const reverseSwap = Object.entries(swapMap).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [value]: key,
              }),
              {}
            );
            console.log(reverseSwap);

            //NOTE this key is to force three-js to re-initialize the rubik
            initialRubik
              .map((s) => s.sides)
              .forEach((sides, i) => {
                // const current = currentRotatedSolvedRubikRef.current[i];
                currentRotatedSolvedRubikRef.current[i].sides = sides.map(
                  (name) => {
                    if (name === '-') return '-';
                    const newSide = reverseSwap![name[0] as VisibleSide];
                    const newIndex = name[1];

                    const newName = `${newSide}${newIndex}`;
                    // console.log({ prev: name, new: newName });
                    return newName;
                  }
                ) as Sides;
              });
            console.log(
              currentRotatedSolvedRubikRef.current.map((s) => s.sides)
              // swapMap,
            );

            setResetKey((count) => count + 1);

            setHasColorsChanged(unorderedEncoded !== encodedRubik);
          });
        } catch (e) {
          const error = e as Error;
          if (error.name === InvalidRubikError.name) {
            setIsMoving(false);
            setIsInvalid(true);
          }
        }
      });
    });
  }

  function reset() {
    const sideToColorMap = sideToColorMapRef.current;
    const meshes = getPieceMeshes();

    initialRubik.map(({ sides }, index) => {
      meshes[index].forEach((m, i) => {
        const name = sides[i];
        const side = name[0] as Side;
        m.material.name = name === '-' ? '' : name;
        m.material.color.setStyle(sideToColorMap[side]);
      });
    });

    setIsInvalid(false);
    setHasColorsChanged(false);
  }

  return (
    <>
      <Html fullscreen>
        <ContextProviders>
          <Navbar
            shuffle={shuffle}
            isRubikInvalid={isInvalid}
            reset={reset}
            hasColorsChanged={hasColorsChanged}
            getPieceMeshes={getPieceMeshes}
            isSolved={isSolved}
            isSolving={isMoving}
            solve={solve}
          />
          <Controls disabled={isMoving} move={clientMove} />
        </ContextProviders>
      </Html>
      <group position={[0, 0.3, 0]}>
        <PresentationControls
          global
          speed={2}
          rotation={[initialRotation.x, initialRotation.y, 0]}
          polar={[
            -Math.PI / 2 - initialRotation.x,
            Math.PI / 2 - initialRotation.x,
          ]}
          azimuth={[-Infinity, Infinity]}
        >
          <group ref={rotationGroupRef} />
          <group ref={cubeGroupRef} key={resetKey}>
            {currentRotatedSolvedRubikRef.current.map((cube, index) => (
              <RubikPiece
                checkIsColored={checkRubikStatus}
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
}
