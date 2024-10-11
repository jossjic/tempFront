import {
  Toast,
  ToastErrorBGColor,
  ToastErrorIcon,
  ToastNotificationBGColor,
  ToastNotificationIcon,
  ToastObject,
  ToastSuccessBGColor,
  ToastSuccessIcon,
  ToastWarningBGColor,
  ToastWarningIcon
} from '@components/shared/toast';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

export type AddToastParams = {
  id?: number;
  title?: string;
  message?: string;
  fixed?: boolean;
};

type ToastContextInterface = {
  addToast: (toast: ToastObject) => void;

  toastError: (params: AddToastParams) => void;
  toastSuccess: (params: AddToastParams) => void;
  toastWarning: (params: AddToastParams) => void;
  toastNotification: (params: AddToastParams) => void;

  clearToasts: Function;

  setMarginTop: (margin: number) => void;
};

const ToastContext = createContext<ToastContextInterface>(
  {} as ToastContextInterface
);

/**
 * Hook para mostrar toasts
 * @returns any
 */
export const useToast = () => useContext(ToastContext);

/** ToastProvider Component **/
export const ToastProvider = ({ children }: any) => {
  const { route } = useRouter();
  const [toastList, setToastList] = useState<Array<ToastObject>>([]);
  const [marginTop, setMarginTop] = useState<number>(0);

  useEffect(() => {
    if (route) {
      removeFixedToasts();
    }
  }, [route]);

  const addToast = (toast: ToastObject) => {
    if (toastList.some((x) => x.id == toast.id)) {
      setToastList((prev) => {
        return prev.map((x) => {
          if (x.id == toast.id) {
            return toast;
          } else {
            return x;
          }
        });
      });

    } else {
      setToastList((prev)=>[...prev, toast]);
    }
  };

  const toastSuccess = ({
    id = 200,
    title,
    message,
    fixed,
  }: AddToastParams) => {
    addToast({
      id: id,
      title: title,
      description: message,
      icon: ToastSuccessIcon,
      backgroundColor: ToastSuccessBGColor,
      fixed: fixed ? fixed : false,
    });
  };

  const toastError = ({ id = 300, title, message, fixed }: AddToastParams) => {
    addToast({
      id: id,
      title: title ,
      description: message,
      icon: ToastErrorIcon,
      backgroundColor: ToastErrorBGColor,
      fixed: fixed ? fixed : false,
    });
  };

  const toastWarning = ({ id = 400, title, message, fixed }: AddToastParams) => {
    addToast({
      id: id,
      title: title ,
      description: message,
      icon: ToastWarningIcon,
      backgroundColor: ToastWarningBGColor,
      fixed: fixed ? fixed : false,
    });
  };

  const toastNotification = ({ id = 400, title, message, fixed }: AddToastParams) => {
    addToast({
      id: id,
      title: title ,
      description: message,
      icon: ToastNotificationIcon,
      backgroundColor: ToastNotificationBGColor,
      fixed: fixed ? fixed : false,
    });
  };

  
  const clearToasts = () => {
    setToastList([]);
  };

  const removeFixedToasts = () => {
    const toasts = toastList;
    toasts.forEach((t) => {
      t.fixed = false;
    });
    setToastList(toasts);
  };

  return (
    <ToastContext.Provider
      value={{
        addToast,
        toastError,
        toastSuccess,
        toastWarning,
        toastNotification,
        clearToasts,
        setMarginTop,
      }}
    >
      {children}
      <Toast
        toastList={toastList}
        position="top-right"
        autoDelete={true}
        autoDeleteTime={3500}
        marginTop={marginTop}
      />
    </ToastContext.Provider>
  );
};
