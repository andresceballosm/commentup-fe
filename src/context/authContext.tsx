import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import axios from 'axios';
import Router from 'next/router';
import { auth } from '../firebaseConfig';

interface valueAuthContext {
  login: (email: string, password: string) => void;
  sendPassword: (email: string) => void;
  loading: boolean;
  user: any;
  logout: () => void;
  signup: ({ email, password, name, company, sector, photo }: any, action: any) => Promise<void>;
  error: string;
  token: string;
  mount: boolean;
  setMount: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<any>>;
  updateUser: any;
  updateUserDB: (values: any) => Promise<void>;
  setLoading: (value: boolean) => void;
}

export const authContext = createContext<valueAuthContext>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  login: (_values: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  sendPassword: (_values: any) => {},
  loading: false,
  user: null,
  mount: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  logout: () => {},
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function, @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-pattern
  signup: ({}: any) => {},
  error: '',
  token: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setMount: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setLoading: () => {},
});

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error('There is no Auth providers');
  return context;
};

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState();
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mount, setMount] = useState(false);

  const fetchUserFromDB = async (tokenValue: string, navigate: boolean) => {
    if (tokenValue) {
      try {
        const request = await axios({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: tokenValue,
          },
          url: `${process.env.NEXT_PUBLIC_API_URL}/v1/user`,
        });
        if (request.data.ok) {
          const userData = request.data?.response?.user;
          setUser(userData);
          if (navigate) {
            if (userData.role === 'Developer') {
              Router.push('/developer/dashboard');
            } else if (userData.role === 'Client') {
              Router.push('/client/dashboard');
            }
          }
        }
        // eslint-disable-next-line no-shadow
      } catch (error: any) {
        setLoading(false);
        setError('Sorry, it was not possible to log in');
      }
    }
  };

  const updateUser = async (accessToken: string, navigate = false) => {
    setToken(accessToken);
    fetchUserFromDB(accessToken, navigate);
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError('');
      const res: any = await signInWithEmailAndPassword(auth, email, password);
      if (res?.user?.accessToken) {
        updateUser(res?.user.accessToken || '', true);
      }
    } catch (err: any) {
      setError(err.code);
      setLoading(false);
    }
  };

  // eslint-disable-next-line consistent-return
  const signup = async ({ email, password, name, company, country, role, phone, photo = '' }: any, action: any) => {
    try {
      const newUserRequest = await createUserWithEmailAndPassword(auth, email, password);
      const userData = newUserRequest?.user;
      if (userData) {
        const id = userData?.uid;
        setLoading(true);
        const res = await axios({
          method: 'POST',
          url: `${process.env.NEXT_PUBLIC_API_URL}/v1/user/create`,
          data: { displayName: name, email, firebaseUid: id, photo, company, phone, country, role },
        });
        action(true, '');
        setLoading(false);
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      action(false, err.code);
      setLoading(false);
    }
  };

  // eslint-disable-next-line consistent-return
  const updateUserDB = async (values: any) => {
    try {
      setLoading(true);
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/user/me/update`,
        data: values,
      });
      if (request.data.ok) {
        const userData = request.data?.response?.user;
        setUser(userData);
      }
      setLoading(false);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      action(false, err.code);
      setLoading(false);
    }
  };

  const logout = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setUser(null);
    setToken('');
    signOut(auth);
  };

  const sendPassword = async (email: string) => sendPasswordResetEmail(auth, email);

  return (
    <authContext.Provider
      value={{
        user,
        loading,
        sendPassword,
        login,
        logout,
        signup,
        mount,
        setMount,
        token,
        error,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setUser,
        updateUser,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        updateUserDB,
        setLoading,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
