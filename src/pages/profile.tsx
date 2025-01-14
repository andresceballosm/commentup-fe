import Head from 'next/head';
import type { ReactElement } from 'react';
import LayoutAuthenticated from '../layouts/authenticated';
import SectionMain from '../components/template/SectionMain';
import UserCard from '../components/template/UserCard';
import type { UserForm } from '../interfaces';
import { getPageTitle } from '../config';
import { useAuth } from '../context/authContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>{getPageTitle('Profile')}</title>
      </Head>

      <SectionMain>
        <UserCard className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            {/* <CardBox className="mb-6">
              <FormField label="Avatar" help="Max 500kb">
                <FormFilePicker label="Upload" color="info" icon={mdiUpload} />
              </FormField>
            </CardBox> */}

            {/* <CardBox className="flex-1" hasComponentLayout>
              <Formik
                initialValues={userForm}
                // eslint-disable-next-line no-alert
                onSubmit={(values: UserForm) => alert(JSON.stringify(values, null, 2))}
              >
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>
                    <FormField label="Name" help="Required. Your name" labelFor="name" icons={[mdiAccount]}>
                      <Field name="name" id="name" placeholder="Name" />
                    </FormField>
                    <FormField label="E-mail" help="Required. Your e-mail" labelFor="email" icons={[mdiMail]}>
                      <Field name="email" id="email" placeholder="E-mail" />
                    </FormField>
                  </CardBoxComponentBody>
                  <CardBoxComponentFooter>
                    <BaseButtons>
                      <BaseButton color="info" type="submit" label="Submit" />
                      <BaseButton color="info" label="Options" outline />
                    </BaseButtons>
                  </CardBoxComponentFooter>
                </Form>
              </Formik>
            </CardBox> */}
          </div>

          {/* <CardBox hasComponentLayout>
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                newPasswordConfirmation: '',
              }}
              // eslint-disable-next-line no-alert
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                  <FormField
                    label="Current password"
                    help="Required. Your current password"
                    labelFor="currentPassword"
                    icons={[mdiAsterisk]}
                  >
                    <Field
                      name="currentPassword"
                      id="currentPassword"
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormField>

                  <BaseDivider />

                  <FormField
                    label="New password"
                    help="Required. New password"
                    labelFor="newPassword"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field name="newPassword" id="newPassword" type="password" autoComplete="new-password" />
                  </FormField>

                  <FormField
                    label="Confirm password"
                    help="Required. New password one more time"
                    labelFor="newPasswordConfirmation"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPasswordConfirmation"
                      id="newPasswordConfirmation"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormField>
                </CardBoxComponentBody>

                <CardBoxComponentFooter>
                  <BaseButtons>
                    <BaseButton color="info" type="submit" label="Submit" />
                    <BaseButton color="info" label="Options" outline />
                  </BaseButtons>
                </CardBoxComponentFooter>
              </Form>
            </Formik>
          </CardBox> */}
        </div>
      </SectionMain>
    </>
  );
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default ProfilePage;
