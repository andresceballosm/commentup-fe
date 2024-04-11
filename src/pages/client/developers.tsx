import React, { useEffect } from 'react';
import { mdiBriefcasePlus } from '@mdi/js';
import Head from 'next/head';
import type { ReactElement } from 'react';
import LoadingComponent from '@/components/template/loading';
import { useRouter } from 'next/router';
import { useDeveloper } from '@/context/useDeveloper';
import ListDevelopers from '@/components/list-developers';
import WithPrivateRouteClient from '@/layouts/withPrivateRouteClient';

import LayoutAuthenticated from '../../layouts/authenticated';
import SectionMain from '../../components/template/SectionMain';
import SectionTitleLineWithButton from '../../components/template/SectionTitleLineWithButton';

import CardBox from '../../components/template/CardBox';

import { getPageTitle } from '../../config';
import { useAuth } from '../../context/authContext';

const Developers = () => {
  const { user } = useAuth();
  const { getProfiles, loading } = useDeveloper();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getProfiles();
    }
  }, [user]);

  if (!user || loading) {
    return <LoadingComponent loading />;
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Developers')}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBriefcasePlus} title="Developers" />
        <CardBox hasTable>
          <ListDevelopers />
        </CardBox>
      </SectionMain>
    </>
  );
};

Developers.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

Developers.Auth = WithPrivateRouteClient;

export default Developers;
