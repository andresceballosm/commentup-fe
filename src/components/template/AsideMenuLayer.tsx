import React from 'react';
import { mdiLogout, mdiClose } from '@mdi/js';
import BaseIcon from './BaseIcon';
import AsideMenuItem from './AsideMenuItem';
import AsideMenuList from './AsideMenuList';
import { MenuAsideItem } from '../../interfaces';
import { useAppSelector } from '../../stores/hooks';
import { useAuth } from '../../context/authContext';

type Props = {
  menu: MenuAsideItem[];
  className?: string;
  onAsideLgCloseClick: () => void;
};

export default function AsideMenuLayer({ menu, className = '', ...props }: Props) {
  const asideStyle = useAppSelector((state) => state.style.asideStyle);
  const asideBrandStyle = useAppSelector((state) => state.style.asideBrandStyle);
  const asideScrollbarsStyle = useAppSelector((state) => state.style.asideScrollbarsStyle);
  const darkMode = useAppSelector((state) => state.style.darkMode);
  const { logout } = useAuth();

  const logoutItem: MenuAsideItem = {
    label: 'Logout',
    icon: mdiLogout,
    color: 'info',
    isLogout: true,
    onClick: logout,
  };

  const handleAsideLgCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onAsideLgCloseClick();
  };

  return (
    <aside
      // eslint-disable-next-line max-len
      className={`${className} zzz lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
    >
      <div className={`lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900 ${asideStyle}`}>
        <div className={`flex flex-row h-14 items-center justify-between dark:bg-slate-900 ${asideBrandStyle}`}>
          <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
            <a href="/" className="flex items-center my-5">
              <img src="/logo.svg" className="h-9 mr-2 ml-3" alt="Commentup Logo" />
              <span className="self-center text-2xl md:text-2xl text-indigo-900 font-bold tracking-tighter whitespace-nowrap dark:text-white">
                CommentUp
              </span>
            </a>
          </div>

          <button type="button" className="hidden lg:inline-block xl:hidden p-3" onClick={handleAsideLgCloseClick}>
            <BaseIcon path={mdiClose} />
          </button>
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden ${
            darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
          }`}
        >
          <AsideMenuList menu={menu} />
        </div>
        <ul>
          <AsideMenuItem item={logoutItem} />
        </ul>
      </div>
    </aside>
  );
}
