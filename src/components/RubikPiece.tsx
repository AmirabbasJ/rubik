import type { Group, MeshBasicMaterial } from 'three';
import { BufferAttribute, BufferGeometry, type Mesh } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js';
import { useColoring } from '../Context/ColorContext';
import { type CubePiece, type Side } from '../domain/CubePiece';

export type PieceMesh = Mesh<RoundedBoxGeometry, MeshBasicMaterial>;
export type PiecesGroup = Group & {
  children: PieceMesh[];
};

type Props = CubePiece & { pieceSize: number; index: number };

function RectangleRounded(
  w: number,
  h: number,
  r: number,
  s: number
): BufferGeometry {
  // width, height, radiusCorner, smoothness
  const pi2 = Math.PI * 2;
  const n = (s + 1) * 4; // number of segments
  const indices: number[] = [];
  const positions: number[] = [];
  const uvs: number[] = [];
  let qu: number, sgx: number, sgy: number, x: number, y: number;

  // center vertex
  positions.push(0, 0, 0);
  uvs.push(0.5, 0.5);

  // build contour vertices
  for (let j = 0; j < n; j++) {
    qu = Math.trunc((4 * j) / n) + 1; // quadrant  qu: 1..4
    sgx = qu === 1 || qu === 4 ? 1 : -1; // signum left/right
    sgy = qu < 3 ? 1 : -1; // signum  top / bottom
    x = sgx * (w / 2 - r) + r * Math.cos((pi2 * (j - qu + 1)) / (n - 4)); // corner center + circle
    y = sgy * (h / 2 - r) + r * Math.sin((pi2 * (j - qu + 1)) / (n - 4));

    positions.push(x, y, 0);
    uvs.push(0.5 + x / w, 0.5 + y / h);
  }

  // indices (fan from center)
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

const planeOffset = 0.01; // avoid z-fighting
const planeScale = 0.9; // make planes slightly larger than base face
const radius = 0.1; // rounded corner radius
const smoothness = 3;
//   geometry={RectangleRoundedGeom(
//         pieceSize * planeScale,
//         pieceSize * planeScale,
//         radius,
//         smoothness
//       )}

export function RubikPiece({ position, sides, pieceSize, index }: Props) {
  const { selectedSide, sideToColorMap } = useColoring();

  const mapping = [
    [pieceSize / 2 + planeOffset, 0, 0],
    [-pieceSize / 2 - planeOffset, 0, 0],
    [0, pieceSize / 2 + planeOffset, 0],
    [0, -pieceSize / 2 - planeOffset, 0],
    [0, 0, pieceSize / 2 + planeOffset],
    [0, 0, -pieceSize / 2 - planeOffset],
  ];

  const rotations = [
    [0, Math.PI / 2, 0],
    [0, -Math.PI / 2, 0],
    [-Math.PI / 2, 0, 0],
    [Math.PI / 2, 0, 0],
    [0, 0, 0],
    [0, Math.PI, 0],
  ];

  return (
    <group
      name={String(index)}
      position={[
        position.x * pieceSize,
        position.y * pieceSize,
        position.z * pieceSize,
      ]}
    >
      <mesh
        geometry={
          new RoundedBoxGeometry(pieceSize, pieceSize, pieceSize, 16, 0.1)
        }
      >
        <meshBasicMaterial color="#000" />
      </mesh>

      {sides.map((indexedSide, index) => {
        const side =
          indexedSide === '-' ? indexedSide : (indexedSide[0] as Side);
        const name = indexedSide === '-' ? undefined : indexedSide;
        return (
          <mesh
            key={indexedSide + index}
            geometry={RectangleRounded(
              pieceSize * planeScale,
              pieceSize * planeScale,
              radius,
              smoothness
            )}
            position={mapping[index]}
            rotation={rotations[index]}
            onClick={(event) => {
              event.stopPropagation();
              const { face, object } = event;
              const piece = object as PieceMesh;
              if (!face || !selectedSide) return;

              const materialIndex = face.materialIndex;
              const clickedMaterial = piece.material;
              const index = clickedMaterial.name[1];

              clickedMaterial.name = `${selectedSide}${index}`;
              clickedMaterial.color.setStyle(sideToColorMap[selectedSide]);
            }}
          >
            <meshBasicMaterial
              name={name}
              // // roughness={1}
              key={index}
              color={sideToColorMap[side]}
            />
          </mesh>
        );
      })}
    </group>
  );
}
