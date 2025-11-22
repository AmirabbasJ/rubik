import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ColoringProvider } from './Context/ColorContext';
import { Scene } from './Scene';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColoringProvider>
      <Scene />
    </ColoringProvider>
  </StrictMode>
);
