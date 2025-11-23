import { Canvas } from '@react-three/fiber';

import { Rubik } from '@/components';
import { ColoringContextProvider } from '@/context';
import { canvasId } from './canvasId';
import classes from './Scene.module.css';

export function Scene() {
  return (
    <div className={classes.scene}>
      <Canvas id={canvasId} className={classes.canvas}>
        <ColoringContextProvider>
          <Rubik />
        </ColoringContextProvider>
      </Canvas>
    </div>
  );
}
