import clsx from 'clsx';

type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={clsx(
        'h-12 w-12 animate-spin rounded-full border-2 border-solid border-blue-500 border-t-transparent',
        className
      )}
    ></div>
  );
};
