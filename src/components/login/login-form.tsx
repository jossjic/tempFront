import { FormInput } from "@components/shared/forms/input/form-input";
import SubmitButton from "@components/shared/forms/submit-button";
import LoadingSpinner from "@components/shared/loading/loading-spinner";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useAuth } from "@lib/hooks/session/auth-context";
import Logo from "@public/image/logo/Owaru_Logo_Final-10.svg";
import { APP_ROUTES } from "@lib/api/constants";
import { useUIStateManagerContext } from "@lib/utils/use-ui-state-manager";
import classNames from "classnames";
import { useToast } from "@lib/hooks/ui/use-toast";

interface Props { }

type Form = {
  company_alias: string;
  email: string;
  password: string;
};

const LoginForm = (props: Props) => {

  const { t } = useTranslation();
  const router = useRouter();
  const { alias } = router.query;
  const { push, replace } = useRouter();
  const {
    login,
    loading,
    //error,
    isSignedIn,
    token
   } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showCollaboratorFields, setShowCollaboratorFields] = useState(false);
  const { setLoading, setLoadingDebounced } = useUIStateManagerContext()
  const { toastError, toastSuccess } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<Form>({
    defaultValues: {
      company_alias: "",
      email: "admin@example.com",
      password: "12345678",
    },
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAccept = () => {
    closeModal();
  };

  const onSubmit = async (data: Form) => {
    // setLoading(true);
    login(data.company_alias, data.email, data.password);
  };

  useEffect(() => {
    if (alias) {
      setValue("company_alias", alias.toString());
      setShowCollaboratorFields(true);
    }
  }, [alias]);

  /*useEffect(() => {
    if (error) {
      const params = { message: error.message, id: 1, title: '' }
      console.debug("login error:", error, params)
      toastError(params)
    }
  }, [error])*/

  useEffect(() => {
    if (loading) {
      setLoading(loading)
    } else {
     setLoadingDebounced(loading) 
    }
  }, [loading])


  if (isSignedIn) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      id="login-form-container"
      className="flex flex-col gap-4 pt-2  overflow-auto border border-white "
    >
      <form
        className="login-form flex flex-col content-center gap-2 px-12 w-full max-w-md self-center"
        onSubmit={handleSubmit(onSubmit)}
      >

        <h1 className="-ml-8  md:-ml-9 whitespace-pre-wrap leading-none mb-2 mt-6 md:mt-0">
          {showCollaboratorFields ? t("LOGIN.TITLE") : t("LOGIN.TITLE")}
        </h1>

        <FormInput<Form>
          id="email_login"
          type="text"
          name="email"
          autoComplete="username"
          label={t("LOGIN.EMAIL_LABEL")}
          placeholder={t("LOGIN.EMAIL_PLACEHOLDER")}
          className={classNames({
            "mt-9 md:mt-auto": !showCollaboratorFields
          })}
          register={register}
          rules={{
            required: t("REQUIRED_FIELD"),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Formato inválido",
            },
          }}
          errors={errors}
        />
        <FormInput<Form>
          id="password_login"
          type="password"
          name="password"
          autoComplete="current-password"
          label={t("LOGIN.PASSWORD_LABEL")}
          placeholder={t("LOGIN.PASSWORD_PLACEHOLDER")}
          className="mb-9 md:mb-auto"
          register={register}
          rules={{
            required: t("REQUIRED_FIELD"),
          }}
          errors={errors}
        />
        { /*<div className="mt-4">
          <LoadingSpinner loading={loading} />
        </div> */}
        {!loading && <SubmitButton title={t("LOGIN.BEGIN")} size="w-full" />}
        {/*error && (
          <div className="text-center">
            <span className="text-error">{`${error.message}`}</span>
          </div>
        )*/}
      </form>
      <button >
        <span className="text-blue-alt underline hover:text-[#402D87]">
          {t("LOGIN.FORGET_PASSWORD")}
        </span>
      </button>
 
    
    </div>
  );
};

export default LoginForm;
