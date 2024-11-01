import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import SecondaryButton from "@components/shared/forms/secondary-button";
import Logo from '@public/image/logo/Owaru_Logo_Final-10.svg';
import Link from 'next/link';
import { useEffect, useState } from "react";

export const Header = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { t, i18n } = useTranslation();
  if (!i18n.isInitialized) {
    return null; // Or a loading state
  }
  const { route } = router;

  const logIn = () => {
  router.push("/");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    // Sticky header
    <header className="bg-transparent top-0 left-0 w-full z-[10] min-h-[72px] flex items-center fixed">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="text-xl font-bold">
        <Link href={"/"} className='flex items-center justify-center pl-2 md:pl-0'>
            <Logo className=' h-[15px] md:h-[25px]' />
          </Link>
        </div>
        <nav className="flex gap-4">
          <a
            href="/item1"
            className={`animated-underline ${
              route === "/item1" ? "font-semibold" : ""
            }`}
          >
             {t("HEADER.ABOUT")}
          </a>
          <a
            href="/item2"
            className={`animated-underline ${
              route === "/item2" ? "font-semibold" : ""
            }`}
          >
            {t("HEADER.HELP")}
          </a>
        </nav>
        <div className="pr-2 md:pr-0">
        <SecondaryButton title={t("HEADER.LOGIN")}  bg="bg-white" onClick={logIn}  />
        </div>
      </div>
    </header>
  );
};

Header.displayName = "Header";
