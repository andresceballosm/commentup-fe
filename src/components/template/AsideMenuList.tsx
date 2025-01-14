import React from 'react';
import { MenuAsideItem } from '../../interfaces';
import AsideMenuItem from './AsideMenuItem';

type Props = {
  menu: MenuAsideItem[];
  isDropdownList?: boolean;
  className?: string;
};

export default function AsideMenuList({ menu, isDropdownList = false, className = '' }: Props) {
  return (
    <ul className={className}>
      {menu.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <AsideMenuItem key={index} item={item} isDropdownList={isDropdownList} />
      ))}
    </ul>
  );
}
