import React from 'react';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PositionProvider } from '@/context/positionContext';
import { TeamProvider } from '@/context/teamContext';
import { DeveloperProvider } from '@/context/useDeveloper';
import { store } from '../stores/store';
import '../css/main.css';
import { AuthProvider } from '../context/authContext';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Noop = ({ children }: any) => <>{children}</>;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const Auth = Component.Auth || Noop;
  const title = 'CommentUp - Hire developers Jr in Latam';

  const description = 'Hire Junior developers';

  const url = 'https://commentup.app';

  const image =
    'https://firebasestorage.googleapis.com/v0/b/commentup-prod.appspot.com/o/images%2FScreen%20Shot%202023-06-15%20at%2011.15.08%20AM.png?alt=media&token=c88041d2-9f80-4572-9a76-dcd9c85bbebf';

  const imageWidth = '1920';

  const imageHeight = '960';

  return (
    <Provider store={store}>
      <AuthProvider>
        <DeveloperProvider>
          <PositionProvider>
            <TeamProvider>
              <Auth>
                {getLayout(
                  <>
                    <Head>
                      <meta name="description" content={description} />

                      <meta property="og:url" content={url} />
                      <meta property="og:site_name" content="commentup.app" />
                      <meta property="og:title" content={title} />
                      <meta property="og:description" content={description} />
                      <meta property="og:image" content={image} />
                      <meta property="og:image:type" content="image/png" />
                      <meta property="og:image:width" content={imageWidth} />
                      <meta property="og:image:height" content={imageHeight} />

                      <meta property="twitter:card" content="summary_large_image" />
                      <meta property="twitter:title" content={title} />
                      <meta property="twitter:description" content={description} />
                      <meta property="twitter:image:src" content={image} />
                      <meta property="twitter:image:width" content={imageWidth} />
                      <meta property="twitter:image:height" content={imageHeight} />

                      <link rel="icon" href="/logo.svg" />
                    </Head>

                    <Script
                      src="https://www.googletagmanager.com/gtag/js?id=G-FP2DJ333TP"
                      strategy="afterInteractive"
                    />

                    <Script id="google-analytics" strategy="afterInteractive">
                      {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-FP2DJ333TP');
                  `}
                    </Script>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <Component {...pageProps} />
                  </>,
                )}
              </Auth>
            </TeamProvider>
          </PositionProvider>
        </DeveloperProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
