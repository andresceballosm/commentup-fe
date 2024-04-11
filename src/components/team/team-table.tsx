import React, { useState } from 'react';
import { timeSince } from '@/utils/date.utils';
import { IMemberTeam, useTeam } from '@/context/teamContext';
import CardBoxModal from '@/components/template/CardBoxModal';
import BaseButton from '../template/BaseButton';
import BaseButtons from '../template/BaseButtons';

const TeamTable = () => {
  const [email, setEmail] = useState<string>('');
  const { sendInvitationMemberTeam, team, setError, loading } = useTeam();
  const perPage = 5;

  const [currentPage, setCurrentPage] = useState(0);

  const numPages = team.length / perPage;

  const pagesList = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numPages; i++) {
    pagesList.push(i);
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false);

  const showDetail = () => {
    setIsModalInfoActive(true);
  };

  const closeDetail = () => {
    setIsModalInfoActive(false);
  };

  const handleOnClickSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      sendInvitationMemberTeam(email);
      closeDetail();
    } else {
      setError('Invalid email');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="w-full px-10">
      <CardBoxModal
        title="Add Member"
        buttonColor="info"
        buttonLabel="Send Invitation"
        isActive={isModalInfoActive}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onConfirm={handleOnClickSave}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel={closeDetail}
      >
        {/* <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
          <input name="email" value={email} onChange={(value) => setEmail(value)} />
        </label> */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email New Team Member
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@email.com"
              required
            />
          </label>
        </div>
      </CardBoxModal>
      <div className="flex  mb-5">
        <BaseButtons className="mt-5">
          <BaseButton type="submit" label="Add Member" color="info" onClick={showDetail} disabled={loading} />
        </BaseButtons>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {team.map((member: IMemberTeam) => (
            // eslint-disable-next-line no-underscore-dangle
            <tr key={member._id}>
              <td data-label="Name">
                <div className="relative w-10 h-10 mr-2 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </td>
              <td data-label="Name">{member?.displayName || 'Pending'}</td>
              <td data-label="Email">{member.email}</td>
              <td data-label="Status">{member.status}</td>
              <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">{timeSince(member.createdAt)}</small>
              </td>
              {/* <td className="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton color="info" icon={mdiEye} onClick={() => showDetail()} small />
                </BaseButtons>
              </td> */}
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

export default TeamTable;
