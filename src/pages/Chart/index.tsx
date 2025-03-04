import { NextPageWithLayout } from '@type/page';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

const LoginView = dynamic(() => import('@components/charts/login'));
LoginView.displayName = 'LoginView';

const LoginLayout = dynamic(() => import('@components/layouts/login.layout'));
LoginLayout.displayName = 'LoginLayout';

export const Chart: NextPageWithLayout<any> = () => {
  return (
    <div
      id="login-page"
      className="h-[100%] w-[100%] relative flex flex-col flex-1"
    >
      <LoginView />
    </div>
  );
};



Chart.Layout = (page: ReactElement) => {
  return <LoginLayout header={false}>{page}</LoginLayout>;
};

Chart.displayName = 'Chart';

export default Chart;


export async function  getStaticProps(context: { locale: any; }) {
  // extract the locale identifier from the URL
  const { locale } = context

  return {
    props: {
     // ...(await serverSideTranslations(locale)),
    },
  }
}