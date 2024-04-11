import { Children, cloneElement, ReactElement, ReactNode } from 'react';

type Props = {
  isColumn?: boolean;
  children: ReactNode;
};

const FormCheckRadioGroup = ({ children, isColumn }: Props) => (
  // eslint-disable-next-line react/jsx-no-comment-textnodes

  <div className={`flex justify-start flex-wrap -mb-3 ${isColumn ? 'flex-col' : ''}`}>
    {Children.map(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      children,
      (child: ReactElement) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cloneElement(child, { className: `mr-6 mb-3 last:mr-0 ${child.className}` }),
    )}
  </div>
);

export default FormCheckRadioGroup;
