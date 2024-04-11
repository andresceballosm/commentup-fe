import React, { ReactNode } from 'react';
import { useAppSelector } from '../../stores/hooks';

type Props = {
  zIndex?: string;
  type?: string;
  children?: ReactNode;
  className?: string;
  onClick: (e: React.MouseEvent) => void;
};

export default function OverlayLayer({ zIndex = 'z-50', type = 'flex', children, className, ...props }: Props) {
  const overlayStyle = useAppSelector((state: any) => state.style.overlayStyle);

  const handleClick = (e: any) => {
    e.preventDefault();

    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <div
      className={`${type} ${zIndex} ${className} items-center flex-col justify-center overflow-hidden fixed inset-0`}
    >
      <div
        // eslint-disable-next-line max-len
        className={`${overlayStyle} absolute inset-0 bg-gradient-to-tr opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleClick}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        label="Label"
      />

      {children}
    </div>
  );
}
