import clsx from 'clsx'
import Link from 'next/link'


type ButtonProps = {
  href?: string,
  className?: string,
  [k:string]: any
}

export function Button({ href, className, ...props }: ButtonProps) {
  className = clsx(
    'inline-flex justify-center rounded-2xl bg-rose-800 p-4 text-base font-semibold text-white hover:bg-rose-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70',
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}