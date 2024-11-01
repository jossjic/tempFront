import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";


export const FooterLogin = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { t, i18n } = useTranslation();
  if (!i18n.isInitialized) {
    return null; // Or a loading state
  }
  const { route } = router;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <footer className="font-light self-center flex fixed bottom-0 pb-2">
      <a href="/item1" className={`animated-underline mx-4 ${route === "/item1" ? "font-semibold" : ""}`}>
        {t("FOOTER.TERMS")}
      </a>
      <a href="/item1" className={`animated-underline mx-4 ${route === "/item1" ? "font-semibold" : ""}`}>
        {t("FOOTER.POLICY")}
      </a>
    </footer>
  );
};
