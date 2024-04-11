import { IPosition } from '@/context/positionContext';
import EmailTemplate from '@/components/email-templates';

type Props = {
  position: IPosition;
  closeDetail: () => void;
  status: string;
};

const EmailSetupModal = ({ closeDetail, position, status }: Props) => (
  <div
    id="extralarge-modal"
    className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden
    overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full  max-w-full"
  >
    <div className="relative w-full max-w-7xl max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Email Setup</h3>
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
        <div className="p-6 space-y-6">{position && <EmailTemplate status={status} />}</div>
      </div>
    </div>
  </div>
);
export default EmailSetupModal;
