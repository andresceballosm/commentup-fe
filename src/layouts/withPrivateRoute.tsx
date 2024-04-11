import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingComponent from '@/components/template/loading';
import { auth } from '../firebaseConfig';
import { useAuth } from '../context/authContext';

const WithPrivateRoute = ({ children }: any) => {
  const router = useRouter();
  const { setMount, mount, updateUser } = useAuth();

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updateUser(currentUser?.accessToken || '');
      setTimeout(() => setMount(true), 2000);
    });
    return () => unsubuscribe();
  }, []);

  if (!mount) {
    return <LoadingComponent loading />;
  }

  return <>{children}</>;
};

export default WithPrivateRoute;
