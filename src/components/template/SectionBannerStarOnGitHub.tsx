import React, { useContext } from 'react';
import { mdiBriefcasePlus } from '@mdi/js';
import { useRouter } from 'next/router';
import { gradientBgIndigo } from '../../colors';
import BaseButton from './BaseButton';
import SectionBanner from './SectionBanner';

const SectionBannerStarOnInstagram = () => {
  const router = useRouter();
  return (
    <SectionBanner className={gradientBgIndigo}>
      <h1 className="text-2xl text-white mb-6">
        Find work with <b>CommentUp! </b> Let us empower your career and help you reach your full potential as a Junior
        Developer.
      </h1>
      <div>
        <BaseButton
          onClick={() => router.push('/developer/profile')}
          icon={mdiBriefcasePlus}
          label="Create Profile"
          roundedFull
        />
      </div>
    </SectionBanner>
  );
};

export default SectionBannerStarOnInstagram;
