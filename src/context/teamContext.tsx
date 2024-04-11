import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export interface IMemberTeam {
  _id: string;
  active?: boolean;
  displayName?: string;
  email: string;
  role: string;
  companyID: string;
  permissions: string[];
  status: string;
  createdAt: string;
}

interface valueTeamContext {
  loading: boolean;
  team: any;
  getTeam: () => Promise<void>;
  getTeamMember: (id: string) => Promise<void>;
  sendInvitationMemberTeam: (values: any) => Promise<void>;
  acceptInvitationMemberTeam: (values: any) => Promise<void>;
  error: string;
  setError: (text: string) => void;
  setMessage: (text: string) => void;
  message: string;
  teamMember: IMemberTeam | null;
}

export const teamContext = createContext<valueTeamContext>({
  loading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  team: [],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  teamMember: null,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-pattern
  getTeam: ({}: any) => {},
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-pattern
  getTeamMember: ({}: any) => {},
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-pattern
  sendInvitationMemberTeam: ({}: any) => {},
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-pattern
  acceptInvitationMemberTeam: ({}: any) => {},
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-pattern
  setError: ({}: any) => {},
  error: '',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-pattern
  setMessage: ({}: any) => {},
  message: '',
});

export const useTeam = () => {
  const context = useContext(teamContext);
  if (!context) throw new Error('There is no Team providers');
  return context;
};

export function TeamProvider({ children }: any) {
  const { token } = useAuth();
  const [team, setTeam] = useState([]);
  const [teamMember, setTeamMember] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getTeam = async () => {
    try {
      setLoading(true);
      const request = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/user/team-member/team`,
      });
      if (request.data.ok) {
        const teamData = request.data?.response;
        setTeam(teamData);
      }
      setLoading(false);
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setLoading(false);
      setError('Sorry, it was not possible to log in');
    }
  };

  const getTeamMember = async (id: string) => {
    try {
      setLoading(true);
      const request = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/user/team-member/${id}`,
      });
      if (request.data.ok) {
        const memberData = request.data?.response;
        setTeamMember(memberData);
      }
      setLoading(false);
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setLoading(false);
      setError('Sorry, it was not possible to log in');
    }
  };

  const sendInvitationMemberTeam = async (email: string) => {
    try {
      setLoading(true);
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: { email },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/user/team-member/create`,
      });
      if (request.data.ok) {
        const teamData = request.data?.response;
        setTeam(teamData);
        setMessage('Invitation was sent successfully');
        setTimeout(() => setMessage(''), 4000);
      }
      setLoading(false);
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setLoading(false);
      setError('Sorry, it was not possible to add the new member');
      setTimeout(() => setError(''), 4000);
    }
  };

  const acceptInvitationMemberTeam = async (values: any) => {
    try {
      setLoading(true);
      const { email, password, displayName, teamMemberID } = values;
      const newUserRequest = await createUserWithEmailAndPassword(auth, email, password);
      const userData = newUserRequest?.user;
      if (userData) {
        const id = userData?.uid;
        setLoading(true);
        const request = await axios({
          method: 'POST',
          url: `${process.env.NEXT_PUBLIC_API_URL}/v1/user/team-member/accept`,
          data: { displayName, email, firebaseUid: id, teamMemberID },
        });
        if (request.data.ok) {
          router.push('/chat');
        }
        setTimeout(() => setLoading(false), 2000);
      }
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setLoading(false);
      setError('Sorry, it was not possible to add the new member');
      setTimeout(() => setError(''), 4000);
    }
  };

  return (
    <teamContext.Provider
      value={{
        team,
        loading,
        teamMember,
        message,
        setMessage,
        acceptInvitationMemberTeam,
        getTeamMember,
        getTeam,
        sendInvitationMemberTeam,
        setError,
        error,
      }}
    >
      {children}
    </teamContext.Provider>
  );
}
