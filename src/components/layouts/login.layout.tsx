
import { ReactNode } from 'react';
import MinimumPageContainer from '@components/containers/minimum-page.container';
import { Header } from '@components/shared/headers/header-login';
import { FooterLogin } from '@components/shared/footers/footer-login';

type Props = {
  children?: ReactNode;
  header?: boolean;
  show_all_sections?: boolean
};

const LoginLayout = ({ children, header = true, show_all_sections = true }: Props) => {

  return (
    <div>
    <Header />  
    <MinimumPageContainer>
      {/* <Meta title={title} description={description} image={image} url={url} /> */}
      <main id="login" className="flex-1 flex flex-col bg-[url('/image/background-mobile.svg')] md:bg-[url('/image/background-desktop.svg')] bg-cover bg-center">
        {children}
        <FooterLogin />
      </main>
    </MinimumPageContainer>
   
    </div>
  );
};

export default LoginLayout;
