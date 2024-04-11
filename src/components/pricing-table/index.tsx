import Link from 'next/link';
import { tw } from 'twind';

const features = [
  {
    id: 0,
    name: 'Job Posting',
    disabled: false,
  },
  {
    id: 1,
    name: 'Applicant Tracking System',
    disabled: false,
  },
  {
    id: 2,
    name: 'Unlimited Member Teams',
    disabled: false,
  },
  {
    id: 3,
    name: 'Creation of Automated Tests for Candidates',
    disabled: false,
  },
  {
    id: 4,
    name: 'Filter candidates with AI',
    disabled: false,
  },
  {
    id: 5,
    name: 'Automated Emails',
    disabled: false,
  },
  {
    id: 6,
    name: 'Summary CV with AI',
    disabled: false,
  },
  // {
  //   id: 1,
  //   name: 'Unlimited team members',
  //   disabled: true,
  // },
];

const PricingTable = () => (
  <section className={tw('bg-gradient-to-b from-gray-100 to-white shadow-inner pt-12')}>
    <div className={tw('relative max-w-7xl mx-auto mb-24')}>
      <div className={tw('overflow-hidden lg:max-w-none lg:flex')}>
        <div className={tw('py-8 px-6 md:px-0 lg:flex-shrink-1')}>
          <h2 className={tw('text-4xl lg:text-7xl font-bold text-gray-800 mb-12')}>
            Pricing{' '}
            <span className="text-3xl text-indigo-900">
              &#40;First Job Posting <b>FREE</b> &#41;
            </span>
          </h2>

          {/* <p className={tw('mt-6 text-base leading-6 text-gray-500')}>
            Simple and flexible. Only pay for what you use. Prices are per 1 token.
            <br />
            You can think of tokens as pieces of words, where 1,000 tokens are about 750 words. This paragraph is 35
            tokens. When you analyze your comments, the characters analyzed are counted as used tokens and thus the
            price of the analysis is determined.
          </p> */}
          <p>
            In <b>CommentUp</b>, you are charged based on the number of open positions you have per month.
          </p>

          <div className={tw('mt-8')}>
            {/* <div className={tw('flex items-center')}>
              <h3
                className={tw(
                  `flex-shrink-0 pr-4 text-sm leading-5
                tracking-wider font-semibold uppercase text-indigo-600`,
                )}
              >
                What is included
              </h3>
              <div className={tw('flex-1 border-t-2 border-gray-200')} />
            </div>
            <ul className={tw('mt-8 lg:grid lg:grid-cols-2')}>
              {features.map((feature) => (
                <li className={tw('flex items-center lg:col-span-1')} key={feature}>
                  <div className={tw('flex-shrink-0')}>
                    <Check className={tw('h-8 w-8 mr-3 mb-1')} />
                  </div>
                  <p className={tw('text-gray-600')}>{feature}</p>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
        <div
          className={tw(
            `py-8 px-6 text-center lg:flex-shrink-0
            lg:flex lg:flex-col lg:justify-center lg:p-12`,
          )}
        >
          {/* <p className={tw('text-lg font-medium text-gray-800')}>If you order now...</p>
          <div className={tw('my-4 flex items-center justify-center text-4xl leading-none font-bold text-gray-800')}>
            FREE
          </div>
          <Button primary modifier="mt-6">
            <Link href="/chat">Get started</Link>
          </Button> */}

          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Standard plan</h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-3xl font-semibold">$</span>
              <span className="text-5xl font-extrabold tracking-tight">15</span>
              <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">job/month</span>
            </div>

            <ul className="space-y-5 my-7">
              {features.map((item) => (
                <li
                  className={item.disabled ? 'flex space-x-3 line-through decoration-gray-500' : 'flex space-x-3'}
                  key={item.id}
                >
                  <svg
                    aria-hidden="true"
                    className={
                      !item.disabled
                        ? 'flex-shrink-0 w-5 h-5 text-indigo-600 dark:text-blue-500'
                        : 'flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500'
                    }
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Check icon</title>
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    className={
                      !item.disabled
                        ? 'text-base font-normal leading-tight text-gray-500 dark:text-gray-400'
                        : 'text-base font-normal leading-tight text-gray-500'
                    }
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-gray-500 small mb-2">
              Try <b>CommentUp</b> with your first job posting absolutely <b>Free</b>, and there`s no need to provide
              credit card information.
            </p>
            <a
              href="/login"
              className="text-white bg-indigo-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            >
              <Link href="/login">Join Me</Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PricingTable;
