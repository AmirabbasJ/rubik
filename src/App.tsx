import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { useRef } from 'react';
import { Mesh } from 'three';
import classes from './App.module.css';

const size = 0.75;
const cubeSize = size + 0.03;

function Cube({ position = [0, 0, 0], colors }: Cube) {
  const mesh = useRef<Mesh>(null as any as Mesh);

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry attach="geometry" args={[size, size, size]} />
      {colors.map((color, index) => (
        <meshBasicMaterial
          key={index}
          attach={`material-${index}`}
          color={color}
        />
      ))}
    </mesh>
  );
}

interface Cube {
  position: [number, number, number];
  colors: [string, string, string, string, string, string];
}

const cubeColors = {
  red: '#EF476F', // rose red
  orange: '#F78C6B', // warm soft orange
  yellow: '#FFD166', // gentle golden yellow
  green: '#06D6A0', // soft turquoise green
  blue: '#118AB2', // calm blue
  white: '#FFFFFF', // bright neutral white
  black: '#000000', // for hidden sides
};

const cubeConfigurations: Cube[] = [
  {
    position: [0, 0, 0],
    colors: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
  },

  // Centers
  {
    position: [0, cubeSize, 0],
    colors: ['#000000', '#000000', '#FFD166', '#000000', '#000000', '#000000'],
  },
  {
    position: [0, -cubeSize, 0],
    colors: ['#000000', '#000000', '#000000', '#118AB2', '#000000', '#000000'],
  },
  {
    position: [cubeSize, 0, 0],
    colors: ['#06D6A0', '#000000', '#000000', '#000000', '#000000', '#000000'],
  },
  {
    position: [-cubeSize, 0, 0],
    colors: ['#000000', '#EF476F', '#000000', '#000000', '#000000', '#000000'],
  },
  {
    position: [0, 0, cubeSize],
    colors: ['#000000', '#000000', '#000000', '#000000', '#FFFFFF', '#000000'],
  },
  {
    position: [0, 0, -cubeSize],
    colors: ['#000000', '#000000', '#000000', '#000000', '#000000', '#F78C6B'],
  },

  // Edges
  {
    position: [cubeSize, cubeSize, 0],
    colors: ['#06D6A0', '#000000', '#FFD166', '#000000', '#000000', '#000000'],
  },
  {
    position: [-cubeSize, cubeSize, 0],
    colors: ['#000000', '#EF476F', '#FFD166', '#000000', '#000000', '#000000'],
  },
  {
    position: [cubeSize, -cubeSize, 0],
    colors: ['#06D6A0', '#000000', '#000000', '#118AB2', '#000000', '#000000'],
  },
  {
    position: [-cubeSize, -cubeSize, 0],
    colors: ['#000000', '#EF476F', '#000000', '#118AB2', '#000000', '#000000'],
  },
  {
    position: [0, cubeSize, cubeSize],
    colors: ['#000000', '#000000', '#FFD166', '#000000', '#FFFFFF', '#000000'],
  },
  {
    position: [0, cubeSize, -cubeSize],
    colors: ['#000000', '#000000', '#FFD166', '#000000', '#000000', '#F78C6B'],
  },
  {
    position: [0, -cubeSize, cubeSize],
    colors: ['#000000', '#000000', '#000000', '#118AB2', '#FFFFFF', '#000000'],
  },
  {
    position: [0, -cubeSize, -cubeSize],
    colors: ['#000000', '#000000', '#000000', '#118AB2', '#000000', '#F78C6B'],
  },

  // Corners
  {
    position: [cubeSize, 0, cubeSize],
    colors: ['#06D6A0', '#000000', '#000000', '#000000', '#FFFFFF', '#000000'],
  },
  {
    position: [-cubeSize, 0, cubeSize],
    colors: ['#000000', '#EF476F', '#000000', '#000000', '#FFFFFF', '#000000'],
  },
  {
    position: [cubeSize, 0, -cubeSize],
    colors: ['#06D6A0', '#000000', '#000000', '#000000', '#000000', '#F78C6B'],
  },
  {
    position: [-cubeSize, 0, -cubeSize],
    colors: ['#000000', '#EF476F', '#000000', '#000000', '#000000', '#F78C6B'],
  },
  {
    position: [cubeSize, cubeSize, cubeSize],
    colors: ['#06D6A0', '#000000', '#FFD166', '#000000', '#FFFFFF', '#000000'],
  },
  {
    position: [-cubeSize, cubeSize, cubeSize],
    colors: ['#000000', '#EF476F', '#FFD166', '#000000', '#FFFFFF', '#000000'],
  },
  {
    position: [cubeSize, -cubeSize, cubeSize],
    colors: ['#06D6A0', '#000000', '#000000', '#118AB2', '#FFFFFF', '#000000'],
  },
  {
    position: [-cubeSize, -cubeSize, cubeSize],
    colors: ['#000000', '#EF476F', '#000000', '#118AB2', '#FFFFFF', '#000000'],
  },
  {
    position: [cubeSize, cubeSize, -cubeSize],
    colors: ['#06D6A0', '#000000', '#FFD166', '#000000', '#000000', '#F78C6B'],
  },
  {
    position: [-cubeSize, cubeSize, -cubeSize],
    colors: ['#000000', '#EF476F', '#FFD166', '#000000', '#000000', '#F78C6B'],
  },
  {
    position: [cubeSize, -cubeSize, -cubeSize],
    colors: ['#06D6A0', '#000000', '#000000', '#118AB2', '#000000', '#F78C6B'],
  },
  {
    position: [-cubeSize, -cubeSize, -cubeSize],
    colors: ['#000000', '#EF476F', '#000000', '#118AB2', '#000000', '#F78C6B'],
  },
];

export function App() {
  return (
    <div id="canvas-container" className={classes.main}>
      <Canvas>
        <OrbitControls target={[0, 0, 0]} />
        <ambientLight intensity={2} />
        <directionalLight position={[0, 0, 0]} />

        {cubeConfigurations.map((cube, index) => (
          <Cube key={index} position={cube.position} colors={cube.colors} />
        ))}
      </Canvas>
    </div>
  );
}
