import { useEffect, useRef, useState } from 'react';
import { canvasId } from '../../canvasId';
import { useColoring } from '../../Context/ColorContext';
import type { Side } from '../../domain/RubikPiece';
import { ChevronDownIcon, PaletteIcon } from '../../icons';
import { Button } from '../../ui';
import classes from './Palette.module.css';

export const Palette = ({ isDisabled = false }: { isDisabled?: boolean }) => {
  const { selectedSideRef, sideToColorMapRef } = useColoring();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Side | null>(
    selectedSideRef.current
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  const choose = (side: Side | null) => {
    if (isDisabled) return;

    selectedSideRef.current = side;
    if (side === selected || side === null) {
      document.getElementById(canvasId)!.classList.remove(classes.brushCursor);
      setSelected(null);
    } else {
      document.getElementById(canvasId)!.classList.add(classes.brushCursor);
      setSelected(side);
    }
  };

  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node) && !selected)
        setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !selected) setOpen(false);
    };

    document.addEventListener('mousedown', onOutsideClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [selected]);

  const colors = Object.entries(sideToColorMapRef.current).filter(
    ([s]) => s !== '-'
  );

  const toggle = () => {
    if (isDisabled) return;
    setOpen((v) => {
      if (v) choose(null);
      return !v;
    });
  };

  // TODO clsx
  return (
    <div
      ref={containerRef}
      className={classes.container}
      aria-haspopup="true"
      aria-expanded={open}
    >
      <Button
        square
        type="button"
        circle
        onClick={toggle}
        aria-label="Toggle color palette"
        disabled={isDisabled}
        className={classes.toggleButton}
      >
        <div className={`${classes.iconWrapper} ${open ? classes.open : ''}`}>
          <PaletteIcon color="#fff" width={24} height={24} />
        </div>
        <div
          className={`${classes.iconWrapper} ${classes.chevron} ${
            open ? classes.open : ''
          }`}
        >
          <ChevronDownIcon color="#fff" width={32} height={32} />
        </div>
      </Button>

      <div
        className={`${classes.menu} ${open ? classes.show : ''}`}
        role="menu"
        aria-hidden={!open}
      >
        {colors.map(([side, color], i) => {
          const delay = `${i * 35}ms`;
          return (
            <button
              key={side}
              type="button"
              role="menuitem"
              className={`${classes.item} ${
                selected === side ? classes.selected : ''
              }`}
              onClick={() => choose(side as Side)}
              style={{ background: color, transitionDelay: delay }}
              disabled={isDisabled}
              aria-pressed={selected === side}
              title={color}
            />
          );
        })}
      </div>
    </div>
  );
};
