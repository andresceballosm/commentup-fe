import { useEffect } from 'react';
import Layout from '@/components/layout';
import styles from '@/styles/home.module.css';
import WithPrivateRoute from '@/layouts/withPrivateRoute';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import Head from 'next/head';
import SectionMain from '@/components/template/SectionMain';
import { getPageTitle } from '@/config';
import { NextSeo } from 'next-seo';
import { useTeam } from '@/context/teamContext';
import TeamTable from '@/components/team/team-table';
import ToastComponent from '@/components/ui/Toast';
import LoadingComponent from '@/components/template/loading';

const Team = () => {
  const { getTeam, error, loading, message } = useTeam();

  useEffect(() => {
    getTeam();
  }, []);

  return (
    <>
      <Head>
        <title>{getPageTitle('Team - CommentUp')}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <NextSeo title="Team - CommentUp" description="Hire Junior developers with mentorship from Latin America" />
      {loading && <LoadingComponent loading />}
      {error && <ToastComponent text={error} color="red" />}
      {message && <ToastComponent text={message} />}

      <div className="w-full max-w-full p-12">
        <main className={styles.main}>
          <TeamTable />
        </main>
      </div>
    </>
  );
};

Team.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

Team.Auth = WithPrivateRoute;

export default Team;
