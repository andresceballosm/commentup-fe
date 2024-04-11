import React, { useEffect } from 'react';
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

export default function Success() {
  const router = useRouter();
  const { updateInteraction, error, loading, setLoading } = useDeveloper();
  const { id } = router.query;

  useEffect(() => {
    setLoading(true);
    if (id) {
      updateInteraction({
        id,
        status: 'developer-declined',
      });
    }
  }, [id]);

  if (loading) {
    return <LoadingComponent loading />;
  }

  if (error) {
    return (
      <>
        <Head>
          <title>{getPageTitle('Sorry!')}</title>
        </Head>

        <SectionFullScreen bg="purplePink">
          <CardBox className="w-11/12 md:w-7/12 lg:w-8/12 xl:w-6/12 shadow-2xl" footer={null}>
            <div className="space-y-3">
              <img className={tw('h-12 w-12 mr-4')} src="/logo.svg" alt="logo" width={48} height={48} />
              <h1 className="text-2xl text-red-400">
                🚧 Apologies, but we were unable to send your response at this time.
              </h1>
              <p>
                Please try again later or contact our support team sending an email to team@commentup.app for further
                assistance..
              </p>
            </div>
          </CardBox>
        </SectionFullScreen>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Success')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-8/12 xl:w-6/12 shadow-2xl" footer={null}>
          <div className="space-y-3">
            <img className={tw('h-12 w-12 mr-4')} src="/logo.svg" alt="logo" width={48} height={48} />
            <h1 className="text-2xl text-indigo-400">Success!</h1>
            <p>We appreciate your response indicating that you are not interested in the position.</p>
          </div>
        </CardBox>
      </SectionFullScreen>
    </>
  );
}

Success.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
