import {
  mdiAlert,
  mdiAlertCircle,
  mdiCheckCircle,
  mdiClose,
  mdiContrastCircle,
  mdiInformation,
  mdiOpenInNew,
  mdiReload,
  mdiTrendingUp,
} from '@mdi/js';
import { Field, Formik } from 'formik';
import Head from 'next/head';
import { useState } from 'react';
import type { ReactElement } from 'react';
import BaseButton from '../components/template/BaseButton';
import BaseButtons from '../components/template/BaseButtons';
import BaseDivider from '../components/template/BaseDivider';
import CardBox from '../components/template/CardBox';
import CardBoxComponentEmpty from '../components/template/CardBoxComponentEmpty';
import CardBoxComponentTitle from '../components/template/CardBoxComponentTitle';
import CardBoxModal from '../components/template/CardBoxModal';
import FormCheckRadio from '../components/template/FormCheckRadio';
import FormCheckRadioGroup from '../components/template/FormCheckRadioGroup';
import LayoutAuthenticated from '../layouts/authenticated';
import NotificationBar from '../components/template/NotificationBar';
import PillTag from '../components/template/PillTag';
import SectionMain from '../components/template/SectionMain';
import SectionTitle from '../components/template/SectionTitle';
import SectionTitleLineWithButton from '../components/template/SectionTitleLineWithButton';
import { useAppDispatch } from '../stores/hooks';
import { setDarkMode } from '../stores/styleSlice';
import { getPageTitle } from '../config';

const UiPage = () => {
  const dispatch = useAppDispatch();

  const CardSamplesFooter = (
    <BaseButtons>
      <BaseButton label="Confirm" color="info" />
      <BaseButton label="Cancel" color="info" outline />
    </BaseButtons>
  );

  const modalSampleCardClassName = 'cursor-pointer md:w-7/12 lg:w-5/12 shadow-2xl md:mx-auto';

  const modalSampleContents = (
    <>
      <p>
        Lorem ipsum dolor sit amet <b>adipiscing elit</b>
      </p>
      <p>This is sample modal</p>
    </>
  );

  const modalFooterInfo = (
    <BaseButtons>
      <BaseButton label="Confirm" color="info" />
      <BaseButton label="Cancel" color="info" outline />
    </BaseButtons>
  );

  const modalFooterDanger = (
    <BaseButtons>
      <BaseButton label="Done" color="danger" />
    </BaseButtons>
  );

  const modalFooterSuccess = (
    <BaseButtons>
      <BaseButton label="Done" color="success" />
    </BaseButtons>
  );

  const handleModalAction = () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setIsModalInfoActive(false);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setIsModalDangerActive(false);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setIsModalSuccessActive(false);
  };

  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalDangerActive, setIsModalDangerActive] = useState(false);
  const [isModalSuccessActive, setIsModalSuccessActive] = useState(false);

  return (
    <>
      <Head>
        <title>{getPageTitle('UI')}</title>
      </Head>
      <SectionTitle first>Dark mode</SectionTitle>
      <SectionMain>
        <CardBox className="md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto">
          <div className="text-center py-24 lg:py-12 text-gray-500 dark:text-slate-400">
            <BaseButton label="Toggle" color="contrast" onClick={() => dispatch(setDarkMode(null))} />
          </div>
        </CardBox>
      </SectionMain>
      <SectionTitle>Modal examples</SectionTitle>
      <CardBoxModal
        title="Please confirm action"
        buttonColor="info"
        buttonLabel="Confirm"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        {modalSampleContents}
      </CardBoxModal>
      <CardBoxModal
        title="Unhandled exception"
        buttonColor="danger"
        buttonLabel="Done"
        isActive={isModalDangerActive}
        onConfirm={handleModalAction}
      >
        {modalSampleContents}
      </CardBoxModal>
      <CardBoxModal
        title="Success"
        buttonColor="success"
        buttonLabel="Done"
        isActive={isModalSuccessActive}
        onConfirm={handleModalAction}
      >
        {modalSampleContents}
      </CardBoxModal>
      <SectionMain>
        <div className="space-y-12">
          <CardBox
            className={modalSampleCardClassName}
            footer={modalFooterInfo}
            onClick={() => setIsModalInfoActive(true)}
            isHoverable
          >
            <CardBoxComponentTitle title="Please confirm action">
              <BaseButton icon={mdiClose} color="whiteDark" small roundedFull />
            </CardBoxComponentTitle>
            <div className="space-y-3">
              <p>Click to see in action</p>
            </div>
          </CardBox>

          <CardBox
            className={modalSampleCardClassName}
            footer={modalFooterDanger}
            onClick={() => setIsModalDangerActive(true)}
            isHoverable
          >
            <CardBoxComponentTitle title="Unhandled exception" />

            <div className="space-y-3">
              <p>Click to see in action</p>
            </div>
          </CardBox>

          <CardBox
            className={modalSampleCardClassName}
            footer={modalFooterSuccess}
            onClick={() => setIsModalSuccessActive(true)}
            isHoverable
          >
            <CardBoxComponentTitle title="Success" />

            <div className="space-y-3">
              <p>Click to see in action</p>
            </div>
          </CardBox>
        </div>
      </SectionMain>

      <Formik
        initialValues={{ outline: false }}
        // eslint-disable-next-line no-console
        onSubmit={() => console.log('click')}
      >
        {({ values }) => (
          <>
            <SectionTitle custom>
              <h1 className="text-2xl text-gray-500 dark:text-slate-400">Notifications</h1>
              <div className="flex items-center justify-center mt-6">
                <FormCheckRadio type="switch" label="Outline">
                  <Field type="checkbox" name="outline" />
                </FormCheckRadio>
              </div>
            </SectionTitle>

            <SectionMain>
              <NotificationBar
                color="info"
                icon={mdiInformation}
                button={
                  <BaseButton
                    color={values.outline ? 'info' : 'white'}
                    label="Button"
                    roundedFull
                    small
                    outline={values.outline}
                  />
                }
                outline={values.outline}
              >
                <b>Info state</b>. NotificationBar
              </NotificationBar>

              <NotificationBar
                color="success"
                icon={mdiCheckCircle}
                button={
                  <BaseButton
                    color={values.outline ? 'success' : 'white'}
                    label="Button"
                    roundedFull
                    small
                    outline={values.outline}
                  />
                }
                outline={values.outline}
              >
                <b>Success state</b>. NotificationBar
              </NotificationBar>

              <NotificationBar
                color="warning"
                icon={mdiAlert}
                button={
                  <BaseButton
                    color={values.outline ? 'warning' : 'white'}
                    label="Button"
                    roundedFull
                    small
                    outline={values.outline}
                  />
                }
                outline={values.outline}
              >
                <b>Warning state</b>. NotificationBar
              </NotificationBar>

              <NotificationBar
                color="danger"
                icon={mdiAlertCircle}
                button={
                  <BaseButton
                    color={values.outline ? 'danger' : 'white'}
                    label="Button"
                    roundedFull
                    small
                    outline={values.outline}
                  />
                }
                outline={values.outline}
              >
                <b>Danger state</b>. NotificationBar
              </NotificationBar>

              <NotificationBar color="contrast" icon={mdiContrastCircle} outline={values.outline}>
                <b>Contrast</b>. NotificationBar
              </NotificationBar>
            </SectionMain>
          </>
        )}
      </Formik>
      <SectionTitle>Buttons</SectionTitle>
      <SectionMain>
        <CardBox>
          <Formik
            initialValues={{ outline: false, small: false, rounded: false, disabled: false }}
            // eslint-disable-next-line no-console
            onSubmit={() => console.log('click')}
          >
            {({ values }) => (
              <>
                <FormCheckRadioGroup>
                  <FormCheckRadio type="switch" label="Outline">
                    <Field type="checkbox" name="outline" />
                  </FormCheckRadio>
                  <FormCheckRadio type="switch" label="Small">
                    <Field type="checkbox" name="small" />
                  </FormCheckRadio>
                  <FormCheckRadio type="switch" label="Rounded">
                    <Field type="checkbox" name="rounded" />
                  </FormCheckRadio>
                  <FormCheckRadio type="switch" label="Disabled">
                    <Field type="checkbox" name="disabled" />
                  </FormCheckRadio>
                </FormCheckRadioGroup>

                <BaseDivider />

                <BaseButtons>
                  <BaseButton
                    color="lightDark"
                    label="Button"
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="contrast"
                    label="Button"
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="info"
                    label="Button"
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="success"
                    label="Button"
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="warning"
                    label="Button"
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="danger"
                    label="Button"
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                </BaseButtons>

                <BaseDivider />

                <BaseButtons>
                  <BaseButton
                    color="lightDark"
                    label="Button"
                    icon={mdiOpenInNew}
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="contrast"
                    label="Button"
                    icon={mdiOpenInNew}
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="info"
                    label="Button"
                    icon={mdiOpenInNew}
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="success"
                    label="Button"
                    icon={mdiOpenInNew}
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="warning"
                    label="Button"
                    icon={mdiOpenInNew}
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="danger"
                    label="Button"
                    icon={mdiOpenInNew}
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                </BaseButtons>

                <BaseDivider />

                <BaseButtons>
                  <BaseButton
                    color="lightDark"
                    icon={mdiOpenInNew}
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="contrast"
                    icon={mdiOpenInNew}
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="info"
                    icon={mdiOpenInNew}
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="success"
                    icon={mdiOpenInNew}
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="warning"
                    icon={mdiOpenInNew}
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                  <BaseButton
                    color="danger"
                    icon={mdiOpenInNew}
                    outline={values.outline}
                    small={values.small}
                    roundedFull={values.rounded}
                    disabled={values.disabled}
                  />
                </BaseButtons>
              </>
            )}
          </Formik>
        </CardBox>
      </SectionMain>
      <SectionTitle>Pills</SectionTitle>
      <SectionMain>
        <CardBox>
          <Formik
            initialValues={{ outline: false, small: false, icon: true }}
            // eslint-disable-next-line no-console
            onSubmit={() => console.log('click')}
          >
            {({ values }) => (
              <>
                <FormCheckRadioGroup>
                  <FormCheckRadio type="switch" label="Outline">
                    <Field type="checkbox" name="outline" />
                  </FormCheckRadio>
                  <FormCheckRadio type="switch" label="Small">
                    <Field type="checkbox" name="small" />
                  </FormCheckRadio>
                  <FormCheckRadio type="switch" label="Icon">
                    <Field type="checkbox" name="icon" />
                  </FormCheckRadio>
                </FormCheckRadioGroup>
                <BaseDivider />
                <BaseButtons>
                  <PillTag
                    color="contrast"
                    label="Contrast"
                    icon={values.icon ? mdiTrendingUp : ''}
                    outline={values.outline}
                    small={values.small}
                  />
                  <PillTag
                    color="info"
                    label="Info"
                    icon={values.icon ? mdiTrendingUp : ''}
                    outline={values.outline}
                    small={values.small}
                  />
                  <PillTag
                    color="success"
                    label="Info"
                    icon={values.icon ? mdiTrendingUp : ''}
                    outline={values.outline}
                    small={values.small}
                  />
                  <PillTag
                    color="warning"
                    label="Info"
                    icon={values.icon ? mdiTrendingUp : ''}
                    outline={values.outline}
                    small={values.small}
                  />
                  <PillTag
                    color="danger"
                    label="Info"
                    icon={values.icon ? mdiTrendingUp : ''}
                    outline={values.outline}
                    small={values.small}
                  />
                </BaseButtons>
              </>
            )}
          </Formik>
        </CardBox>
      </SectionMain>
      <SectionTitle>Cards</SectionTitle>
      <SectionMain>
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          <CardBox footer={CardSamplesFooter}>
            <CardBoxComponentTitle title="With title & icon">
              <BaseButton icon={mdiReload} color="whiteDark" roundedFull />
            </CardBoxComponentTitle>
            <div className="space-y-3">
              <p>Card with title, icon & footer</p>
            </div>
          </CardBox>

          <CardBox footer={CardSamplesFooter}>Just body & footer</CardBox>
        </div>

        <SectionTitleLineWithButton icon={mdiAlertCircle} title="Empty variation" />

        <CardBox>
          <CardBoxComponentEmpty />
        </CardBox>
      </SectionMain>
    </>
  );
};

UiPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default UiPage;
