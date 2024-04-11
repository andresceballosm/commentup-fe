import { useEffect } from 'react';
import * as Yup from 'yup';
import styles from '@/styles/home.module.css';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import Head from 'next/head';
import SectionMain from '@/components/template/SectionMain';
import { getPageTitle } from '@/config';
import BaseButton from '@/components/template/BaseButton';
import BaseButtons from '@/components/template/BaseButtons';
import { NextSeo } from 'next-seo';
import { useTeam } from '@/context/teamContext';
import ToastComponent from '@/components/ui/Toast';
import LoadingComponent from '@/components/template/loading';
import LayoutGuest from '@/layouts/guest';
import CardBox from '@/components/template/CardBox';
import { Field, Form, Formik } from 'formik';
import FormField from '@/components/template/FormField';
import BaseDivider from '@/components/template/BaseDivider';
import { useRouter } from 'next/router';

const SignupSchema = Yup.object().shape({
  displayName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(15, 'Too Long!').required('Required'),
});

export default function AcceptMemberInvitation() {
  const { acceptInvitationMemberTeam, error, loading, message, getTeamMember, teamMember } = useTeam();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getTeamMember(id);
    }
  }, []);

  const handleSubmit = (values: any) => {
    const { password, displayName } = values;
    if (password && displayName) {
      const data = {
        password,
        displayName,
        email: teamMember?.email || '',
        // eslint-disable-next-line no-underscore-dangle
        teamMemberID: teamMember?._id,
      };
      acceptInvitationMemberTeam(data);
    }
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('AcceptMemberInvitation - CommentUp')}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <NextSeo
        title="AcceptMemberInvitation - CommentUp"
        description="Hire Junior developers with mentorship from Latin America"
      />
      {loading && <LoadingComponent loading />}
      {error && <ToastComponent text={error} color="red" />}
      {message && <ToastComponent text={message} />}
      <SectionMain>
        <div className="mx-auto flex flex-col gap-4">
          <main className={styles.main}>
            <a href="/chat" className="flex items-center mb-10">
              <img src="/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-bold tracking-tighter whitespace-nowrap dark:text-white">
                CommentUp
              </span>
            </a>
            <CardBox className=" w-11/12 md:w-10/12 lg:w-12/12 xl:w-12/12 shadow-2xl">
              <Formik
                initialValues={{ password: '', displayName: '' }}
                validationSchema={SignupSchema}
                onSubmit={(values) => handleSubmit(values)}
              >
                <Form>
                  <div className="grid gap-4 md:grid-cols-2 xs:grid-cols-1">
                    <FormField label="Name" help="Please enter your name">
                      <Field name="displayName" required />
                    </FormField>

                    <FormField label="Password" help="Please enter your password, min 6 characters">
                      <Field name="password" type="password" required />
                    </FormField>
                  </div>

                  <BaseDivider />

                  <BaseButtons>
                    <BaseButton type="submit" label="Submit" color="info" disabled={loading} />
                  </BaseButtons>
                </Form>
              </Formik>
            </CardBox>
          </main>
        </div>
      </SectionMain>
    </>
  );
}

AcceptMemberInvitation.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
