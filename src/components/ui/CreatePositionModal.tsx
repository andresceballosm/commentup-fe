import React, { useEffect, useState } from 'react';
import { mdiArrowLeft, mdiTableBorder } from '@mdi/js';
import { StepsCreatePosition } from '@/constants/data/steps.constants';
import Stepper from '@/components/stepper';
import { Step1, Step2, Step3 } from '@/components/create-position';
import { initValue } from '@/components/commons/text-input-rich.component';
import BaseButton from '@/components/template/BaseButton';
import SectionTitleLineWithButton from '@/components/template/SectionTitleLineWithButton';
import { usePosition } from '@/context/positionContext';
import { useRouter } from 'next/router';
import LoadingComponent from '@/components/template/loading';

type Props = {
  closeDetail: () => void;
};

const CreatePositionModal = ({ closeDetail }: Props) => {
  const [selected, setSelected] = useState(0);
  const [form1, setForm1] = useState({ title: '', location: '', type: '', salary: '' });
  const [form3, setForm3] = useState({
    language: '',
    github: [],
    linkedin: [],
    twitter: [],
    ownQuestions: [],
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [description, setDescription] = useState(initValue);
  const [requirements, setRequirements] = useState(initValue);
  const router = useRouter();
  const { createPosition, loading, closeCreatePositionModal, setCloseCreatePositionModal } = usePosition();

  const nextStep1 = (values: any) => {
    setForm1(values);
    setSelected(1);
  };

  const nextStep2 = (values: any) => {
    setSelected(2);
  };

  const nextStep3 = (values: any, skillsData: string[], steps: string[], questions: string[]) => {
    const data = {
      twitter: values.twitter.length > 0,
      linkedin: values.linkedin.length > 0,
      github: values.github.length > 0,
      language: values.language,
      ownQuestions: values.ownQuestions.length > 0,
    };
    Object.assign(data, {
      ...form1,
      description,
      requirements,
      skills: skillsData,
      questionsFit: questions,
      steps,
    });
    setForm3(values);
    if (skillsData.length > 0) {
      setSkills(skillsData);
    }
    createPosition(data);
  };

  console.log('closeCreatePositionModal ', closeCreatePositionModal);

  useEffect(() => {
    if (closeCreatePositionModal) {
      closeDetail();
      setCloseCreatePositionModal(false);
    }
  }, [closeCreatePositionModal]);

  const renderStep = () => {
    switch (selected) {
      case 0:
        return <Step1 nextStep={nextStep1} initValues={form1} cancel={closeDetail} />;
      case 1:
        return (
          <Step2
            nextStep={nextStep2}
            description={description}
            requirements={requirements}
            setDescription={setDescription}
            setRequirements={setRequirements}
            cancel={closeDetail}
          />
        );
      case 2:
        return <Step3 nextStep={nextStep3} initValues={form3} cancel={closeDetail} />;
      default:
        return null;
    }
  };

  return (
    <div
      id="defaultModal"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50
      max-w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative max-h-full max-w-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="p-6 space-y-6">
            <SectionTitleLineWithButton icon={mdiTableBorder} title="New Position" main>
              {selected === 0 ? (
                <BaseButton
                  onClick={closeDetail}
                  target="_blank"
                  icon={mdiArrowLeft}
                  label="Cancel"
                  color="contrast"
                  roundedFull
                  small
                />
              ) : (
                <BaseButton
                  onClick={() => setSelected(selected - 1)}
                  target="_blank"
                  icon={mdiArrowLeft}
                  label="Back"
                  color="contrast"
                  roundedFull
                  small
                />
              )}
            </SectionTitleLineWithButton>
            <div className="flex">
              <div className="w-3/12 justify-center mt-20">
                <Stepper steps={StepsCreatePosition} selected={selected} />
              </div>
              {loading && <LoadingComponent loading text="We are creating your position, this may take a moment..." />}
              <div className="w-9/12">{renderStep()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePositionModal;
