import Link from 'next/link';
import { tw } from 'twind';

const BookCall = () => (
  <section className={tw('bg-white pb-6')}>
    <div className={tw('max-w-7xl mx-auto p-4 sm:p-6 lg:p-8')}>
      <div className={tw('container mx-auto px-6 p-6 bg-white')}>
        <div className={tw('mb-16 text-center')}>
          <h4 className={tw('text-base text-indigo-600 font-semibold tracking-wide uppercase')}>Contact Us</h4>
          <p className={tw('mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900')}>
            Let&apos;s talk about CommentUp
          </p>
        </div>
        <div className="flex items-center justify-center w-full">
          <div
            className="w-full items-center pt-10 max-w-sm rounded-lg shadow
            bg-indigo-100 border-gray-700"
          >
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-20 h-20 p-1 rounded-full ring-2 ring-ingigo-600"
                src="https://firebasestorage.googleapis.com/v0/b/commentup-prod.appspot.com/o/images%2Fa.png?alt=media&token=f0f0372b-2cb4-4c90-b5fc-77e285696740"
                alt="Bordered avatar"
              />

              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Andres Ceballos</h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">team@commentup.app</span>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <Link
                  href="/book-call"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium 
                    text-center text-white bg-indigo-700 rounded-lg hover:bg-blue-800 focus:ring-4 
                    focus:outline-none focus:ring-blue-300"
                >
                  Book Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BookCall;
