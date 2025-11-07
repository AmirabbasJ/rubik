import type { Rubik } from '../domain/Rubik';

const pieceColors = {
  red: '#EF476F',
  orange: '#F78C6B',
  yellow: '#FFD166',
  green: '#06D6A0',
  blue: '#118AB2',
  white: '#FFFFFF',
  black: '#000000',
};

export const RubikPieces: Rubik = [
  {
    position: { x: 0, y: 0, z: 0 },
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
    position: { x: 0, y: 1, z: 0 },
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
    position: { x: 0, y: -1, z: 0 },
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
    position: { x: 1, y: 0, z: 0 },
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
    position: { x: -1, y: 0, z: 0 },
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
    position: { x: 0, y: 0, z: 1 },
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
    position: { x: 0, y: 0, z: -1 },
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
    position: { x: 1, y: 1, z: 0 },
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
    position: { x: -1, y: 1, z: 0 },
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
    position: { x: 1, y: -1, z: 0 },
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
    position: { x: -1, y: -1, z: 0 },
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
    position: { x: 0, y: 1, z: 1 },
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
    position: { x: 0, y: 1, z: -1 },
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
    position: { x: 0, y: -1, z: 1 },
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
    position: { x: 0, y: -1, z: -1 },
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
    position: { x: 1, y: 0, z: 1 },
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
    position: { x: -1, y: 0, z: 1 },
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
    position: { x: 1, y: 0, z: -1 },
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
    position: { x: -1, y: 0, z: -1 },
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
    position: { x: 1, y: 1, z: 1 },
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
    position: { x: -1, y: 1, z: 1 },
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
    position: { x: 1, y: -1, z: 1 },
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
    position: { x: -1, y: -1, z: 1 },
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
    position: { x: 1, y: 1, z: -1 },
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
    position: { x: -1, y: 1, z: -1 },
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
    position: { x: 1, y: -1, z: -1 },
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
    position: { x: -1, y: -1, z: -1 },
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
