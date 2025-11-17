import type { Rubik } from '../domain/Rubik';

export const initialRubik: Rubik = [
  { position: { x: 0, y: 0, z: 0 }, sides: ['-', '-', '-', '-', '-', '-'] },
  { position: { x: 0, y: 1, z: 0 }, sides: ['-', '-', 'U4', '-', '-', '-'] },
  {
    position: { x: 0, y: -1, z: 0 },
    sides: ['-', '-', '-', 'D4', '-', '-'],
  },
  { position: { x: 1, y: 0, z: 0 }, sides: ['R4', '-', '-', '-', '-', '-'] },
  {
    position: { x: -1, y: 0, z: 0 },
    sides: ['-', 'L4', '-', '-', '-', '-'],
  },
  { position: { x: 0, y: 0, z: 1 }, sides: ['-', '-', '-', '-', 'F4', '-'] },
  {
    position: { x: 0, y: 0, z: -1 },
    sides: ['-', '-', '-', '-', '-', 'B4'],
  },
  {
    position: { x: 1, y: 1, z: 0 },
    sides: ['R1', '-', 'U5', '-', '-', '-'],
  },
  {
    position: { x: -1, y: 1, z: 0 },
    sides: ['-', 'L1', 'U3', '-', '-', '-'],
  },
  {
    position: { x: 1, y: -1, z: 0 },
    sides: ['R7', '-', '-', 'D5', '-', '-'],
  },
  {
    position: { x: -1, y: -1, z: 0 },
    sides: ['-', 'L7', '-', 'D3', '-', '-'],
  },
  {
    position: { x: 0, y: 1, z: 1 },
    sides: ['-', '-', 'U7', '-', 'F1', '-'],
  },
  {
    position: { x: 0, y: 1, z: -1 },
    sides: ['-', '-', 'U1', '-', '-', 'B1'],
  },
  {
    position: { x: 0, y: -1, z: 1 },
    sides: ['-', '-', '-', 'D1', 'F7', '-'],
  },
  {
    position: { x: 0, y: -1, z: -1 },
    sides: ['-', '-', '-', 'D7', '-', 'B7'],
  },
  {
    position: { x: 1, y: 0, z: 1 },
    sides: ['R3', '-', '-', '-', 'F5', '-'],
  },
  {
    position: { x: -1, y: 0, z: 1 },
    sides: ['-', 'L5', '-', '-', 'F3', '-'],
  },
  {
    position: { x: 1, y: 0, z: -1 },
    sides: ['R5', '-', '-', '-', '-', 'B3'],
  },
  {
    position: { x: -1, y: 0, z: -1 },
    sides: ['-', 'L3', '-', '-', '-', 'B5'],
  },
  {
    position: { x: 1, y: 1, z: 1 },
    sides: ['R0', '-', 'U8', '-', 'F2', '-'],
  },
  {
    position: { x: -1, y: 1, z: 1 },
    sides: ['-', 'L2', 'U6', '-', 'F0', '-'],
  },
  {
    position: { x: 1, y: -1, z: 1 },
    sides: ['R6', '-', '-', 'D2', 'F8', '-'],
  },
  {
    position: { x: -1, y: -1, z: 1 },
    sides: ['-', 'L8', '-', 'D0', 'F6', '-'],
  },
  {
    position: { x: 1, y: 1, z: -1 },
    sides: ['R2', '-', 'U2', '-', '-', 'B0'],
  },
  {
    position: { x: -1, y: 1, z: -1 },
    sides: ['-', 'L0', 'U0', '-', '-', 'B2'],
  },
  {
    position: { x: 1, y: -1, z: -1 },
    sides: ['R8', '-', '-', 'D8', '-', 'B6'],
  },
  {
    position: { x: -1, y: -1, z: -1 },
    sides: ['-', 'L6', '-', 'D6', '-', 'B8'],
  },
];
