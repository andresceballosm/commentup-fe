import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import BaseButton from '@/components/template/BaseButton';
import BaseButtons from '@/components/template/BaseButtons';
import CardBox from '@/components/template/CardBox';
import FormField from '@/components/template/FormField';
import { COUNTRIES } from '@/constants/data/select.constants';
import TexFieldPhoneComponent from '@/components/commons/field-phone.component';

const ApplicationSchema = Yup.object().shape({
  country: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  phone: Yup.string().min(8, 'Too Short!').max(16, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Step2 = ({ handleSubmit, position, loading }: any) => (
  <CardBox>
    <Formik
      initialValues={{ name: '', email: '', country: '', phone: '', github: '', twitter: '', linkedin: '' }}
      validationSchema={ApplicationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <div className="grid gap-4 md:grid-cols-2 xs:grid-cols-1">
          <FormField label="Email">
            <Field type="email" name="email" required />
          </FormField>

          <FormField label="Name">
            <Field name="name" required />
          </FormField>

          <FormField label="Phone">
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
          {position?.linkedin && (
            <FormField label="Linkedin">
              <Field name="linkedin" />
            </FormField>
          )}
          {position?.twitter && (
            <FormField label="Twitter">
              <Field name="twitter" />
            </FormField>
          )}
          {position?.github && (
            <FormField label="Github">
              <Field name="github" />
            </FormField>
          )}
        </div>

        <BaseButtons className="mt-5">
          <BaseButton type="submit" label="Next" color="info" disabled={loading} />
        </BaseButtons>
      </Form>
    </Formik>
  </CardBox>
);
export default Step2;
