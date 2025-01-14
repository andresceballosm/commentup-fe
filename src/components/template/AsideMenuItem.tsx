import React, { useEffect, useState } from 'react';
import { mdiMinus, mdiPlus } from '@mdi/js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import BaseIcon from './BaseIcon';
import { getButtonColor } from '../../colors';
import AsideMenuList from './AsideMenuList';
import { MenuAsideItem } from '../../interfaces';
import { useAppSelector } from '../../stores/hooks';

type Props = {
  item: MenuAsideItem;
  isDropdownList?: boolean;
};

const AsideMenuItem = ({ item, isDropdownList = false }: Props) => {
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const asideMenuItemStyle = useAppSelector((state) => state.style.asideMenuItemStyle);
  const asideMenuDropdownStyle = useAppSelector((state) => state.style.asideMenuDropdownStyle);
  const asideMenuItemActiveStyle = useAppSelector((state) => state.style.asideMenuItemActiveStyle);

  const activeClassAddon = !item.color && isLinkActive ? asideMenuItemActiveStyle : '';

  const { asPath, isReady } = useRouter();

  useEffect(() => {
    if (item.href && isReady) {
      // eslint-disable-next-line no-restricted-globals
      const linkPathName = new URL(item.href, location.href).pathname;

      // eslint-disable-next-line no-restricted-globals
      const activePathname = new URL(asPath, location.href).pathname;

      setIsLinkActive(linkPathName === activePathname);
    }
  }, [item.href, isReady, asPath]);

  const asideMenuItemInnerContents = (
    <>
      {item.icon && <BaseIcon path={item.icon} className={`flex-none ${activeClassAddon}`} w="w-16" size="18" />}
      <span className={`grow text-ellipsis line-clamp-1 ${item.menu ? '' : 'pr-12'} ${activeClassAddon}`}>
        {item.label}
      </span>
      {item.menu && (
        <BaseIcon path={isDropdownActive ? mdiMinus : mdiPlus} className={`flex-none ${activeClassAddon}`} w="w-12" />
      )}
    </>
  );

  const componentClass = [
    'flex cursor-pointer',
    isDropdownList ? 'py-3 px-6 text-sm' : 'py-3',
    item.color
      ? getButtonColor(item.color, false, true)
      : `${asideMenuItemStyle} dark:text-slate-300 dark:hover:text-white`,
  ].join(' ');

  return (
    <li>
      {item.href && (
        <Link href={item.href} target={item.target} className={componentClass}>
          {asideMenuItemInnerContents}
        </Link>
      )}
      {item?.onClick && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={componentClass} onClick={item.onClick}>
          {asideMenuItemInnerContents}
        </div>
      )}
      {!item.href && !item?.onClick && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={componentClass} onClick={() => setIsDropdownActive(!isDropdownActive)}>
          {asideMenuItemInnerContents}
        </div>
      )}
      {item.menu && (
        <AsideMenuList
          menu={item.menu}
          className={`${asideMenuDropdownStyle} ${isDropdownActive ? 'block dark:bg-slate-800/50' : 'hidden'}`}
          isDropdownList
        />
      )}
    </li>
  );
};

export default AsideMenuItem;
