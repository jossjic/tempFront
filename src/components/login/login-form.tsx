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
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

interface Props {}

type Form = {
  email: string;
  password: string;
};

const LoginForm = (props: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { alias } = router.query;
  const { push, replace } = useRouter();
  const { login, loading, error, isSignedIn, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { setLoading, setLoadingDebounced } = useUIStateManagerContext();
  const { toastError, toastSuccess } = useToast();
  const { route } = router;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<Form>({
    defaultValues: {
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
    login(data.email, data.password);
  };

  useEffect(() => {
    if (error) {
      const params = { message: error.message, id: 1, title: "" };
      console.debug("login error:", error, params);
      toastError(params);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      setLoading(loading);
    } else {
      setLoadingDebounced(loading);
    }
  }, [loading]);

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
      className="flex flex-col gap-4 py-8 overflow-auto border border-white bg-gray-200 bg-opacity-50 backdrop-blur-md rounded-lg p-8 shadow-lg w-full max-w-lg h-auto mx-auto my-auto"
    >
      <form
        className="login-form flex flex-col content-center gap-2 px-12 w-full max-w-md self-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center whitespace-pre-wrap leading-none mb-2 mt-6 mb-12 md:mt-0">
          {t("LOGIN.TITLE")}
        </h1>

        <FormInput<Form>
          id="email_login"
          type="text"
          name="email"
          label={t("LOGIN.EMAIL_LABEL")}
          placeholder=" "
          className="mt-4"
          register={register}
          right={<FaEnvelope className="text-black" />}
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
          className="mb-9 md:mb-auto"
          right={<FaLock className="text-black" />}
          register={register}
          rules={{
            required: t("REQUIRED_FIELD"),
          }}
          errors={errors}
        />
        <a
          href="/item1"
          className={`animated-underline mx-4 text-center pt-2 text-sm ${
            route === "/item1" ? "font-semibold" : ""
          }`}
        >
          {t("LOGIN.FORGET_PASSWORD")}
        </a>
        {!loading && <SubmitButton title={t("LOGIN.BEGIN")} size="w-full" />}

        <p className="text-center text-sm pt-2">
          {t("LOGIN.DONT_HAVE")}
          <a
            href="/item1"
            className={`px-1 font-bold ${
              route === "/item1" ? "font-semibold" : ""
            }`}
          >
            {t("LOGIN.CREATE")}
          </a>
        </p>
        {error && (
          <div className="text-center">
            <span className="text-error">{`${error.message}`}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
