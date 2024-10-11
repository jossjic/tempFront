import { NextPageWithLayout } from '@type/page';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const LoginView = dynamic(() => import('@components/login/login'));
LoginView.displayName = 'LoginView';

const LoginLayout = dynamic(() => import('@components/layouts/login.layout'));
LoginLayout.displayName = 'LoginLayout';

export const Login: NextPageWithLayout<any> = ({ user: ss_user }) => {
  return (
    <div
      id="login-page"
      className="h-[100%] w-[100%] relative flex flex-col flex-1"
    >
      <LoginView />
    </div>
  );
};

Login.displayName = 'Login';

Login.Layout = (page: ReactElement) => {
  return <LoginLayout header={false}>{page}</LoginLayout>;
};


export default Login;


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

