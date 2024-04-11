import React, { ReactNode } from 'react';
import { tw } from 'twind';
import { containerMaxW } from '../../config';

type Props = {
  children: ReactNode;
};

export default function FooterBar({ children }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className={`py-2 px-6 ${containerMaxW}`}>
      <div className="block md:flex items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <b>
            &copy;{year},{' '}
            <a rel="noreferrer" target="_blank">
              Commentup, LLC
            </a>
            .
          </b>{' '}
          {children}
        </div>
        <div className="md:py-2">
          <a rel="noreferrer" target="_blank">
            <div className={tw('mb-14 flex items-center w-full')}>
              <img className={tw('h-12 w-12 mr-4')} src="/logo.svg" alt="logo" width={30} height={30} />
              <p className={tw('text-1xl text-indigo-500 font-bold')}>CommentUp</p>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
