import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import classes from './App.module.css';
import { Rubik } from './components/Rubik';

export function App() {
  return (
    <div id="canvas-container" className={classes.main}>
      <Canvas>
        <OrbitControls target={[0, 0, 0]} />
        <ambientLight intensity={2} />
        <directionalLight position={[0, 0, 0]} />
        <Rubik />
      </Canvas>
    </div>
  );
}
