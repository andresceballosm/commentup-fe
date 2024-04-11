import React from 'react';
import { mdiAlertCircle } from '@mdi/js';
import type { ReactElement } from 'react';
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import { tw } from 'twind';
import { useRouter } from 'next/router';
import BaseButton from '../components/template/BaseButton';
import CardBox from '../components/template/CardBox';
import SectionFullScreen from '../components/template/SectionFullScreen';
import NotificationBar from '../components/template/NotificationBar';
import LayoutGuest from '../layouts/guest';
import FormField from '../components/template/FormField';
import FormCheckRadio from '../components/template/FormCheckRadio';
import BaseDivider from '../components/template/BaseDivider';
import BaseButtons from '../components/template/BaseButtons';
import { getPageTitle } from '../config';
import { useAuth } from '../context/authContext';
import LoadingComponent from '../components/template/loading';

export default function Login() {
  const { login, error, loading } = useAuth();
  const router = useRouter();
  const handleSubmit = (values: any) => login(values.email, values.password);

  if (loading) {
    return <LoadingComponent loading />;
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="white">
        <div
          className="md:flex md:min-h-screen items-center justify-center bg-gradient-to-tr from-red-400 via-red-400 to-indigo-800 
         w-6/6 md:w-4/6 lg:w-4/6 xl:w-4/6"
        >
          <img className="max-w shadow-xl shadow-gray-700" src="/images/developer.jpg" alt="logo" />
        </div>
        <div className="flex items-center justify-center w-6/6 md:w-5/6 lg:w-5/6 xl:w-5/6 sm:mt-5">
          <CardBox className="w-11/12 md:w-10/12 lg:w-10/12 xl:w-10/12 shadow-2xl">
            <a href="/" className="flex items-center my-5">
              <img src="/logo.svg" className="h-9 mr-3" alt="CommentUp Logo" />
              <span className="self-center text-1xl md:text-1xl text-indigo-900 font-bold tracking-tighter whitespace-nowrap dark:text-white">
                CommentUp
              </span>
            </a>
            <p className="mb-6 text-center text-2xl md:text-2xl text-indigo-900 font-bold tracking-tighter whitespace-nowrap dark:text-white">
              Login
            </p>
            <Formik initialValues={{ remember: true }} onSubmit={(values) => handleSubmit(values)}>
              <Form>
                <FormField label="Email" help="Please enter your email">
                  <Field name="email" />
                </FormField>

                <FormField label="Password" help="Please enter your password">
                  <Field name="password" type="password" />
                </FormField>

                <FormCheckRadio type="checkbox" label="Remember">
                  <Field type="checkbox" name="remember" />
                </FormCheckRadio>
                <div className="pt-5">
                  <button
                    type="button"
                    onClick={() => router.push('/forgot-password')}
                    className={tw('text-indigo-500 block  text-base font-medium')}
                  >
                    Forgot password?
                  </button>
                </div>

                <BaseDivider />

                <BaseButtons>
                  <BaseButton type="submit" label="Login" color="info" />
                  <BaseButton href="/register" label="Sign Up" color="info" outline />
                </BaseButtons>
              </Form>
            </Formik>
            <br />
            {error && (
              <NotificationBar color="danger" icon={mdiAlertCircle}>
                {error}
              </NotificationBar>
            )}
          </CardBox>
        </div>
      </SectionFullScreen>
    </>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
