/*import "@assets/styles/chrome-bug.css";
import "@assets/styles/globals.css";
import "@assets/styles/spinner.css";
import "@assets/styles/tippy.css";
import "@assets/styles/toast.css";*/
import { Head } from "@components/SEO";
import "@type/numberExtensions";
//import { useEffect, useRef } from "react";
import { AppProps } from "next/app";
import { BasePageProps, NextPageWithLayout } from "@type/page";
//import { AuthProvider } from "@lib/hooks/session/auth-context";
//import { UIStateManagerContextProvider } from "@lib/utils/use-ui-state-manager";
//import { ToastProvider } from "@lib/hooks/ui/use-toast";
//import { SWRConfig } from "swr";
//import fetchJson from "@lib/api/iron-session/fetchJson";
//import { CompanyManagerContextProvider } from "@lib/hooks/session/companies-manager-context";

export type AppPropsWithLayout = AppProps<BasePageProps> & {
  Component?: NextPageWithLayout<BasePageProps>;
  example?: string;
};

export function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.Layout || ((page) => page);

  /*useEffect(() => {
    moment().tz("America/Mexico_City").format();
  }, []);*/

  

  return (
    <>
      <Head />
      { /* <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err);
          },
        }}
      > */}
       { /* <AuthProvider> */}
       { /*  <CompanyManagerContextProvider> */}
       { /*   <UIStateManagerContextProvider>  */}
              {getLayout(<Component {...pageProps} />)}
           { /*   </UIStateManagerContextProvider>  */}
          { /* </CompanyManagerContextProvider> */}
          { /* </AuthProvider>  */}
          { /*   </SWRConfig>*/}
    </>
  );
}


export default (MyApp);
