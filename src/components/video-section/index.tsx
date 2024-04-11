import { tw } from 'twind';

const VideoSection = () => (
  <section className={tw('bg-gradient-to-b from-gray-50 to-white shadow-inner')}>
    <div className={tw('max-w-7xl mx-auto')}>
      <div className={tw('flex items-center justify-center max-w-4xl mx-auto pt-14 flex-wrap')}>
        <div
          className={tw(
            `flex xl:w-1/3 sm:w-5/12 sm:max-w-xs relative mb-32 lg:mb-20
                      xl:max-w-sm lg:w-1/2 w-11/12 mx-auto sm:mx-0 cursor-pointer hover:scale-105`,
          )}
        >
          <img
            src="/images/home-app.png"
            alt="home-app"
            className={tw('h-full w-full object-cover overflow-hidden rounded  ml-14')}
          />
        </div>
        <div
          className={tw(
            `flex xl:w-1/3 sm:w-5/12 sm:max-w-xs relative mb-32 lg:mb-20
                      xl:max-w-sm lg:w-1/2 w-11/12 mx-auto sm:mx-0 cursor-pointer hover:scale-105`,
          )}
        >
          <img
            src="/images/detail-app.png"
            alt="home-app"
            className={tw('h-full w-full object-cover overflow-hidden rounded ml-14')}
          />
        </div>
        <div
          className={tw(
            `flex xl:w-1/3 sm:w-5/12 sm:max-w-xs relative mb-32 lg:mb-20
                      xl:max-w-sm lg:w-1/2 w-11/12 mx-auto sm:mx-0 cursor-pointer hover:scale-105`,
          )}
        >
          <img
            src="/images/settings-app.png"
            alt="settings-app"
            className={tw('h-full w-full object-cover overflow-hidden rounded ml-14')}
          />
        </div>
      </div>
    </div>
  </section>
);

export default VideoSection;
