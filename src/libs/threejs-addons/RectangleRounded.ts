import { BufferAttribute, BufferGeometry } from 'three';

//NOTE credit: https://discourse.threejs.org/t/roundedrectangle-squircle/28645
export function RectangleRounded(
  w: number,
  h: number,
  r: number,
  s: number
): BufferGeometry {
  const pi2 = Math.PI * 2;
  const n = (s + 1) * 4;
  const indices: number[] = [];
  const positions: number[] = [];
  const uvs: number[] = [];
  let qu: number, sgx: number, sgy: number, x: number, y: number;

  positions.push(0, 0, 0);
  uvs.push(0.5, 0.5);

  for (let j = 0; j < n; j++) {
    qu = Math.trunc((4 * j) / n) + 1;
    sgx = qu === 1 || qu === 4 ? 1 : -1;
    sgy = qu < 3 ? 1 : -1;
    x = sgx * (w / 2 - r) + r * Math.cos((pi2 * (j - qu + 1)) / (n - 4));
    y = sgy * (h / 2 - r) + r * Math.sin((pi2 * (j - qu + 1)) / (n - 4));

    positions.push(x, y, 0);
    uvs.push(0.5 + x / w, 0.5 + y / h);
  }

  for (let j = 1; j <= n; j++) {
    const a = 0;
    const b = j;
    const c = j === n ? 1 : j + 1;
    indices.push(a, b, c);
  }

  const geometry = new BufferGeometry();
  geometry.setIndex(new BufferAttribute(new Uint32Array(indices), 1));
  geometry.setAttribute(
    'position',
    new BufferAttribute(new Float32Array(positions), 3)
  );
  geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));

  return geometry;
}
