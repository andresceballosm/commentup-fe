import { mdiFileDocumentMultiple, mdiChartTimelineVariant, mdiOpenInNew, mdiSwapHorizontal } from '@mdi/js';
import CardBoxWidget from '@/components/template/CardBoxWidget';
import { IEmailsTemplate, IPostulation } from '@/interfaces';
import BaseButton from '@/components/template/BaseButton';
import { IPosition, usePosition } from '@/context/positionContext';
import CardBoxModal from '@/components/template/CardBoxModal';
import { useEffect, useState } from 'react';

type Props = {
  postulation: IPostulation;
  position: IPosition;
  closeDetail: () => void;
  setUpEmail: (status: string) => void;
};

const statusPostulation = ['pending', 'in-review', 'rejected', 'in-interview', 'selected'];

const PostulationDetail = ({ postulation, closeDetail, position, setUpEmail }: Props) => {
  const { updatePostulationStatus } = usePosition();
  const [status, setStatus] = useState('');
  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalAlertEmailActive, setIsModalAlertEmailActive] = useState(false);
  const [modalAlertEmailText, setModalAlertEmailText] = useState('');

  const handleSelect = (event: any) => setStatus(event.target.value);

  const handleOnClickSave = () => {
    const emailTemplate = position.emailsTemplate.find((item: IEmailsTemplate) => item.step === status);
    if (!emailTemplate?.html || !emailTemplate?.subjet) {
      setModalAlertEmailText(
        // eslint-disable-next-line max-len
        `Cannot update candidate's status to ${status},first set up an email template to send to the candidate when their application is updated to ${status}`,
      );
      setIsModalInfoActive(false);
      setIsModalAlertEmailActive(true);
    } else {
      updatePostulationStatus({
        // eslint-disable-next-line no-underscore-dangle
        postulationID: postulation._id,
        status,
      });
      setIsModalInfoActive(false);
      closeDetail();
    }
  };

  useEffect(() => {
    if (postulation) {
      setStatus(postulation.status);
    }
  }, [postulation]);

  const getTrendStyle = (score: number) => {
    if (score > 80) {
      return {
        trendLabel: 'High',
        trendColor: 'success',
        trendType: 'up',
      };
    }
    if (score > 60) {
      return {
        trendLabel: 'Medium',
        trendColor: 'warning',
        trendType: 'up',
      };
    }
    return {
      trendLabel: 'Down',
      trendColor: 'danger',
      trendType: 'down',
    };
  };
  return (
    <div
      id="extralarge-modal"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden
    overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full  max-w-full"
    >
      <div className="relative w-full max-w-7xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{postulation.name}</h3>
            <BaseButton
              className="ml-2"
              color="info"
              onClick={() => setIsModalInfoActive(true)}
              label={postulation.status}
              icon={mdiSwapHorizontal}
              small
              roundedFull
            />
            <button
              type="button"
              onClick={closeDetail}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
             rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="extralarge-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 
                111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 
                0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
              <CardBoxModal
                title="Ouups!"
                buttonColor="info"
                buttonLabel="Set up"
                isActive={isModalAlertEmailActive}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onConfirm={() => setUpEmail(status)}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onCancel={() => setIsModalAlertEmailActive(false)}
              >
                <p className="text-1xl mb-5 text-gray-700 ">{modalAlertEmailText}</p>
              </CardBoxModal>
              <CardBoxModal
                title="Update Status"
                buttonColor="info"
                buttonLabel="Save"
                isActive={isModalInfoActive}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onConfirm={handleOnClickSave}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onCancel={() => setIsModalInfoActive(false)}
              >
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Status
                  <select
                    id="status"
                    onChange={handleSelect}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
                  >
                    {position.steps.map((item, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </CardBoxModal>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <CardBoxWidget
                {...getTrendStyle(postulation.scoreCV || 0)}
                icon={mdiFileDocumentMultiple}
                iconColor="info"
                number={postulation.scoreCV || 0}
                numberSuffix="%"
                label="Score CV"
              />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <CardBoxWidget
                {...getTrendStyle(postulation.scoreGeneral || 0)}
                icon={mdiChartTimelineVariant}
                iconColor="info"
                number={postulation.scoreGeneral || 0}
                numberSuffix="%"
                label="Score Fit"
              />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <CardBoxWidget
                {...getTrendStyle(postulation.scoreTechnical || 0)}
                icon={mdiChartTimelineVariant}
                iconColor="info"
                number={postulation.scoreTechnical || 0}
                numberSuffix="%"
                label="Score Technical"
              />
            </div>
            <div className="flex flex-col md:flex-row divide-x divide-gray-200">
              <div className="pb-10 md:w-1/3 p-4">
                <p className="text-gray-500">Email:</p>
                <p className="text-1xl text-gray-700 font-bold">{postulation.email}</p>
                <p className="text-gray-500">Phone:</p>
                <p className="text-1xl text-gray-700 font-bold">{postulation.phone}</p>
                <p className="text-gray-500">Country:</p>
                <p className="text-1xl text-gray-700 font-bold">{postulation.country}</p>
                {postulation?.linkedin && (
                  <div>
                    <p className="text-gray-500">Linkedin:</p>
                    <p className="text-1xl text-gray-700 font-bold">{postulation.linkedin}</p>
                  </div>
                )}
                {postulation?.github && (
                  <div>
                    <p className="text-gray-500">Github:</p>
                    <p className="text-1xl text-gray-700 font-bold">{postulation.github}</p>
                  </div>
                )}
                {postulation?.twitter && (
                  <div>
                    <p className="text-gray-500">Twitter:</p>
                    <p className="text-1xl text-gray-700 font-bold">{postulation.twitter}</p>
                  </div>
                )}

                <a href={postulation.cv} target="_blank" rel="noopener noreferrer">
                  <BaseButton
                    className="mt-10"
                    color="info"
                    label="DOWNLOAD CV"
                    icon={mdiOpenInNew}
                    small
                    roundedFull
                  />
                </a>

                {/* <a className="text-1xl text-gray-700 font-bold">{postulation.cv}</a> */}
              </div>
              <div className="md:w-2/3 p-4">
                <h2 className='className="text-1xl text-indigo-700 font-bold pb-2'>CV Review</h2>
                <p className="text-base leading-relaxed text-gray-500 pb-10">{postulation.resume}</p>
                <h2 className='className="text-1xl text-indigo-700 font-bold pb-2'>Fit Review</h2>
                <p className="text-base leading-relaxed text-gray-500">{postulation.resultGeneral}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostulationDetail;
