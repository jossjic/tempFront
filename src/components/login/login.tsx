import LoginForm from './login-form';
import { useTranslation } from 'next-i18next'
import classNames from 'classnames';
import { useRouter } from 'next/router';

const Login = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { route } = router;

  return (
    <div className='min-h-screen flex flex-col'>
      <div id="login-container" className='flex flex-col gap-4 flex-1 overflow-visible'>
          <div className='flex-1 flex flex-col justify-center'>
            <LoginForm />
          </div>
      </div>
    </div>
  );
};
export default Login;