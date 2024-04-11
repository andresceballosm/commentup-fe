import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { mdiEye, mdiTrashCan, mdiLeadPencil } from '@mdi/js';
import Head from 'next/head';
import { getPageTitle } from '@/config';
import { IPosition, usePosition } from '@/context/positionContext';
import { useRouter } from 'next/router';
import { timeSince } from '@/utils/date.utils';
import { useSampleClients } from '../../hooks/sampleData';
import BaseButton from '../template/BaseButton';
import BaseButtons from '../template/BaseButtons';
import CardBoxModal from '../template/CardBoxModal';
import CardBox from '../template/CardBox';
import CardBoxComponentEmpty from '../template/CardBoxComponentEmpty';
import WithPrivateRoute from '../../layouts/withPrivateRoute';
// eslint-disable-next-line import/extensions
import LayoutGuest from '../../layouts/guest';

const statusPosition = ['', 'open', 'closed', 'paused'];

const CreatePositions = () => {
  const { positions, removePosition, updatePositionStatus } = usePosition();
  const perPage = 10;
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);

  const numPages = positions.length / perPage;

  const pagesList = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numPages; i++) {
    pagesList.push(i);
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalTrashActive, setIsModalTrashActive] = useState(false);
  const [positionSelected, setPositionSelected] = useState('');
  const [status, setStatus] = useState('');

  const handleModalAction = () => {
    setIsModalInfoActive(false);
    setIsModalTrashActive(false);
    setPositionSelected('');
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

  return (
    <>
      <Head>
        <title>{getPageTitle('Create Position')}</title>
      </Head>
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

      {positions.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Location</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position: IPosition) => (
                <tr key={position.id}>
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
                  {/* <td data-label="Progress" className="lg:w-32">
                    <progress className="flex w-2/5 self-center lg:w-full" max="100" value={client.progress}>
                      {position.progress}
                    </progress>
                  </td> */}
                  <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                    <small className="text-gray-500 dark:text-slate-400">{timeSince(position?.createdAt || '')}</small>
                  </td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons type="justify-start lg:justify-end" noWrap>
                      <BaseButton
                        color="info"
                        icon={mdiEye}
                        // eslint-disable-next-line no-underscore-dangle
                        onClick={() => router.push(`/positions/${position.id || position?._id}`)}
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

CreatePositions.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

CreatePositions.Auth = WithPrivateRoute;

export default CreatePositions;
