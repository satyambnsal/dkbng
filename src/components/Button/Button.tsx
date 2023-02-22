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
    'inline-flex justify-center rounded-2xl bg-rose-800 text-base font-semibold text-white hover:bg-rose-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70',
    className,
    {
      'px-4 py-2': primary,
      'px-3 py-2': !primary,
    }
  );

  return (
    <button className={classes} onClick={onClick}>
      {props.children}
    </button>
  );
}
