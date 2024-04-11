export interface Step {
  title: string;
  description: string;
  image: string;
}

type Props = {
  steps: Step[];
  selected: number;
};

const classNameDone =
  // eslint-disable-next-line max-len
  'absolute flex items-center justify-center w-8 h-8 bg-indigo-800 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-indigo-900';

const classNamePending =
  // eslint-disable-next-line max-len
  'absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700';

const Stepper = ({ steps, selected = 0 }: Props) => (
  <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
    {steps.map((step, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li className="mb-10 ml-6" key={index}>
        {selected === index ? (
          <span
            className="absolute flex items-center justify-center w-8 h-8 bg-indigo-800 rounded-full -left-4 ring-4 
            ring-white dark:ring-gray-900 dark:bg-indigo-900"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-slate-50 dark:text-slate-50"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 
                1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        ) : (
          <span className={selected > index ? classNameDone : classNamePending}>
            <svg
              aria-hidden="true"
              className={
                selected > index
                  ? 'w-5 h-5 text-slate-50 dark:text-slate-50'
                  : 'w-5 h-5 text-gray-500 dark:text-gray-400'
              }
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d={step.image} clipRule="evenodd" />
            </svg>
          </span>
        )}
        <h3 className="font-medium leading-tight">{step.title}</h3>
        <p className="text-sm">{step.description}</p>
      </li>
    ))}
  </ol>
);

export default Stepper;
