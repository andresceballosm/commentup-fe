import BaseButton from '@/components/template/BaseButton';
import BaseButtons from '@/components/template/BaseButtons';
import BaseDivider from '@/components/template/BaseDivider';
import FormField from '@/components/template/FormField';
import { TYPE_CONTRACT } from '@/constants/data/select.constants';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';

const Step1 = ({ nextStep, initValues, cancel }: any) => {
  const router = useRouter();
  return (
    <Formik initialValues={initValues} onSubmit={(values) => nextStep(values)}>
      <Form>
        <div className="grid gap-4 md:grid-cols-1 xs:grid-cols-1">
          <FormField label="Position Title" help="Please enter position title">
            <Field name="title" required />
          </FormField>
          <FormField label="Location" help="Please enter location: San Francisco or Remote">
            <Field name="location" required />
          </FormField>
          <FormField label="Type Contract" labelFor="type">
            <Field name="type" id="type" component="select" required>
              {TYPE_CONTRACT.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Field>
          </FormField>
          <FormField label="Salary" help="Please enter salary range: Confidential or USD 80.000 - 100.000 year ">
            <Field name="salary" />
          </FormField>
        </div>

        <BaseDivider />

        <BaseButtons>
          <BaseButton type="submit" label="Next" color="info" />
          <BaseButton
            onClick={() => (cancel ? cancel() : router.push('/dashboard'))}
            label="Cancel"
            color="danger"
            outline
          />
        </BaseButtons>
      </Form>
    </Formik>
  );
};

export default Step1;
