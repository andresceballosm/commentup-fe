import { mdiAccountCircle, mdiMonitor, mdiMagnify } from '@mdi/js';
import { MenuAsideItem } from './interfaces';

export const menuAsideClient: MenuAsideItem[] = [
  {
    href: '/client/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/client/developers',
    label: 'Developers',
    icon: mdiMagnify,
  },
  {
    href: '/client/account',
    label: 'Account',
    icon: mdiAccountCircle,
  },
];

export const menuAsideDeveloper: MenuAsideItem[] = [
  {
    href: '/developer/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/developer/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
];
