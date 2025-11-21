import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import type { PerspectiveCamera } from 'three';

export function useResponsiveCamera() {
  const camera = useThree((state) => state.camera as PerspectiveCamera);
  const size = useThree((state) => state.size);

  useEffect(() => {
    const setFov = () => {
      const isMobile = window.matchMedia('(max-width: 640px)').matches;
      const targetFov = isMobile ? 90 : 75;
      if (!camera) return;
      if (camera.fov !== targetFov) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }
    };

    setFov();
    const mq = window.matchMedia('(max-width: 640px)');
    const handler = () => setFov();
    mq.addEventListener('change', handler);

    return () => {
      mq.removeEventListener('change', handler);
    };
  }, [camera, size]);
}
