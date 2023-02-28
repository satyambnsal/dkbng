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
    'flex items-center justify-center rounded-md border border-transparent bg-rose-800 py-3 px-4 text-base font-medium text-white hover:bg-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2',
    className
  );
  return (
    <Link href={href} target={newTab ? '_blank' : '_self'} className={classes}>
      {props.children}
    </Link>
  );
};
