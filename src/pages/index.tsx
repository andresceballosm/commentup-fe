import { NextSeo } from 'next-seo';
import Page from '@/components/page';
import Header from '@/components/header';
import VideoSection from '@/components/video-section';
import ListSection from '@/components/list-section';
import DeveloperSection from '@/components/developers-section';
import Footer from '@/components/footer';
import LoadingComponent from '@/components/template/loading';
import BookCall from '@/components/book-call';
import { useAuth } from '../context/authContext';

export default function Home() {
  const { mount } = useAuth();

  if (!mount) {
    <LoadingComponent loading />;
  }

  return (
    <Page>
      <NextSeo title="CommentUp" description="Hire Junior developers with mentorship from Latin America" />
      <Header />
      <meta name="apple-itunes-app" content="app-id=1665658655, affiliate-data=myAffiliateData, app-argument=myURL" />
      <main>
        {/* <VideoSection /> */}
        <ListSection />
        <DeveloperSection />
        {/* <CasesSection /> */}
        {/* <SocialProof /> */}
        <BookCall />
      </main>
      <Footer />
    </Page>
  );
}
