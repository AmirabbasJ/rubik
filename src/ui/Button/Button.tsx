import clsx from 'clsx';
import React, { type ReactNode } from 'react';
import classes from './Button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
  square?: boolean;
  circle?: boolean;
}

export function Button({
  children,
  disabled = false,
  square = false,
  circle = false,
  className,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        classes.button,
        { [classes.squared]: square, [classes.circle]: circle },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
