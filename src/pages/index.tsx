// getServerSideProps as PageProps
import { Chart } from './Chart';
//import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// export const getServerSideProps = PageProps;

export default Chart;

export async function  getStaticProps(context: { locale: any; }) {
    // extract the locale identifier from the URL
    const { locale } = context
  
    return {
      props: {
        // pass the translation props to the page component
      //  ...(await serverSideTranslations(locale)),
      },
    }
  }