import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ColoringProvider } from './Context/ColorContext';
import { Scene } from './Scene.tsx';
import Cube from './libs/cubejs';

Cube.initSolver();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColoringProvider>
      <Scene />
    </ColoringProvider>
  </StrictMode>
);
