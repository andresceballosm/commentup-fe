export interface Step {
  title: string;
  description: string;
}

type Props = {
  steps: Step[];
  selected: number;
};

const StepperHorizontal = ({ steps, selected = 0 }: Props) => (
  <ol className="flex items-center">
    {steps.map((step, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li className="relative w-full mb-6" key={index}>
        {selected === index || selected > index ? (
          <>
            <div className="flex items-center">
              <div
                className="z-10 flex items-center justify-center w-6 h-6 bg-indigo-200 
              rounded-full ring-0 ring-white sm:ring-8 shrink-0"
              >
                <span className="flex w-3 h-3 bg-indigo-600 rounded-full" />
              </div>
              <div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
            </div>
            <div className="mt-3 items-center">
              <h3 className="font-medium text-gray-900 dark:text-white text-mr-10">{step.title}</h3>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center">
              <div
                className="z-10 flex items-center justify-center w-6 h-6 bg-gray-200 
              rounded-full ring-0 ring-white sm:ring-8 shrink-0"
              >
                <span className="flex w-3 h-3 bg-indigo-900 rounded-full dark:bg-gray-300" />
              </div>
              {index < steps.length && <div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />}
            </div>
            <div className="mt-3">
              <h3 className="font-medium text-gray-900 dark:text-white mr-10">{step.title}</h3>
            </div>
          </>
        )}
      </li>
    ))}
  </ol>
);

export default StepperHorizontal;
