import React, { useState } from 'react';
import CardBox from '@/components/template/CardBox';
import { mdiGithub, mdiLinkedin, mdiWeb, mdiMapMarkerOutline } from '@mdi/js';
import AvatarComponent from '@/components/template/Avatar';
import BaseIcon from '@/components/template/BaseIcon';
import CardBoxModal from '@/components/template/CardBoxModal';
import { useDeveloper } from '@/context/useDeveloper';
import { useAuth } from '@/context/authContext';

const CardDeveloper = ({ developer }: any) => {
  const isBigText = developer?.description && developer?.description?.length > 117;
  const textShort = isBigText
    ? `${developer?.description.slice(0, 117)}...`
    : developer?.description?.slice(0, 117) || '';

  const { createInteraction } = useDeveloper();
  const [description, setDescription] = useState(textShort);
  const { user } = useAuth();
  const [contactMessage, setContactMessage] = useState<string>('');
  const [isModalInfoActive, setIsModalInfoActive] = useState<boolean>(false);
  const [showMore, setShowMore] = useState(false);
  const [developerSelected, setDeveloperSelected] = useState<any>(null);

  const handleShowMore = () => {
    if (!showMore) {
      setDescription(developer.description);
    } else {
      setDescription(textShort);
    }
    setShowMore(!showMore);
  };

  const showDetail = (dev: any) => {
    setDeveloperSelected(dev);
    setIsModalInfoActive(true);
  };

  const closeDetail = () => setIsModalInfoActive(false);

  const handleOnClickSave = () => {
    if (contactMessage) {
      createInteraction({
        description: contactMessage,
        clientEmail: user.email,
        developerEmail: developerSelected.email,
        developerID: developerSelected ? developerSelected?.id : '',
        developerName: developerSelected.displayName,
        // eslint-disable-next-line no-underscore-dangle
        clientID: user._id,
      });
      closeDetail();
    } else {
      // setError('Invalid email');
      // setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <CardBox className="mb-6 last:mb-0 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <span className="inline-flex items-center text-center bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-1 py-1 rounded dark:bg-indigo-900 dark:text-indigo-300">
          <BaseIcon path={mdiMapMarkerOutline} />
          {developer.country}
        </span>
      </div>
      <CardBoxModal
        title="Contact"
        buttonColor="info"
        buttonLabel="Send"
        isActive={isModalInfoActive}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onConfirm={handleOnClickSave}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel={closeDetail}
      >
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Please let us know what you&apos;re currently working on and what assistance you require.
            <textarea
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              id="contactMessage"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              rows={10}
              required
            />
          </label>
        </div>
      </CardBoxModal>
      <div className="flex items-center justify-center">
        <AvatarComponent
          className="w-24 h-24 md:mr-6 mb-6 md:mb-0"
          username={developer.displayName}
          avatar={developer.photo}
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="text-center md:text-left overflow-hidden">
          <h4 className="text-center text-xl text-ellipsis">{developer.displayName}</h4>
          <p className="text-center text-indigo-900 dark:text-indigo-400">{developer.title}</p>
          <span className="text-sm text-center text-gray-500 dark:text-gray-400">
            Experience: <b>{developer.experience}</b>
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {/* <div className="flex items-baseline text-gray-900 dark:text-white">
          <span className="text-3xl font-semibold">$</span>
          <span className="text-5xl font-extrabold tracking-tight">{developer.rate}</span>
          <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/hour</span>
        </div> */}
        <button
          type="button"
          disabled={developer.interaction !== 'Contact'}
          onClick={() => showDetail(developer)}
          className={`ml-2 w-full mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${
            developer.interaction !== 'Contact' ? 'border border-gray-400' : ''
          }`}
        >
          <span
            className={`w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ${
              developer.interaction !== 'Contact' ? 'text-gray-400' : ''
            }`}
          >
            {developer.interaction}
          </span>
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
          <div className="text-center md:text-left overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {developer.skills.map((skill: string) => (
                <span className="text-center bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-1 py-1 rounded dark:bg-indigo-900 dark:text-indigo-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {developer?.github && (
        <div className="mt-2">
          <a href={developer.github} target="_blank" rel="noopener noreferrer">
            <BaseIcon path={mdiGithub} />
            <span>{developer.github.slice(0, 30)}...</span>
          </a>
        </div>
      )}
      {developer?.linkedin && (
        <div className="mt-2">
          <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">
            <BaseIcon path={mdiLinkedin} />
            <span>{developer.linkedin.slice(0, 30)}...</span>
          </a>
        </div>
      )}
      {developer?.website && (
        <div className="mt-2">
          <a href={developer.website} target="_blank" rel="noopener noreferrer">
            <BaseIcon path={mdiWeb} />
            <span>{developer.website}</span>
          </a>
        </div>
      )}
      <div className="text-justify items-center justify-center my-2">
        <span className="text-sm text-jusitify text-gray-500 dark:text-gray-400">{description}</span>
        {isBigText && (
          <button
            type="button"
            onClick={handleShowMore}
            className="mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-small rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </CardBox>
  );
};

export default CardDeveloper;
