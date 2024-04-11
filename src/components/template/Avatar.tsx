import { useAuth } from '@/context/authContext';
import React, { ReactNode } from 'react';

type Props = {
  username: string;
  avatar?: string | null;
  api?: string;
  className?: string;
  children?: ReactNode;
};

export default function AvatarComponent({
  username,
  avatar = null,
  api = 'avataaars',
  className = '',
  children,
}: Props) {
  const mock = `https://avatars.dicebear.com/api/${api}/${username.replace(/[^a-z0-9]+/i, '-')}.svg`;
  const avatarImage = avatar || mock;

  return (
    <div className={className}>
      <div className="rounded-full overflow-hidden w-full h-full bg-gray-100 dark:bg-slate-800">
        <img src={avatarImage} alt={username} className="object-cover w-full h-full" />
      </div>
      {children}
    </div>
  );
}
