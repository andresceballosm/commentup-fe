import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  type: 'checkbox' | 'radio' | 'switch';
  label?: string;
  className?: string;
};

const FormCheckRadio = ({ children, className, label, type }: Props) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={`${type} ${className}`}>
    {children}
    <span className="check" />
    <span className="pl-2">{label}</span>
  </label>
);

export default FormCheckRadio;
