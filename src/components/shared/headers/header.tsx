/*import { useAuth } from "@lib/hooks/session/auth-context";
import { useToast } from "@lib/hooks/ui/use-toast";
import UserImg from "@public/image/list-icons/usuario.svg";
import NotificationImg from "@public/image/list-icons/bell_icon.svg";
import { useRouter } from "next/router";
import "react-modern-drawer/dist/index.css";
import { useState } from "react";
import { useUIStateManagerContext } from "@lib/utils/use-ui-state-manager";
import { useTranslation } from "next-i18next";
import { LoadingIndicator } from "react-select/dist/declarations/src/components/indicators";
import LoadingSpinner from "../loading/loading-spinner";
import Select from "react-select";
import { useCompanyManagerContext } from "@lib/hooks/session/companies-manager-context";*/

type Props = {
  show_all_sections?: boolean;
};

export const Header = ({
  show_all_sections: show_all_sections = true,
}: Props) => {};

Header.displayName = 'Header';
  /*const { logout, user } = useAuth();
  const router = useRouter();
  const { route } = router;
  const { setMarginTop } = useToast();

  const { drawerOpen, setDrawerOpen } = useUIStateManagerContext();
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([
    {
      title: "Notification title",
      message: "Notification message",
    },
  ]);
  const {
    showCompanySelect,
    companies,
    loadingCompanies,
    companiesSelector,
    currentCompany,
    updateCurrentCompany,
  } = useCompanyManagerContext();

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const showHome = () => {
    setDrawerOpen(false);
    router.push("/");
  };

  const logoutAction = () => {
    logout();
  };

  return (
    // sticky
    <header className="bg-white top-0 z-[10] min-h-[72px] flex items-center">
      <div className="container my-0 mx-auto ">
        <div className="flex flex-row md:gap-4 gap-2 items-center relative my-1 md:my-auto ">
          <div className="container flex items-center mx-auto justify-end">
            <nav className="flex flex-row gap-4 justify-end items-baseline">
              <div className="flex flex-row gap-2 items-center">
                {showCompanySelect && !loadingCompanies && (
                  <>
                    <div className="flex flex-col gap-1 min-w-[240px]">
                      <Select
                        classNamePrefix="addl-class"
                        options={companiesSelector}
                        value={companiesSelector?.find(
                          (c) => c.id === currentCompany?.id
                        )}
                        onChange={(val) => {
                          const companySelected = companies?.find(
                            (company) => company.id === val?.id
                          );
                          if (companySelected) {
                            updateCurrentCompany(companySelected);
                          }
                        }}
                        isSearchable={false}
                        menuPosition={"fixed"}
                        placeholder={t("COMPANY_PLACEHOLDER")}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          control: (provided) => ({
                            ...provided,
                            borderColor: "#6b7280",
                            height: "45px",
                            borderRadius: "0.5rem",
                          }),
                        }}
                      />
                    </div>
                  </>
                )}
                <NotificationsDropdown notificationList={[]} />
                <UserDropdown onLogout={logoutAction} />
                <div className="relative">
                  {user && (
                    <p className="font-bold">
                      {user?.name && `${user?.name}`}
                      {user?.first_name &&
                        `${user?.first_name} ${user?.last_name}`}
                    </p>
                  )}
                  <p className="text-gray-700 text-xs">BIENVENIDO</p>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

type UserDropdownProps = {
  onLogout?: () => void;
};

const UserDropdown = ({ onLogout }: UserDropdownProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { loading } = useAuth();

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setOpen(!open)}
        className="relative grid place-items-center cursor-pointer py-2"
      >
        <UserImg height={40} />
      </div>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 flex flex-col items-center" role="none">
            {!loading && (
              <button
                type="button"
                className="text-gray-700 block w-full p-3 text-left text-sm"
                onClick={onLogout}
                disabled={loading}
              >
                {/* <i className="fas fa-sign-out-alt text-[#052245] text-2xl"></i> 
               /* <span>{t("LOGOUT")}</span>
              </button>
            )}
            {loading && <LoadingSpinner containerClass="scale-[0.7] p-0 m-0" />}
          </div>
        </div>
      )}
    </div>
  );
};

type NotificationProps = {
  title?: string;
  message?: string;
};

type NotificationsDropdownProps = {
  notificationList: NotificationProps[];
};

const NotificationsDropdown = ({
  notificationList,
}: NotificationsDropdownProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { loading } = useAuth();

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setOpen(!open)}
        className="relative grid place-items-center cursor-pointer p-2"
      >
        {/* TODO: Change notifications icon 
        /*<NotificationImg height={30} />
      </div>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 flex flex-col items-center" role="none">
            {!loading && (
              <>
                {notificationList.length > 0 &&
                  notificationList.map((notification, index) => (
                    <button
                      key={index}
                      type="button"
                      className="text-gray-700 block w-full px-3 py-2 text-left text-sm"
                      onClick={() => {}}
                      disabled={loading}
                    >
                      <span>{notification.title}</span>
                    </button>
                  ))}
                {!notificationList.length && (
                  <span className="p-2 text-gray-400">
                    No hay notificaciones
                  </span>
                )}
              </>
            )}
            {loading && <LoadingSpinner containerClass="scale-[0.7] p-0 m-0" />}
          </div>
        </div>
      )}
    </div>
  );
};*/
