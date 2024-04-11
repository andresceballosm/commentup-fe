import React, { useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import BaseButtons from '@/components/template/BaseButtons';
import { useRouter } from 'next/router';
import { tw } from 'twind';
import LayoutAuthenticated from '@/layouts/authenticated';
import SectionMain from '@/components/template/SectionMain';
import LayoutGuest from '@/layouts/guest';
import WithPrivateRoute from '@/layouts/withPrivateRoute';
import BaseButton from '../../../../components/template/BaseButton';
import CardBox from '../../../../components/template/CardBox';
import SectionFullScreen from '../../../../components/template/SectionFullScreen';
import { getPageTitle } from '../../../../config';

export default function Success() {
  const router = useRouter();
  const [labelBtn, setLabelBtn] = useState('Copy');
  const { id } = router.query;

  const handleCopy = () => {
    setLabelBtn('Copied!');
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/candidates/positions/${id}`);
    setTimeout(() => {
      setLabelBtn('Copy');
    }, 4000);
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Success')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox
          className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl"
          footer={
            <BaseButtons>
              <BaseButton href="/create-position" label="Create New Position" color="info" />
              <BaseButton href="/dashboard" label="Dashboard" color="info" outline />
            </BaseButtons>
          }
        >
          <div className="space-y-3">
            <img className={tw('h-12 w-12 mr-4')} src="/logo.svg" alt="logo" width={48} height={48} />
            <h1 className="text-2xl text-indigo-800">Congratulations, the position has been successfully created!</h1>
            <p className="text-gray-500">
              Share the link below with any potential candidates or share on social media like Linkedin.
            </p>
            <div className="flex items-center pt-5">
              <div className="w-2/12">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
                focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {labelBtn}
                </button>
              </div>

              <div className="w-10/12 ml-5">
                <input
                  type="text"
                  id="link"
                  value={`${process.env.NEXT_PUBLIC_URL}/candidates/positions/${id}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                />
              </div>
            </div>
          </div>
        </CardBox>
      </SectionFullScreen>
    </>
  );
}

Success.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

Success.Auth = WithPrivateRoute;
