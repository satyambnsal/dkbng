import clsx from 'clsx';

type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={clsx(
        'border-white-500 h-6 w-6 animate-spin rounded-full border-2 border-solid border-t-transparent',
        className
      )}
    ></div>
  );
};
