import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import * as Yup from 'yup';
import TexFieldPhoneComponent from '@/components/commons/field-phone.component';
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
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function Register() {
  const router = useRouter();
  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [showCompanyField, setShowCompanyField] = useState(false);
  const [modalText, setModalText] = useState('');
  const { signup, loading } = useAuth();

  const action = (success: boolean, err: any) => {
    if (success) {
      router.push('/dashboard');
    } else {
      setIsModalInfoActive(true);
      let message = 'Error in the register';
      if (err === 'auth/email-already-in-use') {
        message = 'Sorry, email already in use';
      }
      setModalText(message);
    }
  };

  const handleSubmit = (values: any) => {
    const { password, repeatPassword, country, role, phone } = values;
    if (!phone) {
      setIsModalInfoActive(true);
      setModalText('phone is required');
      return;
    }
    if (!country) {
      setIsModalInfoActive(true);
      setModalText('Country is required');
      return;
    }
    if (!role) {
      setIsModalInfoActive(true);
      setModalText('Role is required');
      return;
    }
    if (password !== repeatPassword) {
      setIsModalInfoActive(true);
      setModalText('Password don`t have match');
    } else {
      signup(values, action);
    }
    // router.push('/dashboard');
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
        <title>{getPageTitle('Register')}</title>
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
          className="md:flex md:min-h-screen items-center justify-center bg-gradient-to-tr from-red-400 via-red-400 to-indigo-800 
         w-6/6 md:w-4/6 lg:w-4/6 xl:w-4/6"
        >
          <img className=" max-w shadow-xl shadow-gray-700" src="/images/developer.jpg" alt="logo" />
        </div>
        <div className="flex justify-center w-6/6 md:w-5/6 lg:w-5/6 xl:w-5/6">
          <CardBox className="w-11/12 md:w-10/12 lg:w-12/12 xl:w-12/12 shadow-2xl">
            <a href="/" className="flex items-center my-5">
              <img src="/logo.svg" className="h-9 mr-3" alt="CommentUp Logo" />
              <span className="self-center text-1xl md:text-1xl text-indigo-900 font-bold tracking-tighter whitespace-nowrap dark:text-white">
                CommentUp
              </span>
            </a>
            <p className="mb-6 text-center text-2xl md:text-2xl text-indigo-900 font-bold tracking-tighter whitespace-nowrap dark:text-white">
              Create your account
            </p>
            <Formik
              initialValues={{ email: '', password: '', phone: '', comapany: '', remember: true }}
              validationSchema={SignupSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="grid gap-4 md:grid-cols-2 xs:grid-cols-1">
                    <FormField label="Email" help="">
                      <Field type="email" name="email" required />
                    </FormField>

                    <FormField label="Name" help="">
                      <Field name="name" required />
                    </FormField>

                    <FormField label="Are you" labelFor="sector">
                      <Field
                        name="role"
                        id="role"
                        component="select"
                        onChange={(event: any) => {
                          setFieldValue('role', event.target.value);
                          setShowCompanyField(event.target.value === 'Client');
                        }}
                        required
                      >
                        {SECTOR.map((item, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </Field>
                    </FormField>
                    {showCompanyField && (
                      <FormField label="Company" help="">
                        <Field name="company" required />
                      </FormField>
                    )}

                    <FormField label="Phone" help="Please enter your phone">
                      <Field name="phone" component={TexFieldPhoneComponent} required />
                    </FormField>

                    <FormField label="Country" labelFor="country">
                      <Field name="country" id="country" component="select" required>
                        {COUNTRIES.map((item, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </Field>
                    </FormField>

                    <FormField label="Password" help="">
                      <Field name="password" type="password" required />
                    </FormField>

                    <FormField label="Repeat Password" help="">
                      <Field name="repeatPassword" type="password" required />
                    </FormField>
                  </div>

                  <BaseDivider />

                  <BaseButtons>
                    <BaseButton type="submit" label="Register" color="info" disabled={loading} />
                    <BaseButton href="/login" label="Login" color="info" outline disabled={loading} />
                  </BaseButtons>
                </Form>
              )}
            </Formik>
          </CardBox>
        </div>
      </SectionFullScreen>
    </>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
