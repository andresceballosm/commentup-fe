import React, { useEffect } from 'react';
import { mdiBriefcasePlus, mdiChartTimelineVariant, mdiPlusBoxMultiple } from '@mdi/js';
import Head from 'next/head';
import type { ReactElement } from 'react';
import LoadingComponent from '@/components/template/loading';
import { useRouter } from 'next/router';
import { useDeveloper } from '@/context/useDeveloper';
import BaseButton from '../../components/template/BaseButton';
import LayoutAuthenticated from '../../layouts/authenticated';
import SectionMain from '../../components/template/SectionMain';
import SectionTitleLineWithButton from '../../components/template/SectionTitleLineWithButton';
import SectionBannerStarOnInstagram from '../../components/template/SectionBannerStarOnGitHub';
import CardBox from '../../components/template/CardBox';
import TableSamplePositions from '../../components/positions-table';
import { getPageTitle } from '../../config';
import { useAuth } from '../../context/authContext';
import WithPrivateRoute from '../../layouts/withPrivateRoute';

const Dashboard = () => {
  const { user } = useAuth();
  const { getProfile, profile, loading } = useDeveloper();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  if (!user || loading) {
    return <LoadingComponent loading />;
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Dashboard" main />
        {!profile && (
          <div className="my-6">
            <SectionBannerStarOnInstagram />
          </div>
        )}
        <SectionTitleLineWithButton icon={mdiBriefcasePlus} title="Payments" />
        <CardBox hasTable>
          <TableSamplePositions />
        </CardBox>
      </SectionMain>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

Dashboard.Auth = WithPrivateRoute;

export default Dashboard;
