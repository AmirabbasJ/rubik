import { useColoring } from '../../Context/ColorContext';
import { initialRubikPieces } from '../../data/Rubik';
import type { Side } from '../../domain/RubikPiece';
import { Button } from '../../ui';
import { Palette } from '../Palette/Palette';
import type { PieceMesh } from '../Rubik/RubikPiece';
import classes from './Navbar.module.css';

interface Props {
  solve: () => void;
  isDisabled?: boolean;
  getPieceMeshes: () => PieceMesh[][];
  hasChangedColor: boolean;
}

export const Navbar = ({
  solve,
  isDisabled = false,
  getPieceMeshes,
  hasChangedColor,
}: Props) => {
  const { sideToColorMapRef } = useColoring();

  function reset() {
    const sideToColorMap = sideToColorMapRef.current;
    const meshes = getPieceMeshes();

    initialRubikPieces
      .map(({ sides }) => sides)
      .map((sides, index) => {
        meshes[index].forEach((m, i) => {
          const name = sides[i];
          const side = name[0] as Side;
          m.material.name = name === '-' ? '' : name;
          m.material.color.setStyle(sideToColorMap[side]);
        });
      });
  }

  return (
    <div className={classes.container}>
      <div className={classes.navbar}>
        <Palette isDisabled={isDisabled} />
        <div className={classes.row}>
          <Button disabled={!hasChangedColor} onClick={reset}>
            RESET
          </Button>
          <Button onClick={solve} disabled={isDisabled}>
            SOLVE
          </Button>
        </div>
      </div>
    </div>
  );
};
