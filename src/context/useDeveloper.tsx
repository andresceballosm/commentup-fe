import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authContext';

interface valuedeveloperContext {
  createProfile: (values: any) => void;
  getProfile: () => void;
  getProfiles: () => void;
  createInteraction: (values: any) => void;
  updateInteraction: (values: any) => void;
  updateInteractionAvailability: (values: any) => void;
  setLoading: (res: boolean) => void;
  profile: IProfile;
  loading: boolean;
  error: string;
  success: string;
  complete: boolean;
  developers: IProfile[];
}

export interface IProfile {
  _id: string;
  id: string;
  title: string;
  description: any[];
  github: boolean;
  linkedin: boolean;
  twitter: boolean;
  salary: string;
  skills: string[];
  createdAt?: string;
  status: string;
}

export const developerContext = createContext<valuedeveloperContext>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  createProfile: (_values: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  getProfile: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  createInteraction: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  updateInteraction: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  updateInteractionAvailability: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setLoading: () => {},
  loading: false,
  complete: false,
  error: '',
  positions: [],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  profile: null,
  success: '',
});

export const useDeveloper = () => {
  const context = useContext(developerContext);
  if (!context) throw new Error('There is no Talent providers');
  return context;
};

export function DeveloperProvider({ children }: any) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [profile, setProfile] = useState<IProfile>(null);
  const [developers, setDevelopers] = useState<IProfile[]>([]);
  const [complete, setComplete] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  const createProfile = async (values: any) => {
    if (token) {
      setLoading(true);
      try {
        const request = await axios({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          data: values,
          url: `${process.env.NEXT_PUBLIC_API_URL}/v1/developer/profile`,
        });
        if (request.data.ok) {
          const { _id } = request.data.response.profile;
          const newProfile = {
            ...request.data.response.profile,
            id: _id,
          };
          setProfile(newProfile);
          //   if (router.pathname === 'create-position') {
          //     router.push(`/feedback/new-position/${newPosition.id}/success`);
          //   } else {
          //     setCloseCreatePositionModal(true);
          //     alert('Position created successfully!');
          //   }
          setSuccess('Profile updated successfully!');
          setTimeout(() => setSuccess(''), 3000);
        }
        setLoading(false);
        // eslint-disable-next-line no-shadow
      } catch (error: any) {
        setError(error);
        setLoading(false);
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const getProfile = async () => {
    if (token) {
      setLoading(true);
      try {
        const request = await axios({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          url: `${process.env.NEXT_PUBLIC_API_URL}/v1/developer`,
        });
        setLoading(false);
        if (request.data.ok) {
          setProfile(request.data.response.profile);
        }
        setComplete(true);
        // eslint-disable-next-line no-shadow
      } catch (error: any) {
        setError(error);
        setLoading(false);
        setComplete(true);
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const getProfiles = async () => {
    if (token) {
      setLoading(true);
      try {
        const request = await axios({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          url: `${process.env.NEXT_PUBLIC_API_URL}/v1/developer/profiles`,
        });
        setLoading(false);
        if (request.data.ok) {
          setDevelopers(request.data.response.developers);
        }
        // eslint-disable-next-line no-shadow
      } catch (error: any) {
        setError(error);
        setLoading(false);
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const createInteraction = async (values: any) => {
    if (token) {
      setLoading(true);
      try {
        const request = await axios({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          data: values,
          url: `${process.env.NEXT_PUBLIC_API_URL}/v1/interaction/create`,
        });
        setLoading(false);
        if (request.data.ok) {
          setSuccess('Sent successfully!');
          setTimeout(() => setSuccess(''), 3000);
        } else {
          setError(request.data.response);
          setTimeout(() => setError(''), 5000);
        }
        // eslint-disable-next-line no-shadow
      } catch (error: any) {
        setError(error);
        setLoading(false);
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const updateInteraction = async (values: any) => {
    setLoading(true);
    try {
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: values,
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/interaction/update`,
      });
      if (!request.data.error) {
        setSuccess('Sent successfully!');
      } else {
        setError(request.data.response);
      }
      setLoading(false);
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  const updateInteractionAvailability = async (values: any) => {
    setLoading(true);
    try {
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: values,
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/interaction/interaction-availability`,
      });
      if (!request.data.error) {
        setSuccess('Sent successfully!');
        setTimeout(() => {
          setSuccess('');
          router.push('/client/developers');
        }, 3000);
      } else {
        setError(request.data.response);
        setTimeout(() => {
          setError('');
        }, 5000);
      }
      setLoading(false);
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setError(error);
      setLoading(false);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <developerContext.Provider
      value={{
        getProfile,
        createProfile,
        createInteraction,
        updateInteraction,
        updateInteractionAvailability,
        profile,
        loading,
        error,
        success,
        complete,
        getProfiles,
        developers,
        setLoading,
      }}
    >
      {children}
    </developerContext.Provider>
  );
}
