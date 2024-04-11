import React from 'react';
import type { ReactElement } from 'react';
import Page from '@/components/page';
import { NextSeo } from 'next-seo';
import Footer from '@/components/footer';
import LayoutGuest from '../layouts/guest';
import { getPageTitle } from '../config';

export default function BookCall() {
  return (
    <Page>
      <NextSeo
        title={getPageTitle('Book Call')}
        description="Hire Junior developers with mentorship from Latin America"
      />
      <main>
        <iframe
          title="Book Call"
          src="https://meetings.hubspot.com/team-commentup"
          width="100%"
          height="800px"
          data-hs-ignore="true"
        />
      </main>
      <Footer />
    </Page>
  );
}

BookCall.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
