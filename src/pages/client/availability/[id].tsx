import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { tw } from 'twind';
import LayoutGuest from '@/layouts/guest';
import CardBox from '@/components/template/CardBox';
import SectionFullScreen from '@/components/template/SectionFullScreen';
import { getPageTitle } from '@/config';
import { useDeveloper } from '@/context/useDeveloper';
import LoadingComponent from '@/components/template/loading';
import BaseButtons from '@/components/template/BaseButtons';
import BaseButton from '@/components/template/BaseButton';
import ToastComponent from '@/components/ui/Toast';

export default function Success() {
  const router = useRouter();
  const [contactMessage, setContactMessage] = useState<string>('');
  const { updateInteractionAvailability, error, loading, success } = useDeveloper();
  const { id } = router.query;

  const onClickSave = () => {
    if (contactMessage) {
      updateInteractionAvailability({
        id,
        availability: contactMessage,
      });
    }
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Success')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-8/12 xl:w-6/12 shadow-2xl" footer={null}>
          {loading && <LoadingComponent loading />}
          {success && <ToastComponent text={success} />}
          {error && <ToastComponent text={error} color="red" />}
          <div className="space-y-3">
            <img className={tw('h-12 w-12 mr-4')} src="/logo.svg" alt="logo" width={48} height={48} />
            <h1 className="text-2xl text-indigo-400">📅 Sharing Availability!</h1>
            <div>
              <label htmlFor="email" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Please let us know which days and time(with timezone) segments work best for you to schedule an
                interview with the developer.
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  id="contactMessage"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  rows={10}
                  required
                />
              </label>
              <BaseButtons className="mt-5">
                <BaseButton type="submit" label="Send" color="info" onClick={onClickSave} />
              </BaseButtons>
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
