import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ColoringProvider } from './Context/ColorContext';
import { Scene } from './Scene';
import CubeJs from './libs/cubejs';
import './main.css';

CubeJs.initSolver();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColoringProvider>
      <Scene />
    </ColoringProvider>
  </StrictMode>
);
