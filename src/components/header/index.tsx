import { tw, css } from 'twind/css';
import Button from '@/components/button';
import Tiktok from '@/constants/svg/tiktok.svg';
import Facebook from '@/constants/svg/facebook.svg';
import Youtube from '@/constants/svg/youtube.svg';
import Instagram from '@/constants/svg/instagram.svg';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

const headerStyle = css`
  background-color: #ffffff;
  min-height: calc(100vh - 6rem);
`;

const Header = () => (
  <header className={tw(headerStyle)}>
    <div className="md:flex animated fadeIn slower">
      <div className={tw('md:w-3/6 max-w-4xl mx-auto py-16 px-14 sm:px-6 lg:px-8')}>
        <h1
          className={tw(
            'mb-10 font-sans font-bold text-4xl md:text-4xl lg:text-7xl text-center leading-snug text-gray-800',
          )}
        >
          Hire Latin American Junior Remote Developers
        </h1>
        <div className={tw('h-32 max-w-xl mx-auto')}>
          <TypeAnimation
            sequence={[
              'We connect companies with Junior developers',
              1000,
              'We connect companies with Junior developers providing mentorship from Senior Developers.',
              1000,
              'We connect companies with Junior developers providing infrastructure for payments.',
              1000,
            ]}
            wrapper="span"
            speed={50}
            className={tw('mt-12 text-gray-500 text-center text-xl lg:text-3xl')}
            repeat={Infinity}
          />
        </div>
        <div className="mt-5 flex justify-center items-center w-3/6 mx-auto">
          <a
            href="/register"
            className="text-white bg-indigo-900 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-200 dark:focus:ring-indigo-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >
            <Link href="/register">HIRE NOW</Link>
          </a>
        </div>
      </div>
      <div className="md:w-3/6 md:pt-14">
        <img className="md:mt-10 md:px-15 h-auto max-w-full rounded-lg" src="/images/map.png" alt="logo" />
      </div>
    </div>
  </header>
);

export default Header;
