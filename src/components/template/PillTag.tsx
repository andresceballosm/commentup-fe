import React from 'react';
import { ColorKey } from '../../interfaces';
import { colorsBgLight, colorsOutline } from '../../colors';
import PillTagPlain from './PillTagPlain';

type Props = {
  label?: string;
  color: ColorKey;
  icon?: string;
  small?: boolean;
  outline?: boolean;
  className?: string;
};

const PillTag = ({ small = false, outline = false, className = '', color, icon, label }: Props) => {
  const layoutClassName = small ? 'py-1 px-3' : 'py-1.5 px-4';
  const colorClassName = outline ? colorsOutline[color] : colorsBgLight[color];

  return (
    <PillTagPlain
      className={`border rounded-full ${layoutClassName} ${colorClassName} ${className}`}
      icon={icon}
      label={label}
      small={small}
    />
  );
};

export default PillTag;
