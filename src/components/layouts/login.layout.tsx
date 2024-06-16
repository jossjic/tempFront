
import { ReactNode } from 'react';
import MinimumPageContainer from '@components/containers/minimum-page.container';
//import { Header } from '@components/shared/headers/header';
import { Footer } from '@components/shared/footer';

type Props = {
  children?: ReactNode;
  header?: boolean;
  show_all_sections?: boolean
};

const LoginLayout = ({ children, header = true, show_all_sections = true }: Props) => {

  return (
    <MinimumPageContainer>
      {/* <Meta title={title} description={description} image={image} url={url} /> */}
      {/* <Navbar />   */}
      <main id="login" className="flex-1 flex flex-col">
        {children}
      </main>
    </MinimumPageContainer>
  );
};

export default LoginLayout;
