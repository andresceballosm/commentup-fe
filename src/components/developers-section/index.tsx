import { tw } from 'twind';
import Check from '@/constants/svg/check.svg';
import Link from 'next/link';

const DeveloperSection = () => (
  <section className={tw('bg-white pb-6')}>
    <div className={tw('max-w-7xl mx-auto p-4 sm:p-6 lg:p-8')}>
      <div className={tw('container mx-auto px-6 p-6 bg-white')}>
        <div className={tw('mb-16 text-center')}>
          <h4 className={tw('text-base text-indigo-600 font-semibold tracking-wide uppercase')}>Developers</h4>
          <p className={tw('mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900')}>
            How we change the game
          </p>
          <p className={tw('mt-10 leading-loose text-gray-500')}>
            Are you a talented, English-speaking Junior Developer in Latam with less than 1 year of experience or no
            experience at all? If you&apos;re passionate about technology and eager to demonstrate your skills,
            CommentUp is the platform for you. Join us to find exciting opportunities and showcase your talent in the
            development industry. Let CommentUp empower your career and help you reach your full potential as a Junior
            Developer.
          </p>
        </div>
        <div className={tw('flex flex-wrap my-12')}>
          <div className={tw('w-full border-b md:w-1/2 md:border-r lg:w-1/3 p-8')}>
            <div className={tw('flex items-center mb-6')}>
              <Check width={20} height={20} fill="currentColor" className={tw('h-6 w-6 text-indigo-500')} />
              <div className={tw('ml-4 text-xl')}>Join the network</div>
            </div>
            <p className={tw('leading-loose text-gray-500')}>
              Share your skills and accomplishment! Whether you&apos;re experienced or just starting out, we want to
              know what you can do. Register now and let your talent shine!
            </p>
          </div>
          <div className={tw('w-full border-b md:w-1/2 lg:w-1/3 lg:border-r p-8')}>
            <div className={tw('flex items-center mb-6')}>
              <Check width={20} height={20} fill="currentColor" className={tw('h-6 w-6 text-indigo-500')} />
              <div className={tw('ml-4 text-xl')}>Meet Your Match</div>
            </div>
            <p className={tw('leading-loose text-gray-500 ')}>
              When our North American clients are interested in your skills, we will connect you.
            </p>
          </div>
          <div className={tw('w-full border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0 p-8')}>
            <div className="flex items-center mb-6">
              <Check width={20} height={20} fill="currentColor" className={tw('h-6 w-6 text-indigo-500')} />
              <div className={tw('ml-4 text-xl')}>Get Hired</div>
            </div>
            <p className={tw('leading-loose text-gray-500')}>
              Once a match is successful, it&apos;s time to get you working with our client. You&apos;ll receive
              mentorship from a senior engineer in our network. Take your career to new heights with us.
            </p>
          </div>

          <div className={tw('mt-5 flex justify-center items-center w-3/6 mx-auto')}>
            <a
              href="/register"
              className="text-white bg-indigo-900 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            >
              <Link href="/register">JOIN ME</Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DeveloperSection;
