import { API, APP_ROUTES } from "@lib/api/constants";
//import { User, API_Token, UserSession } from "@lib/api/models/user/user";
//import { ErrorObj } from "@type/response";
import { useRouter } from "next/router";
import { ReactNode, createContext, use, useCallback, useContext, useEffect, useState } from "react";
import { CachePolicies, IncomingOptions, Provider } from "use-http";
import useSWR, { KeyedMutator } from 'swr';
import fetchJson from "@lib/api/iron-session/fetchJson";
//import { defaultSession } from "@lib/api/iron-session/iron-session-options";

type ProviderProps = {
  children?: React.ReactNode;
};

type ContextInterface = {
  login: (
    company_alias: string,
    email: string,
    password: string,
    remember?: boolean
  ) => void;
  loading: boolean;
  //error?: ErrorObj;
  logout: () => void;
  //session?: UserSession | null;
  //user?: User;
  is_superuser?: boolean;
  is_companyadmin?: boolean;
  roles?: number[] | undefined;
  token?: string | null; //null if no session in local storage
  isSignedIn: boolean;
  isCollaborator: boolean;
  id_company?: number;
};

const Context = createContext<ContextInterface>({} as ContextInterface);

// const SESSION_KEY = "my_app_session"; // Define a key for the session data in local storage
// const COMPANY_SESSION_KEY = "company_id_session"; // Define a key for the company session data in local storage
const XETI_COMPANY_ID = 0;

const defaultParams: RequestInit = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};


/**
 * Hook para almacenar la referencia del usuario que está autenticado en la app
 * @returns any
 */
export const useAuth = () => useContext(Context);

/** UserProvider Component **/
export const AuthProvider: React.FC<ProviderProps> = (props) => {

  
  const { replace,route } = useRouter();
  const { children } = props;
  /*const {
    data: session,
    mutate: mutateUser,
    isValidating,
    error: sessionError,
  } = useSWR<UserSession>('/api/user', {
    focusThrottleInterval: 60 * 1000,
    fallbackData: defaultSession,
  });*/
  //const token = session?.token_data?.access_token;

  const [loading, setLoading] = useState(false);
  //const [loginError, setLoginError] = useState<ErrorObj | undefined>(undefined);

  /*const logout = () => {
    setLoginError(undefined);
    setLoading(true);
    fetchJson<UserSession>('/api/logout', {
      ...defaultParams,
    }).then((result) => {
      mutateUser(defaultSession);
      replace("/");
    }).catch((error) => {
      console.error("login aut-contxt error: ", error);
    }).finally(() => {
      setLoading(false);
    });
  };*/
/*
  const login = (company_alias:string, email: string, password: string) => {
    setLoginError(undefined);
    setLoading(true);
    fetchJson<UserSession>('/api/login', {
      ...defaultParams,
      body: JSON.stringify({
        company_alias,
        username: email,
        password
      }),
    }).then((result) => {
      mutateUser(result);
    }).catch(async (error) => {
      // console.error("login aut-contxt error: ", error);
      if(error?.data?.detail){
        console.error("login aut-contxt error: ", error?.data?.detail);
        // seterrror(error?.data?.detail);
        setLoginError({
          message: error?.data?.detail,
          code: error.status
        });
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  const value: ContextInterface = {
    //logout,
    login,
    error: sessionError || loginError,
    loading: isValidating || loading,
    session: session,
    user: session?.user,
    is_superuser: session?.user?.is_superuser,
    is_companyadmin: session?.user?.is_companyadmin,
    roles: session?.user?.roles,
    token: token,

    isSignedIn: session !== undefined && token !== undefined,
    isCollaborator: !!session?.token_data?.company_id,
    id_company: session?.token_data?.company_id,
  };

  const options: IncomingOptions = {
    cachePolicy: CachePolicies.NO_CACHE,
    headers: {
      Authorization: `Bearer ${token}`,
      // 'Content-Language': 'es-MX',
      // 'Accept-Language': 'es-MX',
      // 'Language': 'es-MX',
    },
    interceptors: {
      request: async ({ options, url, path, route }) => {
        // if (isExpired(token)) {
        //   token = await getNewToken()
        //   setToken(token)
        // }
        options.headers = {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        };

        return options;
      },
      response: async ({ response, request }) => {
        if (response.status === 401 || response.status === 403) {
          // if (data) setData(undefined);
        //  logout();
        }
        return response;
      },
    },
    onNewData: (currData, newData) => {
      if (newData.message === "Welcome to Xeti API") {
        return undefined;
      }
      return newData;
    },
  };

  return (
    <Context.Provider value={value}>
      <Provider url={API.URL} options={options}>
        <UserContextRedirects value={value}>
          {children}
        </UserContextRedirects>
      </Provider>
    </Context.Provider>
  );
};


const UserContextRedirects: React.FC<{ children: ReactNode, value: ContextInterface }> = (props) => {
  const { isSignedIn, isCollaborator, loading } = props.value;
  const { pathname, query, push: pushRoute } = useRouter();

  useEffect(() => {

    if(loading) return;

    if (isSignedIn) {
      if (query.redirect) {
        pushRoute({ pathname: `${query.redirect}` }).then(() => {
          // setLoading(false);
        });
      } else if(pathname === '/') {
        const path = isCollaborator ? APP_ROUTES.COLLABORATOR.INDEX : APP_ROUTES.ADMIN.INDEX;
        pushRoute({ pathname: path }).then(() => {
          // setLoading(false);
        });
      }
    } else {
      pushRoute('/').then(() => {
        // setLoading(false);
      });
    }
  }, [loading, isSignedIn]);

  return (
    <>
      {props.children}
    </>
  )
}*/

return (
  <>
    {props.children}
  </>
)
}