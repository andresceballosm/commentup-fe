import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import LayoutAuthenticated from '@/layouts/authenticated';
import SectionMain from '@/components/template/SectionMain';
import { getPageTitle } from '@/config';
import { useAuth } from '@/context/authContext';
import CardBox from '@/components/template/CardBox';
import CardBoxComponentBody from '@/components/template/CardBoxComponentBody';
import { mdiAccount, mdiMail, mdiUpload, mdiGithub, mdiLinkedin, mdiWeb } from '@mdi/js';
import FormField from '@/components/template/FormField';
import { Field, Form, Formik } from 'formik';
import FormFilePicker from '@/components/template/FormFilePicker';
import CardBoxComponentFooter from '@/components/template/CardBoxComponentFooter';
import BaseButtons from '@/components/template/BaseButtons';
import BaseButton from '@/components/template/BaseButton';
import LoadingComponent from '@/components/template/loading';
import { COUNTRIES, EXPERIENCE, ProgrammingTools, TITLE } from '@/constants/data/select.constants';
import TexFieldPhoneComponent from '@/components/commons/field-phone.component';
import BaseDivider from '@/components/template/BaseDivider';
import WithPrivateRoute from '@/layouts/withPrivateRoute';
import CardBoxModal from '@/components/template/CardBoxModal';
import { useDeveloper } from '@/context/useDeveloper';
import ToastComponent from '@/components/ui/Toast';

const ProfilePage = () => {
  const { user, updateUserDB, loading } = useAuth();
  const { createProfile, loading: ladingDeveloper, success, error, profile, getProfile, complete } = useDeveloper();
  const [skillsData, setSkillsData] = useState(ProgrammingTools);
  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [modalText, setModalText] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    if (user && !profile) {
      getProfile();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      setSkills(profile?.skills);
    }
  }, [profile]);

  const removeSkill = (key: number, skillValue: string) => {
    const newSkills = skills.filter((skill, index) => index !== key);
    setSkills(newSkills);
    setSkillsData(skillsData.concat([skillValue]));
  };

  const addSkill = (value: string) => {
    const updatedItems = [...skills, value];
    setSkills(updatedItems);
  };

  const handleSubmit = (values: any) => {
    if (skills.length === 0) {
      setIsModalInfoActive(true);
      setModalText('Skills is required');
    } else {
      Object.assign(values, {
        skills,
      });
      createProfile(values);
    }
    // router.push('/dashboard');
  };

  const handleModalAction = () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setIsModalInfoActive(false);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  };

  const uploadImage = (image: string) => {
    updateUserDB({ photo: image });
  };

  const modalSampleContents = <p>{modalText}</p>;

  if (!user || !complete) {
    return <LoadingComponent loading />;
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Profile')}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      {loading || (ladingDeveloper && <LoadingComponent loading />)}
      <SectionMain>
        <CardBoxModal
          title="Ouups!"
          buttonColor="danger"
          buttonLabel="Close"
          isActive={isModalInfoActive}
          onConfirm={handleModalAction}
        >
          {modalSampleContents}
        </CardBoxModal>
        {success && <ToastComponent text={success} />}
        {error && <ToastComponent text={error} color="red" />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="">
            <CardBox className="mb-6">
              <FormField label="Avatar" help="Max 500kb">
                <FormFilePicker label="Upload" icon={mdiUpload} uploadImage={uploadImage} accept="image/*" />
              </FormField>
            </CardBox>

            <CardBox className="flex-1" hasComponentLayout>
              <Formik
                initialValues={user}
                // eslint-disable-next-line no-alert
                onSubmit={(values) => handleSubmit(values)}
              >
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>
                    <div className="grid gap-4 md:grid-cols-2 xs:grid-cols-1">
                      <FormField label="Name" help="Required. Your name" labelFor="name" icons={[mdiAccount]}>
                        <Field name="displayName" id="displayName" placeholder="Name" />
                      </FormField>
                      <FormField label="E-mail" labelFor="email" icons={[mdiMail]}>
                        <Field name="email" id="email" placeholder="E-mail" disabled />
                      </FormField>

                      <FormField label="Phone" help="">
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
                    </div>
                  </CardBoxComponentBody>
                  <CardBoxComponentFooter>
                    <BaseButtons>
                      <BaseButton color="info" type="submit" label="Save" />
                    </BaseButtons>
                  </CardBoxComponentFooter>
                </Form>
              </Formik>
            </CardBox>
          </div>

          <CardBox hasComponentLayout>
            <Formik
              initialValues={profile || { title: '' }}
              // eslint-disable-next-line no-alert
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                  <FormField label="Title" labelFor="title">
                    <Field name="title" id="title" component="select" required>
                      {TITLE.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </Field>
                  </FormField>
                  <BaseDivider />

                  <FormField label="Tell us why are you special" help="" labelFor="description" hasTextareaHeight>
                    <Field name="description" as="textarea" id="description" type="text" required />
                  </FormField>

                  <p className="block font-bold my-2">Tell us what your powers are</p>

                  <FormField label="" labelFor="skill">
                    <Field
                      name="skill"
                      id="skills"
                      component="select"
                      onChange={(event: any) => {
                        addSkill(event.target.value);
                        const newData = skillsData.filter((item: string) => item !== event.target.value);
                        setSkillsData(newData);
                      }}
                    >
                      {skillsData.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </Field>
                  </FormField>

                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 w-9/12">
                            Skill
                          </th>
                          <th scope="col" className="px-6 py-3 w-3/12">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {skills.map((skill, key) => (
                          <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 
                            hover:bg-gray-50 dark:hover:bg-gray-600"
                            // eslint-disable-next-line react/no-array-index-key
                            key={key}
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {skill}
                            </th>
                            <td className="px-6 py-4">
                              <button
                                type="button"
                                onClick={() => removeSkill(key, skill)}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <BaseDivider />

                  <FormField label="Experience" labelFor="experience">
                    <Field name="experience" id="experience" component="select" required>
                      {EXPERIENCE.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </Field>
                  </FormField>

                  <FormField label="Github" help="" labelFor="github" icons={[mdiGithub]}>
                    <Field name="github" id="github" type="text" autoComplete="github" />
                  </FormField>

                  <FormField label="Linkedin" help="" labelFor="linkedin" icons={[mdiLinkedin]}>
                    <Field name="linkedin" id="linkedin" type="text" autoComplete="linkedin" />
                  </FormField>

                  <FormField label="Web Page" help="" labelFor="website" icons={[mdiWeb]}>
                    <Field name="website" id="website" type="text" autoComplete="web" />
                  </FormField>
                </CardBoxComponentBody>

                <CardBoxComponentFooter>
                  <BaseButtons>
                    <BaseButton color="info" type="submit" label="Submit" />
                  </BaseButtons>
                </CardBoxComponentFooter>
              </Form>
            </Formik>
          </CardBox>
        </div>
      </SectionMain>
    </>
  );
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

ProfilePage.Auth = WithPrivateRoute;

export default ProfilePage;
