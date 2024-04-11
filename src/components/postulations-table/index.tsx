import React, { useState } from 'react';
import PostulationDetail from '@/components/postulation-detail';
import { timeSince } from '@/utils/date.utils';
import { mdiEye } from '@mdi/js';
import { IPosition } from '@/context/positionContext';
import { IPostulation } from '../../interfaces';
import BaseButton from '../template/BaseButton';
import BaseButtons from '../template/BaseButtons';

type Props = {
  postulations: IPostulation[];
  position: IPosition;
  navitateToSetup: (status: string) => void;
};

const PostulationsTable = ({ postulations, position, navitateToSetup }: Props) => {
  const [selected, setSelected] = useState<any>(null);

  const perPage = 5;

  const [currentPage, setCurrentPage] = useState(0);

  const numPages = postulations.length / perPage;

  const pagesList = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numPages; i++) {
    pagesList.push(i);
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false);

  const showDetail = (item: IPostulation) => {
    setSelected(item);
    setIsModalInfoActive(true);
  };

  const closeDetail = () => {
    setSelected(null);
    setIsModalInfoActive(false);
  };

  const setUpEmail = (status: string) => {
    setSelected(null);
    setIsModalInfoActive(false);
    navitateToSetup(status);
  };

  return (
    <>
      {selected && isModalInfoActive && (
        <PostulationDetail
          postulation={selected}
          closeDetail={closeDetail}
          position={position}
          setUpEmail={setUpEmail}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Status</th>
            <th>Score</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {postulations.map((postulation: IPostulation) => (
            // eslint-disable-next-line no-underscore-dangle
            <tr key={postulation._id}>
              <td data-label="Name">{postulation.name}</td>
              <td data-label="Email">{postulation.email}</td>
              <td data-label="Country">{postulation.country}</td>
              <td data-label="Status">{postulation.status}</td>
              <td data-label="Progress" className="lg:w-32">
                <div className="flex">
                  <progress className="flex w-2/5 self-center lg:w-full" max="100" value={postulation.scoreAverage}>
                    {postulation.scoreAverage}
                  </progress>
                  <a className="pl-1"> {postulation.scoreAverage}%</a>
                </div>
              </td>
              <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">{timeSince(postulation.createdAt)}</small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton color="info" icon={mdiEye} onClick={() => showDetail(postulation)} small />
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
  );
};

export default PostulationsTable;
