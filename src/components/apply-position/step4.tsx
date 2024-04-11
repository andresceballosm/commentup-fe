import { mdiAlert } from '@mdi/js';
import BaseButton from '@/components/template/BaseButton';
import BaseButtons from '@/components/template/BaseButtons';
import CardBox from '@/components/template/CardBox';
import FormCheckRadio from '@/components/template/FormCheckRadio';
import FormCheckRadioGroup from '@/components/template/FormCheckRadioGroup';
import NotificationBar from '@/components/template/NotificationBar';
import { IQuestions, ITestQuestion } from '@/interfaces';
import { Field, Form, Formik } from 'formik';

type Props = {
  handleSubmit: (values: any) => void;
  questions: IQuestions;
};

const Step4 = ({ handleSubmit, questions }: Props) => {
  const handleOnClick = (values: any) => {
    const { question1, question2, question3, question4, question5 } = values;
    if (
      typeof question1 === 'string' &&
      typeof question2 === 'string' &&
      typeof question3 === 'string' &&
      typeof question4 === 'string' &&
      typeof question5 === 'string'
    ) {
      handleSubmit(values);
    }
  };
  return (
    <CardBox>
      <NotificationBar color="warning" icon={mdiAlert}>
        <b>IMPORTANT!</b>. Avoid switching tabs, it could lower your score in trying to answer as quickly as possible
      </NotificationBar>
      <Formik
        initialValues={{ question1: [''], question2: [''], question3: [''], question4: [''], question5: [''] }}
        onSubmit={(values) => handleOnClick(values)}
      >
        <Form>
          <div className="grid gap-4 md:grid-cols-1 xs:grid-cols-1">
            {questions.questionsTest.map((question: ITestQuestion, key: number) => (
              <div className="mb-5">
                <p className="font-bold mb-5">{question.question}</p>
                <FormCheckRadioGroup>
                  {question.options.map((item: string, index: number) => (
                    <FormCheckRadio type="radio" label={item}>
                      <Field type="radio" name={`question${key + 1}`} value={item} />
                    </FormCheckRadio>
                  ))}
                </FormCheckRadioGroup>
              </div>
            ))}
          </div>
          <BaseButtons className="mt-5">
            <BaseButton type="submit" label="SEND" color="info" />
          </BaseButtons>
        </Form>
      </Formik>
    </CardBox>
  );
};
export default Step4;
