import { Button } from '../../ui';
import classes from './Navbar.module.css';

interface Props {
  solve: () => void;
  isDisabled?: boolean;
}

export const Navbar = ({ solve, isDisabled = false }: Props) => {
  return (
    <div className={classes.container}>
      <div className={classes.navbar}>
        <Button onClick={solve} disabled={isDisabled}>
          solve
        </Button>
      </div>
    </div>
  );
};
