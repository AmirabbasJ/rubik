/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame, useThree } from '@react-three/fiber';
import { useGesture } from '@use-gesture/react';
import { easing } from 'maath';
import * as React from 'react';
import { Group, MathUtils } from 'three';

export type PresentationControlProps = {
  snap?: boolean | number;
  global?: boolean;
  cursor?: boolean;
  speed?: number;
  zoom?: number;
  rotation?: [number, number, number];
  polar?: [number, number];
  azimuth?: [number, number];
  damping?: number;
  enabled?: boolean;
  children?: React.ReactNode;
  domElement?: HTMLElement;
};

export function PresentationControlsNoInverse({
  enabled = true,
  snap,
  global,
  domElement,
  cursor = true,
  children,
  speed = 1,
  rotation = [0, 0, 0],
  zoom = 1,
  polar = [0, Math.PI / 2],
  azimuth = [-Infinity, Infinity],
  damping = 0.25,
}: PresentationControlProps) {
  const events = useThree((state) => state.events);
  const gl = useThree((state) => state.gl);
  const explDomElement = domElement || events.connected || gl.domElement;

  const { size } = useThree();

  const rPolar = React.useMemo(
    () => [rotation[0] + polar[0], rotation[0] + polar[1]],
    [rotation[0], polar[0], polar[1]]
  ) as [number, number];

  const rAzimuth = React.useMemo(
    () => [rotation[1] + azimuth[0], rotation[1] + azimuth[1]],
    [rotation[1], azimuth[0], azimuth[1]]
  ) as [number, number];

  const rInitial = React.useMemo(
    () => [
      MathUtils.clamp(rotation[0], ...rPolar),
      MathUtils.clamp(rotation[1], ...rAzimuth),
      rotation[2],
    ],
    [rotation[0], rotation[1], rotation[2], rPolar, rAzimuth]
  );

  React.useEffect(() => {
    if (global && cursor && enabled) {
      explDomElement.style.cursor = 'grab';
      gl.domElement.style.cursor = '';
      return () => {
        explDomElement.style.cursor = 'default';
        gl.domElement.style.cursor = 'default';
      };
    }
  }, [global, cursor, explDomElement, enabled]);

  const [animation] = React.useState({
    scale: 1,
    rotation: rInitial,
    damping,
  });

  const ref = React.useRef<Group>(null!);
  useFrame((_, delta) => {
    easing.damp3(ref.current.scale, animation.scale, animation.damping, delta);
    easing.dampE(
      ref.current.rotation,
      animation.rotation as any,
      animation.damping,
      delta
    );
  });

  const bind = useGesture(
    {
      onHover: ({ last }) => {
        if (cursor && !global && enabled) {
          explDomElement.style.cursor = last ? 'auto' : 'grab';
        }
      },
      onDrag: ({
        down,
        delta: [dx, dy],
        memo: [oldPolar, oldAzimuth] = animation.rotation || rInitial,
      }) => {
        if (!enabled) return [oldPolar, oldAzimuth];

        if (cursor) explDomElement.style.cursor = down ? 'grabbing' : 'grab';

        // apply deltas
        let newPolar = oldPolar + (dy / size.height) * Math.PI * speed;

        // clamp polar
        newPolar = MathUtils.clamp(newPolar, ...rPolar);

        // *** FIX: flip azimuth when polar is past 90° ***
        const flip = Math.cos(newPolar) < 0 ? -1 : 1;

        let newAzimuth =
          oldAzimuth + flip * (dx / size.width) * Math.PI * speed;

        // clamp azimuth
        newAzimuth = MathUtils.clamp(newAzimuth, ...rAzimuth);

        animation.scale = down && newPolar > rPolar[1] / 2 ? zoom : 1;
        animation.rotation =
          snap && !down ? rInitial : [newPolar, newAzimuth, 0];
        animation.damping =
          snap && !down && typeof snap !== 'boolean'
            ? (snap as number)
            : damping;

        return [newPolar, newAzimuth];
      },
    },
    { target: global ? explDomElement : undefined }
  );

  return (
    <group ref={ref} {...(bind?.() as any)}>
      {children}
    </group>
  );
}
