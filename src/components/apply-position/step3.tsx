import { Field, Form, Formik } from 'formik';
import BaseButton from '@/components/template/BaseButton';
import BaseButtons from '@/components/template/BaseButtons';
import CardBox from '@/components/template/CardBox';
import FormField from '@/components/template/FormField';
import { IQuestions } from '@/interfaces';

type Props = {
  handleSubmit: (values: any) => void;
  questions: IQuestions;
};

const Step3 = ({ handleSubmit, questions }: Props) => (
  <CardBox>
    <Formik
      initialValues={{ question1: '', question2: '', question3: '', question4: '', question5: '' }}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <div className="grid gap-4 md:grid-cols-1 xs:grid-cols-1">
          {questions.questions.map((item: string, index) => (
            <FormField label={item} hasTextareaHeight>
              <Field name={`question${index + 1}`} as="textarea" required />
            </FormField>
          ))}
        </div>
        <BaseButtons className="mt-5">
          <BaseButton type="submit" label="Next" color="info" />
        </BaseButtons>
      </Form>
    </Formik>
  </CardBox>
);

export default Step3;
