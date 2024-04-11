// Why disabled:
// avatars.dicebear.com provides svg avatars
// next/image needs dangerouslyAllowSVG option for that

import { useAuth } from '@/context/authContext';
import React, { ReactNode } from 'react';

type Props = {
  username: string;
  avatar?: string | null;
  api?: string;
  className?: string;
  children?: ReactNode;
};

export default function UserAvatar({ username, avatar = null, api = 'avataaars', className = '', children }: Props) {
  const { user } = useAuth();
  const mock = user?.photo
    ? user?.photo
    : `https://avatars.dicebear.com/api/${api}/${username.replace(/[^a-z0-9]+/i, '-')}.svg`;
  const avatarImage = avatar ?? mock;

  return (
    <div className={className}>
      <img
        src={avatarImage}
        alt={username}
        className="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
      />
      {children}
    </div>
  );
}
