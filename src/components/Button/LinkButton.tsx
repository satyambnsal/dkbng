import clsx from 'clsx';
import Link from 'next/link';
import { LinkHTMLAttributes } from 'react';

type LinkButtonProps = {
  href: string;
  newTab?: boolean;
  className?: string;
};

export const LinkButton = ({
  href,
  newTab,
  className,
  ...props
}: LinkHTMLAttributes<HTMLLinkElement> & LinkButtonProps) => {
  const classes = clsx(
    'p-4 text-base font-semibold text-white inline-flex justify-center rounded-2xl bg-rose-800 hover:bg-rose-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70',
    className
  );
  return (
    <Link href={href} target={newTab ? '_blank' : '_self'} className={classes}>
      {props.children}
    </Link>
  );
};
