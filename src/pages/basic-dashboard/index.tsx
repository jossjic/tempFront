import { NextPageWithLayout } from '@type/page';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

const BasicDashboardView = dynamic(() => import('@components/charts/basic-dashboard'));

const LoginLayout = dynamic(() => import('@components/layouts/login.layout'));

export const BasicDashboard: NextPageWithLayout<any> = () => {
  return (
    <div
      id="login-page"
      className="h-[100%] w-[100%] relative flex flex-col flex-1"
    >
      <BasicDashboardView />
    </div>
  );
};



BasicDashboard.Layout = (page: ReactElement) => {
  return <LoginLayout header={false}>{page}</LoginLayout>;
};


export default BasicDashboard;


export async function  getStaticProps(context: { locale: any; }) {
  // extract the locale identifier from the URL
  const { locale } = context

  return {
    props: {
     // ...(await serverSideTranslations(locale)),
    },
  }
}