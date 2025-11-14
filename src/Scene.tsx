import { OrbitControls, useContextBridge } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import classes from './App.module.css';
import { Rubik } from './components/Rubik';
import { ColorContext } from './Context/ColorContext';

export function Scene() {
  const ContextProviders = useContextBridge(ColorContext);
  return (
    <div id="canvas-container" className={classes.main}>
      <Canvas camera={{ position: [4, 4, 4], fov: 55 }}>
        <OrbitControls
          target={[0, 0, 0]}
          enableZoom={false}
          enablePan={false}
        />
        <ambientLight intensity={4} />
        <directionalLight position={[0, 0, 0]} />
        <ContextProviders>
          <Rubik />
        </ContextProviders>
      </Canvas>
    </div>
  );
}
