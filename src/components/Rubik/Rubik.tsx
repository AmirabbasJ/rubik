import { Html, useContextBridge } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import clsx from 'clsx';
import jeasings from 'jeasings';
import { useCallback, useRef, useState } from 'react';
import { type Group } from 'three';
import { ColoringContext, useColoring } from '../../Context/ColorContext';
import { initialRubik } from '../../data/initialRubik';
import { solvedEncodedRubik } from '../../domain/encoder/encodedSolvedRubik';
import { encodeRubik } from '../../domain/encoder/encodeRubik';
import { getShuffledRubik } from '../../domain/getShuffledRubik';
import { InvalidRubikError } from '../../domain/InvalidRubik';
import type { MoveWithDoubles } from '../../domain/Moves';
import type { Rubik } from '../../domain/Rubik';
import {
  type Side,
  type Sides,
  type VisibleSide,
} from '../../domain/RubikPiece';
import { useRubikAudio } from '../../hooks/useRubikAudio';
import CubeJs from '../../libs/cubejs';
import { CustomPresentationControls } from '../../libs/threejs-addons/CustomPresentationControls';
import {
  deepCopy,
  doubleRequestAnimationFrame,
  inverseObject,
  isAnimating,
} from '../../utils';
import { Controls } from '../Controls/Controls';
import { InfoModal } from '../InfoModal/InfoModal';
import { Navbar } from '../Navbar/Navbar';
import { moveToRotation, type Rotation } from './moveToRotation';
import classes from './Rubik.module.css';
import { RubikPiece, type PieceMesh } from './RubikPiece';

const initialRubikCopy = deepCopy(initialRubik);

const pieceSize = 0.75;
const initialRotation = { y: Math.PI / 5, x: -Math.PI / 4 };

export function Rubik() {
  const ContextProviders = useContextBridge(ColoringContext);
  const { sideToColorMapRef } = useColoring();
  const [isMoving, setIsMoving] = useState(false);
  const [hasColorsChanged, setHasColorsChanged] = useState(false);
  const moveListRef = useRef<MoveWithDoubles[]>([]);
  const [currentSolution, setCurrentSolution] = useState<string | null>(null);
  const [currentSolutionStepIndex, setCurrentSolutionStepIndex] = useState<
    number | null
  >(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isSolved, setIsSolved] = useState(true);
  const currentRotatedSolvedRubikRef = useRef<Rubik>(initialRubikCopy);
  const [resetKey, setResetKey] = useState(0);
  const { isMuted, playRotationAudio, toggleMute } = useRubikAudio();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const rotationGroupRef = useRef<Group>(null as unknown as Group);
  const cubeGroupRef = useRef<Group>(null as unknown as Group);

  useFrame(() => {
    jeasings.update();
  });

  const removeSolutionSteps = useCallback(() => {
    setCurrentSolution(null);
    setCurrentSolutionStepIndex(null);
  }, []);

  const getPieceMeshes = () => {
    return cubeGroupRef.current.children
      .toSorted((meshA, meshB) => Number(meshA.name) - Number(meshB.name))
      .map((m) => m.children.slice(1)) as PieceMesh[][];
  };

  const getSides = () => {
    const sides = getPieceMeshes().map(
      (ms) => ms.map((m) => m.material.name) as Sides
    );
    return sides;
  };

  function shuffle() {
    removeSolutionSteps();

    const shuffledSides = getShuffledRubik();
    const sideToColorMap = sideToColorMapRef.current;

    getPieceMeshes().forEach((c, index) =>
      c.forEach((m, innerIndex) => {
        if (m.material.name === '-') return;

        const name = shuffledSides[index][innerIndex];
        const side = name[0] as Side;
        const color = sideToColorMap[side];
        m.material.name = name;
        m.material.color.setStyle(color);
      })
    );
    checkRubikStatus();
    setIsSolved(false);
  }

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
        250 * (Math.abs(multiplier) + (Math.abs(multiplier) - 1) * 0.1)
      )
      .easing(jeasings.Cubic.InOut);
  }

  const checkRubikStatus = useCallback(() => {
    const sides = getSides();

    const { encoded: encodedRubik, unorderedEncoded: unorderedEncodedRubik } =
      encodeRubik(sides) ?? {};

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
    setHasColorsChanged(solvedEncodedRubik !== unorderedEncodedRubik);
  }, []);

  function rotate(
    rotations: Rotation[],
    onComplete?: VoidFunction,
    onEach?: (index: number) => void
  ) {
    if (isAnimating()) return;

    resetCubeGroup();
    attachToRotationGroup(rotations[0]);
    const [first] = rotations
      .map((rotation) => ({
        animation: getRotationAnimationEasing(rotation),
        rotation,
      }))
      .map(({ animation, rotation }, index, mappedRotations) => {
        const next = mappedRotations[index + 1];
        if (next) {
          animation.onComplete(() => {
            resetCubeGroup();
            playRotationAudio(Math.abs(rotation.multiplier));
            // WRONG not everytime
            onEach?.(index);
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
    playRotationAudio(Math.abs(rotations[0].multiplier));
    first.start();
  }

  const move = (
    moves: MoveWithDoubles[],
    onComplete?: VoidFunction,
    onEach?: (index: number) => void
  ) => {
    if (isMoving || isAnimating()) return;
    const rotations = moves.map((moveName) => moveToRotation(moveName));
    rotate(rotations, onComplete, onEach);
  };

  const clientMove = (moves: MoveWithDoubles[]) => {
    if (isMoving || isAnimating()) return;

    removeSolutionSteps();
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

    const sides = getSides();

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

    doubleRequestAnimationFrame(() => {
      try {
        //TODO re-write this with try-catch
        const solution = cube.solve();
        setCurrentSolution(solution);
        setCurrentSolutionStepIndex(0);
        move(
          solution.split(' ') as MoveWithDoubles[],
          () => {
            moveListRef.current = [];
            const sideSwapInverseMap = inverseObject(swapMap!);

            initialRubik
              .map((s) => s.sides)
              .forEach((sides, i) => {
                const newSides = sides.map((name) => {
                  if (name === '-') return '-';
                  const newSide = sideSwapInverseMap![name[0] as VisibleSide];
                  const newIndex = name[1];
                  const newName = `${newSide}${newIndex}`;
                  return newName;
                }) as Sides;
                currentRotatedSolvedRubikRef.current[i].sides = newSides;
              });

            setResetKey((count) => count + 1);
            //TODO maybe we need to remove this since it's checked in `checkRubikStatus`
            setHasColorsChanged(unorderedEncoded !== encodedRubik);
          },
          (index) => {
            setCurrentSolutionStepIndex(index + 1);
          }
        );
      } catch (e) {
        const error = e as Error;
        if (error.name === InvalidRubikError.name) {
          setIsMoving(false);
          setIsInvalid(true);
        }
      }
    });
  }

  function gotoSolutionMove(index: number) {
    if (!currentSolution || currentSolutionStepIndex == null) return;
    const solutionArray = currentSolution.split(' ');

    if (currentSolutionStepIndex > index) {
      const moves = solutionArray.slice(index, currentSolutionStepIndex);
      const inverse = CubeJs.inverse(moves.join(' '));
      setCurrentSolutionStepIndex(currentSolutionStepIndex - 1);
      move(inverse.split(' ') as MoveWithDoubles[], undefined, () => {
        setCurrentSolutionStepIndex((i) => i! - 1);
      });
    } else {
      const moves = solutionArray.slice(currentSolutionStepIndex, index);
      setCurrentSolutionStepIndex(currentSolutionStepIndex + 1);
      move(moves as MoveWithDoubles[], undefined, () => {
        setCurrentSolutionStepIndex((i) => i! + 1);
      });
    }
  }

  function reset() {
    removeSolutionSteps();
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

    //TODO maybe we need to remove this since it's checked in `checkRubikStatus`
    setIsInvalid(false);
    setHasColorsChanged(false);
  }

  return (
    <>
      <Html fullscreen className={clsx({ [classes.html]: isInfoOpen })}>
        <ContextProviders>
          <Navbar
            setIsInfoOpen={setIsInfoOpen}
            isMuted={isMuted}
            toggleMute={toggleMute}
            shuffle={shuffle}
            isRubikInvalid={isInvalid}
            reset={reset}
            hasColorsChanged={hasColorsChanged}
            getPieceMeshes={getPieceMeshes}
            isSolved={isSolved}
            isSolving={isMoving}
            solve={solve}
          />
          <Controls
            gotoSolutionMove={gotoSolutionMove}
            solutionIndex={currentSolutionStepIndex}
            solution={currentSolution}
            isMoving={isMoving}
            move={clientMove}
          />
          <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
        </ContextProviders>
      </Html>
      <group position={[0, 0.3, 0]}>
        <CustomPresentationControls
          global
          enabled={!isInfoOpen}
          speed={2}
          rotation={[initialRotation.y, initialRotation.x, 0]}
          polar={[-Infinity - initialRotation.y, Infinity - initialRotation.y]}
          azimuth={[-Infinity, Infinity]}
        >
          <group ref={rotationGroupRef} />
          <group ref={cubeGroupRef} key={resetKey}>
            {currentRotatedSolvedRubikRef.current.map((cube, index) => (
              <RubikPiece
                removeSolutionSteps={removeSolutionSteps}
                checkIsColored={checkRubikStatus}
                index={index}
                key={index}
                position={cube.position}
                sides={cube.sides}
                pieceSize={pieceSize}
              />
            ))}
          </group>
        </CustomPresentationControls>
      </group>
    </>
  );
}
