import { Login } from './login';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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