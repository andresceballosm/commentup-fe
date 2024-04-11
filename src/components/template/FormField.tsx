import { Children, cloneElement, ReactElement, ReactNode } from 'react';
import BaseIcon from './BaseIcon';

type Props = {
  label?: string;
  labelFor?: string;
  help?: string;
  icons?: string[] | null[];
  isBorderless?: boolean;
  isTransparent?: boolean;
  hasTextareaHeight?: boolean;
  children: ReactNode;
};

const FormField = ({
  icons = [],
  children,
  hasTextareaHeight,
  isBorderless,
  isTransparent,
  label,
  help,
  labelFor,
}: Props) => {
  const childrenCount = Children.count(children);

  let elementWrapperClass = '';

  // eslint-disable-next-line default-case
  switch (childrenCount) {
    case 2:
      elementWrapperClass = 'grid grid-cols-1 gap-3 md:grid-cols-2';
      break;
    case 3:
      elementWrapperClass = 'grid grid-cols-1 gap-3 md:grid-cols-3';
  }

  const controlClassName = [
    'px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400',
    'focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none',
    hasTextareaHeight ? 'h-80' : 'h-12',
    isBorderless ? 'border-0' : 'border',
    isTransparent ? 'bg-transparent' : 'bg-white dark:bg-slate-800',
  ].join(' ');

  return (
    <div className="mb-1 last:mb-0">
      {label && (
        <label htmlFor={labelFor} className={`block font-bold mb-1 ${labelFor ? 'cursor-pointer' : ''}`}>
          {label}
        </label>
      )}
      <div className={`${elementWrapperClass}`}>
        {Children.map(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          children,
          (child: ReactElement, index) => (
            <div className="relative">
              {cloneElement(child, {
                className: `${controlClassName} ${icons[index] ? 'pl-10' : ''}`,
              })}
              {icons[index] && (
                <BaseIcon
                  path={icons[index] || ''}
                  w="w-10"
                  h={hasTextareaHeight ? 'h-full' : 'h-12'}
                  className="absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"
                />
              )}
            </div>
          ),
        )}
      </div>
      {help && <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">{help}</div>}
    </div>
  );
};

export default FormField;
