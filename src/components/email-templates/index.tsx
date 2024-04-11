import { useEffect, useState } from 'react';
import { IPosition, usePosition } from '@/context/positionContext';
import { Field, FormikProvider, useFormik } from 'formik';
import { withReact } from 'slate-react';
import { createEditor, Transforms } from 'slate';
import BaseButtons from '@/components/template/BaseButtons';
import BaseButton from '@/components/template/BaseButton';
import BaseDivider from '@/components/template/BaseDivider';
import InputRich from '@/components/commons/text-input-rich.component';
import FormField from '@/components/template/FormField';
import { EMAIL_BODY } from '@/components/email-templates/constants/email-body.constant';
import { serialize } from '@/utils/deserialize-html';
import { IEmailsTemplate } from '@/interfaces';
import LoadingComponent from '@/components/template/loading';

interface Props {
  position?: IPosition;
  status?: string;
}

const EmailTemplate = ({ status }: Props) => {
  const [editor] = useState(() => withReact(createEditor()));
  const { updatePositionEmailTemplates, position, loading } = usePosition();
  const [body, setBody] = useState(EMAIL_BODY);

  const [selected, setSelected] = useState(0);
  const inactiveStyle =
    // eslint-disable-next-line max-len
    'w-full px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700';
  const activeStyle =
    // eslint-disable-next-line max-len
    'w-full px-4 py-2 font-medium text-left text-white bg-indigo-700 border-b border-gray-200 rounded-t-lg cursor-pointer focus:outline-none';

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const valid = editor?.children.length === 1 && editor?.children[0]?.children[0].text === '...';
  const steps = position.steps.filter((step, index) => index > 0);

  const onSave = (values: any) => {
    const data = {
      subjet: values?.subjet,
      html: serialize(body),
      step: steps[selected],
      slate: body,
    };
    const emailsTemplate: IEmailsTemplate[] = position.emailsTemplate.map((emailTemplate: IEmailsTemplate) => {
      if (emailTemplate.step === steps[selected]) {
        return data;
      }
      return emailTemplate;
    });
    // eslint-disable-next-line no-underscore-dangle
    updatePositionEmailTemplates(position._id, emailsTemplate);
  };

  const formik = useFormik({
    initialValues: { subjet: '' },
    onSubmit: (values) => {
      onSave(values);
    },
  });

  const onChangeStatus = (index: number, step: string) => {
    const stepSelected = position.emailsTemplate.find((item: IEmailsTemplate) => item.step === step);
    let newBody;
    if (stepSelected?.subjet) {
      newBody = stepSelected.slate;
      setBody(stepSelected.slate);
      formik.setFieldValue('subjet', stepSelected.subjet);
    } else {
      newBody = EMAIL_BODY;
      setBody(EMAIL_BODY);
      formik.setFieldValue('subjet', '');
    }
    const totalNodes = editor.children.length;

    // No saved content, don't delete anything to prevent errors
    if (body.length <= 0) return;

    // Remove every node except the last one
    // Otherwise SlateJS will return error as there's no content
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < totalNodes - 1; i++) {
      Transforms.removeNodes(editor, {
        at: [totalNodes - i - 1],
      });
    }

    // Add content to SlateJS
    // eslint-disable-next-line no-restricted-syntax
    for (const value of newBody) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Transforms.insertNodes(editor, value, {
        at: [editor.children.length],
      });
    }

    // Remove the last node that was leftover from before
    Transforms.removeNodes(editor, {
      at: [0],
    });

    setSelected(index);
  };

  useEffect(() => {
    if (status) {
      const index = steps.findIndex((item: string) => item === status);
      onChangeStatus(index, status);
    }
  }, [status]);

  //   useEffect(() => {
  //     onChangeStatus(0, steps[0]);
  //   }, []);

  if (loading) {
    return <LoadingComponent loading />;
  }

  return (
    <div className="flex">
      <div className="w-1/4 w-48  mt-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
        <p className="mb-5 text-center">Position Status</p>
        {steps.map((step, index) => (
          <button
            onClick={() => onChangeStatus(index, step)}
            aria-current="true"
            type="button"
            className={index === selected ? activeStyle : inactiveStyle}
          >
            {step}
          </button>
        ))}
      </div>
      <div className="w-3/4 px-5 py-5">
        <p className="text-grays-700 mb-1">
          Please write the email that the candidate will receive when their application changes to {steps[selected]}
        </p>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 md:grid-cols-1 xs:grid-cols-1">
              <FormField label="Email subjet" help="Example: Update about FullStack postulation at CommentUp">
                <Field name="subjet" required />
              </FormField>
              <FormField label="Email body" hasTextareaHeight>
                <InputRich
                  editor={editor}
                  widthBorder
                  placeholder=""
                  initialValue={body}
                  inputWidth="100%"
                  setValue={(item: string) => setBody(JSON.parse(item))}
                />
              </FormField>
            </div>
            <BaseDivider />

            <BaseButtons>
              <BaseButton type="submit" label="Save" color="info" disabled={valid} />
            </BaseButtons>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default EmailTemplate;
