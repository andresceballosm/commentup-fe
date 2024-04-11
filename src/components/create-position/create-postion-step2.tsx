import InputRich from '@/components/commons/text-input-rich.component';
import BaseButton from '@/components/template/BaseButton';
import BaseButtons from '@/components/template/BaseButtons';
import BaseDivider from '@/components/template/BaseDivider';
import FormField from '@/components/template/FormField';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';

const Step2 = ({ nextStep, description, setDescription, setRequirements, requirements, cancel }: any) => {
  const [editor] = useState(() => withReact(createEditor()));
  const [editorRequirements] = useState(() => withReact(createEditor()));
  const router = useRouter();

  const valid =
    editor?.children.length === 1 &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    editor?.children[0]?.children.length === 1 &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (editor?.children[0]?.children[0].text === '...' || editor?.children[0]?.children[0].text === '..');

  return (
    <Formik initialValues={{ description: '' }} onSubmit={(values) => nextStep(values)}>
      <Form>
        <div className="grid gap-4 md:grid-cols-1 xs:grid-cols-1">
          <FormField label="Description" hasTextareaHeight>
            <InputRich
              editor={editor}
              widthBorder
              placeholder=""
              initialValue={description}
              inputWidth="100%"
              setValue={(item: string) => setDescription(JSON.parse(item))}
            />
          </FormField>
          <FormField label="Requirements" hasTextareaHeight>
            <InputRich
              editor={editorRequirements}
              widthBorder
              placeholder=""
              initialValue={requirements}
              inputWidth="100%"
              setValue={(item: string) => setRequirements(JSON.parse(item))}
            />
          </FormField>
        </div>
        <BaseDivider />
        <BaseButtons>
          <BaseButton type="submit" label="Next" color="info" disabled={valid} />
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

export default Step2;
