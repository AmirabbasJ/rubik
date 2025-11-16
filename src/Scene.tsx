import { Canvas } from '@react-three/fiber';

import { canvasId } from './canvasId';
import { Rubik } from './components/Rubik/Rubik';
import { ColoringProvider } from './Context/ColorContext';
import classes from './Scene.module.css';

export function Scene() {
  return (
    <div className={classes.scene}>
      <Canvas id={canvasId} className={classes.canvas}>
        <ColoringProvider>
          <Rubik />
        </ColoringProvider>
      </Canvas>
    </div>
  );
}
