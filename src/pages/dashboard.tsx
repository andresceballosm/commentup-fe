import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import LoadingComponent from '@/components/template/loading';
import { useRouter } from 'next/router';
import LayoutAuthenticated from '../layouts/authenticated';
import { useAuth } from '../context/authContext';
import WithPrivateRoute from '../layouts/withPrivateRoute';

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === 'Developer') {
        router.push('/developer/dashboard');
      } else {
        router.push('/client/dashboard');
      }
    }
  }, [user]);

  return <LoadingComponent loading />;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

Dashboard.Auth = WithPrivateRoute;

export default Dashboard;
