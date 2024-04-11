import { mdiClose } from '@mdi/js';
import React, { ReactNode, useState } from 'react';
import { ColorKey } from '../../interfaces';
import { colorsBgLight, colorsOutline } from '../../colors';
import BaseButton from './BaseButton';
import BaseIcon from './BaseIcon';

type Props = {
  color: ColorKey;
  icon?: string;
  outline?: boolean;
  children: ReactNode;
  button?: ReactNode;
};

const NotificationBar = ({ outline = false, children, button, icon, color }: Props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const componentColorClass = outline ? colorsOutline[color] : colorsBgLight[color];

  const [isDismissed, setIsDismissed] = useState(false);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsDismissed(true);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      // eslint-disable-next-line max-len
      className={`px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150 ${componentColorClass}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center mb-6 md:mb-0">
          {icon && <BaseIcon path={icon} w="w-10 md:w-5" h="h-10 md:h-5" size="24" className="md:mr-2" />}
          <span className="text-center md:text-left md:py-2">{children}</span>
        </div>
        {button}
        {!button && <BaseButton icon={mdiClose} color="white" onClick={dismiss} small roundedFull />}
      </div>
    </div>
  );
};

export default NotificationBar;
