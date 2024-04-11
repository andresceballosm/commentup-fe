import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authContext';
import { IEmailsTemplate, IPostulation, IQuestions } from '@/interfaces';

interface valuePositionContext {
  createPosition: (values: any) => void;
  setPositions: (values: any) => void;
  updatePostulationStatus: (values: any) => void;
  removePosition: (id: string) => void;
  updatePositionStatus: (values: any) => void;
  getPositions: () => void;
  getPosition: (id: string) => void;
  getPositionResult: (id: string) => void;
  getPositionQuestions: (id: string) => void;
  createPostulation: (postulation: IPostulation) => void;
  getPostulations: (id: string) => void;
  updatePositionEmailTemplates: (id: string, emailsTemplate: IEmailsTemplate[]) => void;
  setCloseCreatePositionModal: (res: boolean) => void;
  getPositionsByStatus: (status: string) => void;
  positions: any[];
  position: IPosition;
  postulations: IPostulation[];
  closeCreatePositionModal: boolean;
  questions: IQuestions;
  loading: boolean;
  error: string;
}

export interface IPosition {
  _id: string;
  active?: boolean;
  company: string;
  id: string;
  title: string;
  description: any[];
  requirements: any[];
  location: string;
  github: boolean;
  linkedin: boolean;
  twitter: boolean;
  salary: string;
  type: string;
  tokens: number;
  skills: string[];
  steps: string[];
  questions: any[];
  questionsTest: any[];
  createTokens: number;
  createdAt?: string;
  status: string;
  emailsTemplate: IEmailsTemplate[];
}

export const positionContext = createContext<valuePositionContext>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  createPosition: (_values: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setPositions: (_values: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  updatePostulationStatus: (_values: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  removePosition: (_values: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  updatePositionStatus: (_values: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  updatePositionEmailTemplates: (__id: string, _emailTemplate: IEmailsTemplate[]) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  getPositions: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  getPositionsByStatus: (status: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  getPositionResult: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  getPosition: (id: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  getPositionQuestions: (id: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  getPostulations: (id: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setCloseCreatePositionModal: (res: boolean) => {},
  loading: false,
  closeCreatePositionModal: false,
  error: '',
  positions: [],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  position: null,
  postulations: [],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  questions: null,
});

export const usePosition = () => {
  const context = useContext(positionContext);
  if (!context) throw new Error('There is no Position providers');
  return context;
};

export function PositionProvider({ children }: any) {
  const [positions, setPositions] = useState<IPosition[]>([]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [position, setPosition] = useState<IPosition>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [postulations, setPostulations] = useState<IPostulation[]>([]);
  const [questions, setQuestions] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [closeCreatePositionModal, setCloseCreatePositionModal] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  const createPosition = async (values: any) => {
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
          url: `${process.env.NEXT_PUBLIC_API_URL}/v1/position`,
        });
        if (request.data.ok) {
          const { _id } = request.data.response.position;
          const newPosition = {
            ...request.data.response.position,
            id: _id,
          };
          setPositions([...positions, newPosition]);
          if (router.pathname === 'create-position') {
            router.push(`/feedback/new-position/${newPosition.id}/success`);
          } else {
            setCloseCreatePositionModal(true);
            alert('Position created successfully!');
          }
        }
        setLoading(false);
        // eslint-disable-next-line no-shadow
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    }
  };

  const getPositions = async () => {
    if (token) {
      setLoading(true);
      try {
        const request = await axios({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          url: `${process.env.NEXT_PUBLIC_API_URL}/v1/position`,
        });
        setLoading(false);
        if (request.data.ok) {
          setPositions(request.data.response);
        }
        // eslint-disable-next-line no-shadow
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    }
  };

  const getPositionsByStatus = async (status: string) => {
    if (token) {
      setLoading(true);
      try {
        const request = await axios({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          url: `${process.env.NEXT_PUBLIC_API_URL}/v1/position/status/${status}`,
        });
        setLoading(false);
        if (request.data.ok) {
          setPositions(request.data.response);
        }
        // eslint-disable-next-line no-shadow
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    }
  };

  const getPosition = async (id: string) => {
    setLoading(true);
    try {
      const request = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/position/${id}`,
      });
      setLoading(false);
      if (request.data.ok) {
        setPosition(request.data.response);
      }
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  const getPositionQuestions = async (id: string) => {
    setLoading(true);
    try {
      const request = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/position/questions/${id}`,
      });
      setLoading(false);
      if (request.data.ok) {
        setQuestions(request.data.response);
      }
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  const createPostulation = async (values: IPostulation) => {
    setLoading(true);
    try {
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: values,
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/position/create-postulation`,
      });
      if (request.data.ok) {
        router.push('/candidates/apply/success');
      }
      setLoading(false);
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  const getPositionResult = async (id: string) => {
    setLoading(true);
    try {
      const request = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/position/results/${id}`,
      });
      setLoading(false);
      if (request.data.ok) {
        setPosition(request.data.response.position);
        setPostulations(request.data.response.postulations);
      } else {
        router.push('/error');
      }
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setError(error);
      setLoading(false);
      router.push('/error');
    }
  };

  const getPostulations = async (id: string) => {
    setLoading(true);
    try {
      const request = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/position/postulations/${id}`,
      });
      setLoading(false);
      if (request.data.ok) {
        setPostulations(request.data.response.postulations);
      } else {
        router.push('/error');
      }
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setError(error);
      setLoading(false);
      router.push('/error');
    }
  };

  const updatePostulationStatus = async (values: any) => {
    setLoading(true);
    try {
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: values,
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/position/postulation/update-status`,
      });
      setLoading(false);
      if (request.data.ok) {
        setPosition(request.data.response.position);
        setPostulations(request.data.response.postulations);
        alert('Updated Successfully!');
      }
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  const removePosition = async (id: any) => {
    setLoading(true);
    try {
      const request = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/position/remove/${id}`,
      });
      setLoading(false);
      if (request.data.ok) {
        setPositions(request.data.response);
        alert('Position deleted!');
      }
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  const updatePositionStatus = async (values: any) => {
    setLoading(true);
    try {
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: values,
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/position/update-status`,
      });
      setLoading(false);
      if (request.data.ok) {
        setPositions(request.data.response);
      }
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  const updatePositionEmailTemplates = async (id: string, emailsTemplate: IEmailsTemplate[]) => {
    setLoading(true);
    try {
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: {
          id,
          emailsTemplate,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/position/update-emails`,
      });
      setLoading(false);
      if (request.data.ok) {
        // eslint-disable-next-line no-underscore-dangle
        const positionUpdated = request.data.response.find((item: IPosition) => item._id === id);
        setPosition(positionUpdated);
        setPositions(request.data.response);
        alert('Saved Successfully!');
      }
      // eslint-disable-next-line no-shadow
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <positionContext.Provider
      value={{
        positions,
        createPosition,
        setPositions,
        getPostulations,
        getPositions,
        getPositionsByStatus,
        getPosition,
        getPositionResult,
        getPositionQuestions,
        createPostulation,
        updatePostulationStatus,
        removePosition,
        updatePositionStatus,
        updatePositionEmailTemplates,
        closeCreatePositionModal,
        setCloseCreatePositionModal,
        position,
        postulations,
        questions,
        loading,
        error,
      }}
    >
      {children}
    </positionContext.Provider>
  );
}
