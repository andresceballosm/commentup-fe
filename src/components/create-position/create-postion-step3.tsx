import BaseButton from '@/components/template/BaseButton';
import BaseButtons from '@/components/template/BaseButtons';
import BaseDivider from '@/components/template/BaseDivider';
import FormCheckRadio from '@/components/template/FormCheckRadio';
import FormField from '@/components/template/FormField';
import { LANGUAGES } from '@/constants/data/select.constants';
import { Field, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Step3 = ({ nextStep, initValues, cancel }: any) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [positionSteps, setPositionSteps] = useState<string[]>([
    'pending',
    'in-review',
    'hr-interview',
    'rejected',
    'hired',
  ]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const [valueStep, setValueStep] = useState('');
  const [questionValue, setQuestionValue] = useState('');
  const [showQuestionField, setShowQuestionField] = useState<boolean>(false);
  const router = useRouter();

  const addSkill = () => {
    if (value) {
      const updatedItems = [...skills, value];
      setSkills(updatedItems);
      setValue('');
    }
  };

  const addStep = () => {
    if (valueStep) {
      const updatedItems = [...positionSteps, valueStep];
      setPositionSteps(updatedItems);
      setValueStep('');
    }
  };

  const addQuestion = () => {
    if (questionValue) {
      const updatedItems = [...questions, questionValue];
      setQuestions(updatedItems);
      setQuestionValue('');
    }
  };

  const removeSkill = (key: number) => {
    const newSkills = skills.filter((skill, index) => index !== key);
    setSkills(newSkills);
  };

  const removeStep = (key: number) => {
    const newPositionSteps = positionSteps.filter((step, index) => index !== key);
    setPositionSteps(newPositionSteps);
  };

  const removeQuestion = (key: number) => {
    const newQuestions = questions.filter((question, index) => index !== key);
    setSkills(newQuestions);
  };

  const onPressSubmit = (values: any) => nextStep(values, skills, positionSteps, questions);

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: (values) => {
      onPressSubmit(values);
    },
  });

  useEffect(() => {
    if (formik.values?.ownQuestions) {
      if (formik.values?.ownQuestions.length > 0) {
        setShowQuestionField(true);
      } else {
        setShowQuestionField(false);
      }
    }
  }, [formik.values]);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-4 md:grid-cols-1 xs:grid-cols-1">
          <FormField label="Language for questions" labelFor="language">
            <Field name="language" id="language" component="select" required>
              {LANGUAGES.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Field>
          </FormField>
          <p className="block font-bold mb-2">Social Network</p>
          <div className="flex">
            <FormCheckRadio type="switch" label="Linkedin">
              <Field type="checkbox" name="linkedin" value="linkedin" />
            </FormCheckRadio>
            <FormCheckRadio className="ml-10" type="switch" label="Github">
              <Field type="checkbox" name="github" value="github" />
            </FormCheckRadio>
            <FormCheckRadio className="ml-10" type="switch" label="Twitter">
              <Field type="checkbox" name="twitter" value="twitter" />
            </FormCheckRadio>
          </div>
          <BaseDivider />
          <p className="block font-bold mb-2">Questions for reviewing Fit</p>
          <div>
            <FormCheckRadio type="switch" label="I want to create my own questions to validate fit">
              <Field type="checkbox" name="ownQuestions" value="ownQuestions" />
            </FormCheckRadio>
          </div>
          {showQuestionField && (
            <>
              <div className="flex items-center">
                <div className="w-8/12">
                  <div className="mb-6">
                    <label htmlFor="question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Question
                      <input
                        type="text"
                        onChange={(event) => setQuestionValue(event.target.value)}
                        id="question"
                        name="question"
                        value={questionValue}
                        className="block w-full p-4 text-gray-900 border border-gray-300 
                        rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </label>
                  </div>
                </div>
                <div className="w-4/12 pl-10">
                  <BaseButton
                    label="ADD"
                    color="info"
                    onClick={addQuestion}
                    disabled={questionValue === '' || questions.length > 2}
                  />
                </div>
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 w-9/12">
                        Question
                      </th>
                      <th scope="col" className="px-6 py-3 w-3/12">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((question, key) => (
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
                          {question}
                        </th>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => removeQuestion(key)}
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
            </>
          )}
          <BaseDivider />
          <p className="block font-bold mb-2">Steps</p>
          <p>What are the hiring steps for this position? Add in the order in which the candidate is advancing</p>
          <div className="flex items-center">
            <div className="w-8/12">
              <div className="mb-6">
                <label htmlFor="skill" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Step
                  <input
                    type="text"
                    onChange={(event) => setValue(event.target.value)}
                    id="skill"
                    name="skill"
                    value={value}
                    className="block w-full p-4 text-gray-900 border border-gray-300 
                    rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </label>
              </div>
            </div>
            <div className="w-4/12 pl-10">
              <BaseButton
                label="ADD"
                color="info"
                onClick={addStep}
                disabled={valueStep === '' || positionSteps.length > 2}
              />
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-9/12">
                    Step
                  </th>
                  <th scope="col" className="px-6 py-3 w-3/12">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {positionSteps.map((step, key) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 
                    hover:bg-gray-50 dark:hover:bg-gray-600"
                    // eslint-disable-next-line react/no-array-index-key
                    key={key}
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {step}
                    </th>
                    {key > 0 && (
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => removeStep(key)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <BaseDivider />
        <p className="block font-bold mb-2">Skills</p>
        <p>What are the top 3 technical skills that you would like to evaluate in a candidate?</p>
        <div className="flex items-center">
          <div className="w-8/12">
            <div className="mb-6">
              <label htmlFor="skill" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Skill
                <input
                  type="text"
                  onChange={(event) => setValue(event.target.value)}
                  id="skill"
                  name="skill"
                  value={value}
                  className="block w-full p-4 text-gray-900 border border-gray-300 
                    rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
            </div>
          </div>
          <div className="w-4/12 pl-10">
            <BaseButton label="ADD" color="info" onClick={addSkill} disabled={value === '' || skills.length > 2} />
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {skill}
                  </th>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => removeSkill(key)}
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
        <BaseButtons>
          <BaseButton type="submit" label="Create" color="info" disabled={skills.length === 0} />
          <BaseButton
            onClick={() => (cancel ? cancel() : router.push('/dashboard'))}
            label="Cancel"
            color="danger"
            outline
          />
        </BaseButtons>
      </form>
    </FormikProvider>
  );
};
export default Step3;
