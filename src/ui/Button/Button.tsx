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
      className={`${classes.button} ${square ? classes.squared : ''} ${
        circle ? classes.circle : ''
      } ${className ?? ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
