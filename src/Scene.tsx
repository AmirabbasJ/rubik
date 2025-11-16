import { Canvas } from '@react-three/fiber';

import { Rubik } from './components/Rubik';
import { ColoringProvider } from './Context/ColorContext';
import classes from './Scene.module.css';

export function Scene() {
  return (
    <div className={classes.canvasContainer}>
      <Canvas
        style={{ transform: 'translateY(calc(-1 * var(--bottom-spacing)))' }}
      >
        <ColoringProvider>
          <Rubik />
        </ColoringProvider>
      </Canvas>
    </div>
  );
}
