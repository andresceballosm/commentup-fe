import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingComponent from '@/components/template/loading';
import { auth } from '../firebaseConfig';
import { useAuth } from '../context/authContext';

const WithPrivateRouteClient = ({ children }: any) => {
  const router = useRouter();
  const { setMount, mount, updateUser } = useAuth();

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (JSON.parse(currentUser.reloadUserInfo?.customAttributes).role !== 'Client') {
          router.push('/404');
          return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        updateUser(currentUser?.accessToken || '');
        setTimeout(() => setMount(true), 2000);
      }
    });
    return () => unsubuscribe();
  }, []);

  if (!mount) {
    return <LoadingComponent loading />;
  }

  return <>{children}</>;
};

export default WithPrivateRouteClient;
