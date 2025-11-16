import { Button } from '../../ui';
import { Palette } from '../Palette/Palette';
import classes from './Navbar.module.css';

interface Props {
  solve: () => void;
  isDisabled?: boolean;
}

export const Navbar = ({ solve, isDisabled = false }: Props) => {
  return (
    <div className={classes.container}>
      <div className={classes.navbar}>
        <Palette isDisabled={isDisabled} />
        <Button onClick={solve} disabled={isDisabled}>
          solve
        </Button>
      </div>
    </div>
  );
};
