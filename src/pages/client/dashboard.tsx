import React, { useEffect } from 'react';
import { mdiBriefcasePlus, mdiChartTimelineVariant, mdiPlusBoxMultiple, mdiAccountCreditCard } from '@mdi/js';
import Head from 'next/head';
import type { ReactElement } from 'react';
import LoadingComponent from '@/components/template/loading';
import { useRouter } from 'next/router';
import { useDeveloper } from '@/context/useDeveloper';
import { gradientBgIndigo } from '@/colors';
import SectionBanner from '@/components/template/SectionBanner';
import WithPrivateRouteClient from '@/layouts/withPrivateRouteClient';
import BaseButton from '../../components/template/BaseButton';
import LayoutAuthenticated from '../../layouts/authenticated';
import SectionMain from '../../components/template/SectionMain';
import SectionTitleLineWithButton from '../../components/template/SectionTitleLineWithButton';
import CardBox from '../../components/template/CardBox';
import TableSamplePositions from '../../components/positions-table';
import { getPageTitle } from '../../config';
import { useAuth } from '../../context/authContext';

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
            <SectionBanner className={gradientBgIndigo}>
              <h1 className="text-2xl text-white mb-6">
                Hire your first Latin American remote junior developer through <b>CommentUp! </b> with the added
                assurance of mentorship from a senior developer.
              </h1>
              <div>
                <BaseButton
                  onClick={() => router.push('/client/developers')}
                  icon={mdiBriefcasePlus}
                  label="Find Developers"
                  roundedFull
                />
              </div>
            </SectionBanner>
          </div>
        )}
        <SectionTitleLineWithButton icon={mdiBriefcasePlus} title="Contracts" />
        <CardBox hasTable>
          <TableSamplePositions />
        </CardBox>
        <SectionTitleLineWithButton icon={mdiAccountCreditCard} title="Payments" />
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

Dashboard.Auth = WithPrivateRouteClient;

export default Dashboard;
