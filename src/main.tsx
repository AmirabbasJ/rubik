import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ColorProvider } from './Context/ColorContext';
import { Scene } from './Scene.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorProvider>
      <Scene />
    </ColorProvider>
  </StrictMode>
);
