import { NextPageWithLayout } from '@type/page';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const TestView = dynamic(() => import('@components/test/test'));
TestView.displayName = 'LoginView';

const TestLayout = dynamic(() => import('@components/layouts/login.layout'));
TestLayout.displayName = 'LoginLayout';

export const Test: NextPageWithLayout<any> = ({ user: ss_user }) => {
  return (
    <div
      id="test-page"
      className="h-[100%] w-[100%] relative flex flex-col flex-1"
    >
      <TestView />
    </div>
  );
};

Test.displayName = 'Test';

Test.Layout = (page: ReactElement) => {
  return <TestLayout header={false}>{page}</TestLayout>;
};


export default Test;


export async function  getStaticProps(context: { locale: any; }) {
  // extract the locale identifier from the URL
  const { locale } = context

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  }
}

