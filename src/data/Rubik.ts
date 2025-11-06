import type { CubePiece } from '../domain/CubePiece';

export const pieceSize = 0.75;
export const pieceSpacing = pieceSize + 0.03;

const pieceColors = {
  red: '#EF476F',
  orange: '#F78C6B',
  yellow: '#FFD166',
  green: '#06D6A0',
  blue: '#118AB2',
  white: '#FFFFFF',
  black: '#000000',
};

export const RubikPieces: CubePiece[] = [
  {
    position: [0, 0, 0],
    colors: [
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
    ],
  },

  // Centers
  {
    position: [0, pieceSpacing, 0],
    colors: [
      pieceColors.black,
      pieceColors.black,
      pieceColors.yellow,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
    ],
  },
  {
    position: [0, -pieceSpacing, 0],
    colors: [
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.blue,
      pieceColors.black,
      pieceColors.black,
    ],
  },
  {
    position: [pieceSpacing, 0, 0],
    colors: [
      pieceColors.green,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
    ],
  },
  {
    position: [-pieceSpacing, 0, 0],
    colors: [
      pieceColors.black,
      pieceColors.red,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
    ],
  },
  {
    position: [0, 0, pieceSpacing],
    colors: [
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.white,
      pieceColors.black,
    ],
  },
  {
    position: [0, 0, -pieceSpacing],
    colors: [
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.orange,
    ],
  },

  // Edges
  {
    position: [pieceSpacing, pieceSpacing, 0],
    colors: [
      pieceColors.green,
      pieceColors.black,
      pieceColors.yellow,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
    ],
  },
  {
    position: [-pieceSpacing, pieceSpacing, 0],
    colors: [
      pieceColors.black,
      pieceColors.red,
      pieceColors.yellow,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
    ],
  },
  {
    position: [pieceSpacing, -pieceSpacing, 0],
    colors: [
      pieceColors.green,
      pieceColors.black,
      pieceColors.black,
      pieceColors.blue,
      pieceColors.black,
      pieceColors.black,
    ],
  },
  {
    position: [-pieceSpacing, -pieceSpacing, 0],
    colors: [
      pieceColors.black,
      pieceColors.red,
      pieceColors.black,
      pieceColors.blue,
      pieceColors.black,
      pieceColors.black,
    ],
  },
  {
    position: [0, pieceSpacing, pieceSpacing],
    colors: [
      pieceColors.black,
      pieceColors.black,
      pieceColors.yellow,
      pieceColors.black,
      pieceColors.white,
      pieceColors.black,
    ],
  },
  {
    position: [0, pieceSpacing, -pieceSpacing],
    colors: [
      pieceColors.black,
      pieceColors.black,
      pieceColors.yellow,
      pieceColors.black,
      pieceColors.black,
      pieceColors.orange,
    ],
  },
  {
    position: [0, -pieceSpacing, pieceSpacing],
    colors: [
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.blue,
      pieceColors.white,
      pieceColors.black,
    ],
  },
  {
    position: [0, -pieceSpacing, -pieceSpacing],
    colors: [
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.blue,
      pieceColors.black,
      pieceColors.orange,
    ],
  },

  // Corners
  {
    position: [pieceSpacing, 0, pieceSpacing],
    colors: [
      pieceColors.green,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.white,
      pieceColors.black,
    ],
  },
  {
    position: [-pieceSpacing, 0, pieceSpacing],
    colors: [
      pieceColors.black,
      pieceColors.red,
      pieceColors.black,
      pieceColors.black,
      pieceColors.white,
      pieceColors.black,
    ],
  },
  {
    position: [pieceSpacing, 0, -pieceSpacing],
    colors: [
      pieceColors.green,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.orange,
    ],
  },
  {
    position: [-pieceSpacing, 0, -pieceSpacing],
    colors: [
      pieceColors.black,
      pieceColors.red,
      pieceColors.black,
      pieceColors.black,
      pieceColors.black,
      pieceColors.orange,
    ],
  },
  {
    position: [pieceSpacing, pieceSpacing, pieceSpacing],
    colors: [
      pieceColors.green,
      pieceColors.black,
      pieceColors.yellow,
      pieceColors.black,
      pieceColors.white,
      pieceColors.black,
    ],
  },
  {
    position: [-pieceSpacing, pieceSpacing, pieceSpacing],
    colors: [
      pieceColors.black,
      pieceColors.red,
      pieceColors.yellow,
      pieceColors.black,
      pieceColors.white,
      pieceColors.black,
    ],
  },
  {
    position: [pieceSpacing, -pieceSpacing, pieceSpacing],
    colors: [
      pieceColors.green,
      pieceColors.black,
      pieceColors.black,
      pieceColors.blue,
      pieceColors.white,
      pieceColors.black,
    ],
  },
  {
    position: [-pieceSpacing, -pieceSpacing, pieceSpacing],
    colors: [
      pieceColors.black,
      pieceColors.red,
      pieceColors.black,
      pieceColors.blue,
      pieceColors.white,
      pieceColors.black,
    ],
  },
  {
    position: [pieceSpacing, pieceSpacing, -pieceSpacing],
    colors: [
      pieceColors.green,
      pieceColors.black,
      pieceColors.yellow,
      pieceColors.black,
      pieceColors.black,
      pieceColors.orange,
    ],
  },
  {
    position: [-pieceSpacing, pieceSpacing, -pieceSpacing],
    colors: [
      pieceColors.black,
      pieceColors.red,
      pieceColors.yellow,
      pieceColors.black,
      pieceColors.black,
      pieceColors.orange,
    ],
  },
  {
    position: [pieceSpacing, -pieceSpacing, -pieceSpacing],
    colors: [
      pieceColors.green,
      pieceColors.black,
      pieceColors.black,
      pieceColors.blue,
      pieceColors.black,
      pieceColors.orange,
    ],
  },
  {
    position: [-pieceSpacing, -pieceSpacing, -pieceSpacing],
    colors: [
      pieceColors.black,
      pieceColors.red,
      pieceColors.black,
      pieceColors.blue,
      pieceColors.black,
      pieceColors.orange,
    ],
  },
];
