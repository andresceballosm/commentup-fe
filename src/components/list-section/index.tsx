import { tw } from 'twind';
import FeatureSvg from '@/constants/svg/features.svg';

const listItems = [
  {
    title: 'Search and selection of Junior developers in Latin America',
    description:
      'Accesses our platform and searches through our pool of developers to find Junior candidates. You can use filters and specific criteria to find profiles that fit their needs.',
  },
  {
    title: 'Interview and candidate selection',
    description:
      'Once you have identified the Junior developers they are interested in, you have the option to interview the candidates to assess their suitability. You can schedule and conduct the interviews through our platform. After the interviews, you chooses the Junior developer they want to hire.',
  },
  {
    title: 'Provision of the candidate and mentorship from a Senior developer',
    description:
      "Once you've selected the Junior developer, we take care of providing the chosen candidate. In addition, we offer valuable mentorship from a Senior developer. This mentor will guide the Junior developer, providing support in technical skills, problem-solving, and assistance in case of technical doubts or the need for help.",
  },
  {
    title: 'Management of worked hours and payments',
    description:
      'You log into our platform to review the hours worked by the Junior developer. Our system accurately records the hours dedicated to each project or task. You make the corresponding payment through our platform, and we take care of remunerating the Junior developer and managing any other aspects related to payment and compensation.',
  },
  // {
  //   title: `Product owners`,
  //   description: `Ullamco consectetur ipsum eiusmod nisi adipisicing sint anim
  //   dolore aute excepteur. Voluptate ea ullamco sunt eu elit qui aliquip.
  //   Adipisicing.`,
  // },
];

const ListSection = () => (
  <section className={tw('lg:py-28 overflow-hidden')}>
    <div className={tw('max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white')}>
      <div className={tw('mb-16 text-center')}>
        <h2 className={tw('text-base text-indigo-600 font-semibold tracking-wide uppercase')}>How Works</h2>
        <p className={tw('mt-2 pb-4 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900')}>
          Get Hired Faster with CommentUp
        </p>
      </div>
      <div className={tw('flex flex-wrap -mx-8 items-center')}>
        <div className={tw('w-full lg:w-1/2 px-8')}>
          <ul className={tw('space-y-12')}>
            {listItems.map((item, index) => (
              <li className={tw('flex -mx-4')} key={item.title}>
                <div className={tw('px-4')}>
                  <span
                    className={tw(`flex w-16 h-16 mx-auto items-center
                      justify-center text-2xl font-bold rounded-full
                      bg-blue-50 text-blue-500`)}
                  >
                    {index + 1}
                  </span>
                </div>
                <div className={tw('px-4')}>
                  <h3 className={tw('my-4 text-xl font-semibold')}>{item.title}</h3>
                  <p className={tw('text-gray-500 leading-loose')}>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={tw('w-full lg:w-1/2 px-8')}>
          <div className={tw('lg:mb-12 lg:mb-0 pb-12 lg:pb-0 mt-16 lg:mt-0 mx-6 lg:mx-0')}>
            <FeatureSvg width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ListSection;
