import { ColoringProvider } from '@/context';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Scene } from './Scene';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColoringProvider>
      <Scene />
    </ColoringProvider>
  </StrictMode>
);
