import classes from './Navbar.module.css';

interface Props {
  solve: () => void;
  isDisabled?: boolean;
}

export const Navbar = ({ solve, isDisabled = false }: Props) => {
  return (
    <div className={classes.container}>
      <div className={classes.navbar}>
        <button onClick={solve} disabled={isDisabled}>
          solve
        </button>
      </div>
    </div>
  );
};
