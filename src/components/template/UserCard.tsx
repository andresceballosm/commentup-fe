import { useAuth } from '@/context/authContext';
import { mdiCheckDecagram } from '@mdi/js';
import { Field, Form, Formik } from 'formik';
import { useAppSelector } from '../../stores/hooks';
import CardBox from './CardBox';
import FormCheckRadio from './FormCheckRadio';
import PillTag from './PillTag';
import UserAvatarCurrentUser from './UserAvatarCurrentUser';

type Props = {
  className?: string;
};

const UserCard = ({ className }: Props) => {
  const { user } = useAuth();
  const userName = user?.displayName;
  const email = user?.email;

  return (
    <CardBox className={className}>
      <div className="flex flex-col lg:flex-row items-center justify-around lg:justify-center">
        <UserAvatarCurrentUser className="mb-6 lg:mb-0 lg:mx-12" />
        <div className="space-y-3 text-center md:text-left lg:mx-12">
          <div className="flex justify-center md:block">
            <Formik
              initialValues={{
                notifications: ['1'],
              }}
              // eslint-disable-next-line no-alert
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              <Form>
                <FormCheckRadio type="switch" label="Notifications">
                  <Field type="checkbox" name="notifications" value="1" />
                </FormCheckRadio>
              </Form>
            </Formik>
          </div>
          <h1 className="text-2xl">
            <b>{userName}</b>!
          </h1>
          <p className="text-2xl">
            Email, <b>{email}</b>!
          </p>
          {/* <p>
            Last login <b>12 mins ago</b> from <b>127.0.0.1</b>
          </p> */}
          <div className="flex justify-center md:block">
            <PillTag label="Verified" color="info" icon={mdiCheckDecagram} />
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default UserCard;
