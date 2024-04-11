import React, { useState, useEffect } from 'react';
import { mdiTrashCan, mdiLeadPencil, mdiShareVariant, mdiLinkedin } from '@mdi/js';
import { IPosition, usePosition } from '@/context/positionContext';
import { timeSince } from '@/utils/date.utils';
import ToastComponent from '@/components/ui/Toast';
import BaseButton from '../template/BaseButton';
import BaseButtons from '../template/BaseButtons';
import CardBoxModal from '../template/CardBoxModal';
import CardBox from '../template/CardBox';
import CardBoxComponentEmpty from '../template/CardBoxComponentEmpty';

const statusPosition = ['', 'open', 'closed', 'paused'];

const TablePositions = ({ setQuery }: any) => {
  const { removePosition, updatePositionStatus, positions } = usePosition();
  const perPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const numPages = positions.length / perPage;
  const pagesList = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numPages; i++) {
    pagesList.push(i);
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalTrashActive, setIsModalTrashActive] = useState(false);
  const [isModalSharePositionActive, setIsModalSharePositionActive] = useState(false);
  const [showClipboard, setShowClipboard] = useState(false);
  const [positionSelected, setPositionSelected] = useState('');
  const [status, setStatus] = useState('');

  const handleModalAction = () => {
    setIsModalInfoActive(false);
    setIsModalTrashActive(false);
    setPositionSelected('');
  };

  const openShareModal = (id: string) => {
    setPositionSelected(id);
    setIsModalSharePositionActive(true);
  };

  const closeShareModal = () => {
    setPositionSelected('');
    setIsModalSharePositionActive(false);
  };

  const handleOnClickSave = () => {
    updatePositionStatus({
      id: positionSelected,
      status,
    });
    handleModalAction();
  };

  const handleModalTrashAction = () => {
    removePosition(positionSelected);
    handleModalAction();
  };

  const handleRemovePosition = (id: string) => {
    setPositionSelected(id);
    setIsModalTrashActive(true);
  };

  const handleUpdateStatusPosition = (id: string) => {
    setPositionSelected(id);
    setIsModalInfoActive(true);
  };

  const handleSelect = (event: any) => setStatus(event.target.value);

  const getColor = (statusValue: string) => {
    switch (statusValue) {
      case 'paused':
        return 'warning';
      case 'closed':
        return 'danger';
      default:
        return 'info';
    }
  };

  const shareLink = (id: string) => {
    setShowClipboard(true);
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/candidates/positions/${id}`);
    setTimeout(() => {
      setShowClipboard(false);
    }, 3000);
  };

  return (
    <>
      <CardBoxModal
        title="Update Status"
        buttonColor="info"
        buttonLabel="Save"
        isActive={isModalInfoActive}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onConfirm={handleOnClickSave}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel={handleModalAction}
      >
        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Status
          <select
            id="status"
            onChange={handleSelect}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
          >
            {statusPosition.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </CardBoxModal>

      <CardBoxModal
        title="Alert"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalTrashAction}
        onCancel={handleModalAction}
      >
        <p>
          Are you sure to <b>DELETE</b> the position?
        </p>
      </CardBoxModal>

      <CardBoxModal
        title=""
        buttonColor="info"
        buttonLabel="Close"
        isActive={isModalSharePositionActive}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onConfirm={closeShareModal}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      >
        <p className="text-gray-500">
          <b className="text-indigo-900">Share</b> your job position across multiple sites to attract a wider pool of
          candidates.
        </p>
        <BaseButtons>
          <BaseButton
            color="info"
            icon={mdiShareVariant}
            label="Copy Link"
            // eslint-disable-next-line no-underscore-dangle
            onClick={() => shareLink(positionSelected)}
            small
          />
        </BaseButtons>
        <p className="text-gray-700">Coming Soon</p>
        <BaseButtons>
          <BaseButton
            color="blue"
            icon={mdiLinkedin}
            label="Linkedin"
            disabled
            // IN/ATSIntegrationWidget
            // eslint-disable-next-line no-underscore-dangle
            onClick={() => console.log('CLICK ')}
            small
          />
        </BaseButtons>
      </CardBoxModal>

      {positions.length > 0 ? (
        <>
          <div className="mt-2 mb-2">
            <p className="mb-2 text-gray-700 font-semibold tracking-tighter">Shortcuts</p>
            <BaseButtons>
              <BaseButton
                label="Show me detail position number 0"
                color="info"
                small
                roundedFull
                onClick={() => setQuery('Show me detail position number 0')}
              />
              <BaseButton
                label="Show me all postulations in the position 0"
                color="info"
                small
                roundedFull
                onClick={() => setQuery('Show me all postulations in the position 0')}
              />
            </BaseButtons>
          </div>
          <table>
            <thead>
              {showClipboard && <ToastComponent text="Link copied to clipboard!" />}
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Location</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position: IPosition, index: number) => (
                <tr key={position.id}>
                  <td data-label="Title">{index}</td>
                  <td data-label="Title">{position.title}</td>
                  <td data-label="Status">
                    <BaseButton
                      className="ml-2"
                      color={getColor(position.status)}
                      // eslint-disable-next-line no-underscore-dangle
                      onClick={() => handleUpdateStatusPosition(position.id || position?._id)}
                      label={position.status}
                      icon={mdiLeadPencil}
                      small
                      roundedFull
                    />
                  </td>
                  <td data-label="Location">{position.location}</td>
                  <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                    <small className="text-gray-500 dark:text-slate-400">{timeSince(position?.createdAt || '')}</small>
                  </td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons type="justify-start lg:justify-end" noWrap>
                      <BaseButton
                        color="info"
                        icon={mdiShareVariant}
                        // eslint-disable-next-line no-underscore-dangle
                        onClick={() => openShareModal(position._id)}
                        small
                      />
                      <BaseButton
                        color="danger"
                        icon={mdiTrashCan}
                        // eslint-disable-next-line no-underscore-dangle
                        onClick={() => handleRemovePosition(position.id || position?._id)}
                        small
                      />
                    </BaseButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
              <BaseButtons>
                {pagesList.map((page) => (
                  <BaseButton
                    key={page}
                    active={page === currentPage}
                    label={(page + 1).toString()}
                    color={page === currentPage ? 'lightDark' : 'whiteDark'}
                    small
                    onClick={() => setCurrentPage(page)}
                  />
                ))}
              </BaseButtons>
              <small className="mt-6 md:mt-0">
                Page {currentPage + 1} of {numPages}
              </small>
            </div>
          </div>
        </>
      ) : (
        <CardBox>
          <CardBoxComponentEmpty />
        </CardBox>
      )}
    </>
  );
};

export default TablePositions;
