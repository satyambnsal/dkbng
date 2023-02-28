import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  className?: string;
  primary?: boolean;
  onClick: () => void;
};

export function Button({
  className,
  primary,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
  const classes = clsx(
    'flex items-center justify-center rounded-md border border-transparent bg-rose-800 py-3 px-4 text-base font-medium text-white hover:bg-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-900 focus:ring-offset-2',
    className
  );

  return (
    <button className={classes} onClick={onClick}>
      {props.children}
    </button>
  );
}
