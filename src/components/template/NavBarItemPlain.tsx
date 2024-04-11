import React, { ReactNode } from 'react';
import { useAppSelector } from '../../stores/hooks';

type Props = {
  display?: string;
  useMargin?: boolean;
  children: ReactNode;
  onClick: any;
};

export default function NavBarItemPlain({ display = 'flex', useMargin = false, onClick, children }: Props) {
  const navBarItemLabelStyle = useAppSelector((state: any) => state.style.navBarItemLabelStyle);
  const navBarItemLabelHoverStyle = useAppSelector((state: any) => state.style.navBarItemLabelHoverStyle);

  const classBase = 'items-center cursor-pointer dark:text-white dark:hover:text-slate-400';
  const classAddon = `${display} ${navBarItemLabelStyle} ${navBarItemLabelHoverStyle} ${
    useMargin ? 'my-2 mx-3' : 'py-2 px-3'
  }`;

  return (
    <div className={`${classBase} ${classAddon}`} tabIndex={0} role="button" onKeyDown={onClick} onClick={onClick}>
      {children}
    </div>
  );
}
