import { useState } from 'react';
import { tw } from 'twind';
import { mdiClose, mdiLogout } from '@mdi/js';
import Button from '@/components/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authContext';
import NavBarMenuList from '@/components/template/NavBarMenuList';
import menuNavBar from '@/menu-nav-bar-chat';
import NavBarItemPlain from '@/components/template/NavBarItemPlain';
import BaseIcon from '@/components/template/BaseIcon';

interface IMenuButton {
  toggleMenu: React.MouseEventHandler<HTMLButtonElement>;
  showMenu: boolean;
}

type Link = {
  label: string;
  href: string;
};

const links = [
  {
    label: 'Chat',
    href: '/chat',
  },
  {
    label: 'Old Style',
    href: '/dashboard',
  },
  {
    label: 'Team',
    href: '/team',
  },
];

const secondaryLinks = [
  {
    label: 'Old Style',
    href: '/dashboard',
  },
];

const MenuButton = ({ toggleMenu, showMenu }: IMenuButton) => (
  <button
    type="button"
    aria-controls="mobile-menu"
    aria-expanded={showMenu}
    onClick={toggleMenu}
    className={tw('p-2 text-gray-400')}
  >
    <span className={tw('sr-only')}>Open menu</span>
    {showMenu ? (
      <svg
        className={tw('h-6 w-6')}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        width={24}
        height={24}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg
        className={tw('h-6 w-6')}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        width={24}
        height={24}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )}
  </button>
);

const MobileMenu = () => {
  const { user } = useAuth();
  const role = user?.role;
  const router = useRouter();
  const linksAvailable = links.filter((item: any) => {
    if (item.label === 'Team' && role === 'recruiter') {
      return false;
    }
    return true;
  });
  return (
    <div className={tw('md:hidden')}>
      <div className={tw('px-2 pt-2 pb-3 space-y-1 sm:px-3')}>
        {linksAvailable.map((link: Link) => (
          <button
            type="button"
            onClick={() => router.push(link.href)}
            className={tw('text-gray-500 block px-3 py-2 text-base font-medium')}
            key={link.label}
          >
            {link.label}
          </button>
        ))}
      </div>
      <div className={tw('pt-4 pb-3 border-t border-gray-400')}>
        <div className={tw('px-2 space-y-1')}>
          {secondaryLinks.map((link: Link) => (
            <Link
              key={`mobile-${link.label}`}
              href={link.href}
              className={tw('block px-3 py-2 text-base font-medium text-gray-500')}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChatNavigation = () => {
  const { user, logout } = useAuth();

  const role = user?.role;
  const [isMenuNavBarActive, setIsMenuNavBarActive] = useState(false);

  const handleMenuNavBarToggleClick = () => {
    setIsMenuNavBarActive(!isMenuNavBarActive);
  };
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const router = useRouter();

  const linksAvailable = links.filter((item: any) => {
    if (item.label === 'Team' && role === 'recruiter') {
      return false;
    }
    return true;
  });

  return (
    <nav className="bg-white dark:bg-slate-700">
      <div className={tw('max-w-8xl mx-auto px-4 sm:px-6 lg:px-8')}>
        <div className={tw('flex items-center justify-between h-24')}>
          <div className={tw('flex items-center')}>
            <a href="/dashboard" className="flex items-center">
              <img src="/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-bold tracking-tighter whitespace-nowrap dark:text-white">
                CommentUp
              </span>
            </a>
            <div className={tw('hidden md:block')}>
              <div className={tw('ml-10 flex items-baseline space-x-4')}>
                {linksAvailable.map((link: Link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => router.push(link.href)}
                    className={tw(
                      router.pathname === link.href
                        ? 'text-indigo-700 hover:text-indigo-500 px-3 py-2 rounded-md font-medium'
                        : 'text-gray-500  hover:text-indigo-500 px-3 py-2 rounded-md font-medium',
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={tw('hidden md:block')}>
            <div className={tw('ml-4 flex md:ml-6')}>
              <div className="relative w-10 h-10 mr-2 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="">
                <p>{user?.displayName}</p>
                <p className="text-gray-700 text-sm">{user?.email}</p>
              </div>
              <button type="button" onClick={logout} className="mt-2 ml-5">
                <BaseIcon path={mdiLogout} size="24" className="text-indigo-500" />
              </button>
            </div>
          </div>

          <div className={tw('-mr-2 flex md:hidden')}>
            <MenuButton showMenu={showMenu} toggleMenu={toggleMenu} />
          </div>
        </div>
      </div>
      {showMenu ? <MobileMenu /> : null}
    </nav>
  );
};

export default ChatNavigation;
