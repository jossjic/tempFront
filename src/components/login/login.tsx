import LoginForm from './login-form';
import { useTranslation } from 'next-i18next'
import classNames from 'classnames';
import Logo from '@public/image/logo/Owaru_Logo.svg';
import Link from 'next/link';

const Login = () => {
  const { t } = useTranslation();


  return (
    <div className='min-h-screen flex flex-col'>
      <div id="login-container" className='flex flex-col gap-4 flex-1 overflow-visible'>
        <div className="login-shadow flex-1 flex flex-col rounded-r-xl border p-2 pl-3 gap-4 max-h-screen">
          <Link href={"/"} className='flex items-center justify-center pt-2'>
            <Logo className='md:h-[62px] h-0 self-start' />
          </Link>
          <div className='flex-1 flex flex-col justify-center pb-12 md:pb-0'>
            <LoginForm />
          </div>
          <p className='my-12 font-light py-4 self-center hidden md:block'>{new Date().getFullYear()}  {t("LOGIN.COPYRIGHT")}</p>
        </div>
      </div>
    </div>
  );
};
export default Login;