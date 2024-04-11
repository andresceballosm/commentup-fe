import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import * as Yup from 'yup';
import { tw } from 'twind';
import BaseButton from '../components/template/BaseButton';
import CardBox from '../components/template/CardBox';
import SectionFullScreen from '../components/template/SectionFullScreen';
import LayoutGuest from '../layouts/guest';
import FormField from '../components/template/FormField';
import BaseDivider from '../components/template/BaseDivider';
import BaseButtons from '../components/template/BaseButtons';
import { getPageTitle } from '../config';
import CardBoxModal from '../components/template/CardBoxModal';
import { COUNTRIES, SECTOR } from '../constants/data/select.constants';
import LoadingComponent from '../components/template/loading';
import { useAuth } from '../context/authContext';

const SignupSchema = Yup.object().shape({
  company: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [modalText, setModalText] = useState('');
  const { sendPassword, loading } = useAuth();

  const handleSubmit = (values: any) => {
    console.log('values ', values);
    sendPassword(values.email);
    router.push('/login');
  };

  const handleModalAction = () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setIsModalInfoActive(false);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  };

  const modalSampleContents = <p>{modalText}</p>;

  if (loading) {
    return <LoadingComponent loading />;
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Forgot Password')}</title>
      </Head>
      <CardBoxModal
        title="Ouups!"
        buttonColor="danger"
        buttonLabel="Close"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
      >
        {modalSampleContents}
      </CardBoxModal>

      <SectionFullScreen bg="white">
        <div
          // eslint-disable-next-line max-len
          className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-red-400 via-red-400 to-indigo-800 
         w-4/6 md:w-4/6 lg:w-4/6 xl:w-4/6"
        >
          <div>
            <div className="flex">
              <img className={tw('h-12 w-12 mr-4')} src="logo.svg" alt="logo" width={48} height={48} />
              <p className={tw('text-4xl text-indigo-900 font-bold')}>CommentUp</p>
            </div>
            <div className="mt-10">
              <p className={tw('text-5xl text-indigo-950 font-bold')}>
                Forgot
                <br /> password
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6">
          <CardBox className=" w-11/12 md:w-10/12 lg:w-12/12 xl:w-12/12 shadow-2xl">
            <Formik initialValues={{ email: '' }} onSubmit={(values) => handleSubmit(values)}>
              <Form>
                <FormField label="Email" help="Please enter your email">
                  <Field type="email" name="email" required />
                </FormField>

                <BaseDivider />
                <BaseButtons>
                  <BaseButton type="submit" label="Send Password" color="info" disabled={loading} />
                  <BaseButton href="/login" label="Login" color="info" outline disabled={loading} />
                </BaseButtons>
              </Form>
            </Formik>
          </CardBox>
        </div>
      </SectionFullScreen>
    </>
  );
}

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
