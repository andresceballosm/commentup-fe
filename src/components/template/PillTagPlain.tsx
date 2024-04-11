import React from 'react';
import BaseIcon from './BaseIcon';

type Props = {
  label?: string;
  icon?: string;
  className?: string;
  small?: boolean;
};

const PillTagPlain = ({ small = false, className = '', icon, label }: Props) => (
  <div className={`inline-flex items-center capitalize leading-none ${small ? 'text-xs' : 'text-sm'} ${className}`}>
    {icon && <BaseIcon path={icon} h="h-4" w="w-4" className={small ? 'mr-1' : 'mr-2'} size={small ? 14 : null} />}
    {label && <span>{label}</span>}
  </div>
);

export default PillTagPlain;
