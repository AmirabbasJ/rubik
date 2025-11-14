import classes from './Navbar.module.css';

interface Props {
  solve: () => void;
}

export const Navbar = ({ solve }: Props) => {
  return (
    <div className={classes.navbar}>
      <button onClick={solve}>solve</button>
    </div>
  );
};
