import React, { useEffect, useState } from 'react';
import PostulationDetail from '@/components/postulation-detail';
import { timeSince } from '@/utils/date.utils';
import { mdiEye, mdiFilterRemove, mdiWhatsapp } from '@mdi/js';
import { usePosition } from '@/context/positionContext';
import { IPostulation } from '../../interfaces';
import BaseButton from '../template/BaseButton';
import BaseButtons from '../template/BaseButtons';

const TablePostulations = ({ navitateToSetup }: any) => {
  const { postulations, position } = usePosition();
  const [selected, setSelected] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<any>('');
  const [searchUsers, setSearchUsers] = useState('');
  const [data, setData] = useState<IPostulation[]>([]);
  const timeOptions = ['Last 30 days', 'Last day', 'Last 7 days'];
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const numPages = postulations.length / perPage;
  const pagesList = [];

  useEffect(() => {
    if (postulations.length > 0) {
      setData(postulations);
    }
  }, [postulations]);

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

  const handleFilterByStatus = (event: any) => {
    setFilterStatus(event.target.value);
    const values = data.length > 1 ? data : postulations;
    const newData = values.filter((postulation: IPostulation) => postulation.status === event.target.value);
    setData(newData);
  };

  const handleFilterByDate = (event: any) => {
    const { value } = event.target;
    const values = data.length > 1 ? data : postulations;
    let newData: IPostulation[];
    if (value === 'Last day') {
      const lastDay = new Date();
      lastDay.setDate(lastDay.getDate() - 1);
      newData = values.filter((postulation: IPostulation) => new Date(postulation.createdAt) >= lastDay);
    } else if (value === 'Last 7 days') {
      const sevenDay = new Date();
      sevenDay.setDate(sevenDay.getDate() - 7);
      newData = values.filter((postulation: IPostulation) => new Date(postulation.createdAt) >= sevenDay);
    } else {
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      newData = values.filter((postulation: IPostulation) => new Date(postulation.createdAt) >= monthAgo);
    }
    setData(newData);
  };

  const handleFilterByUser = (event: any) => {
    setSearchUsers(event.target.value);
    const newData = postulations.filter((postulation: IPostulation) => postulation.name.includes(event.target.value));
    setData(newData);
  };

  if (!position) {
    return <p>Waiting...</p>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
      {selected && isModalInfoActive && (
        <PostulationDetail
          postulation={selected}
          closeDetail={closeDetail}
          position={position}
          setUpEmail={setUpEmail}
        />
      )}
      <p>
        Postulations in the position <b>{position?.title}</b>
      </p>

      <div className="flex items-center justify-between py-4">
        <label htmlFor="table-search">
          <div className="relative">
            <input
              type="text"
              id="table-search"
              onChange={handleFilterByUser}
              value={searchUsers}
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
                w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search user"
            />
          </div>
        </label>
        <div className="flex">
          <div>
            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              <select
                id="status"
                onChange={handleFilterByStatus}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
              >
                {position?.steps.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="ml-5">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              <select
                id="date"
                onChange={handleFilterByDate}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
              >
                {timeOptions.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <BaseButton
          className="mr-3"
          color="danger"
          icon={mdiFilterRemove}
          onClick={() => {
            setSearchUsers('');
            setData(postulations);
          }}
          small
        />
      </div>

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
          {data.map((postulation: IPostulation) => (
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
                  <a
                    href={`https://wa.me/+${postulation.phone}/?text=Hello ${postulation.name} `}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BaseButton color="success" icon={mdiWhatsapp} small />
                  </a>
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
    </div>
  );
};

export default TablePostulations;
