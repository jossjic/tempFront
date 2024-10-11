import Clock from '@components/shared/loading/clock/clock-loader';
import useEscape from '@lib/hooks/ui/use-escape';
import useScrollBlock from '@lib/hooks/ui/use-scroll-block';
import { ToastProvider } from '@lib/hooks/ui/use-toast';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { debounce } from 'lodash';

interface ProviderProps {
    children?: React.ReactNode;
}

type ContextInterface = {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingDebounced: React.Dispatch<React.SetStateAction<boolean>>;

    // searchOpen: boolean;
    // setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Context = createContext<ContextInterface>({} as ContextInterface);

/**
 * Hook para almacenar la referencia del estatus de loading en toda la app
 * @returns any
 */
export const useUIStateManagerContext = () => useContext(Context);

/** LoadingProvider Component **/
export const UIStateManagerContextProvider = ({
    children,
}: ProviderProps) => {

    const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    // Create a debounced version of setLoading
    const debouncedSetLoading = debounce((value: React.SetStateAction<boolean>) => {
        const x = typeof value == "function" ? value(loading) : value;
        setLoading(x);
    }, 120); // Adjust the delay as needed

    const obj: ContextInterface = {
        drawerOpen,
        setDrawerOpen: (value) => {
            const x = typeof value == "function" ? value(drawerOpen) : value;
            setDrawerOpen(x);
            // setSearchOpen(false);
        },
        loading,
        setLoading: setLoading, // Use the debounced function here
        setLoadingDebounced: debouncedSetLoading,
    }



    return (
        <Context.Provider
            value={obj}
        >
            <ToastProvider>
                {children}
            </ToastProvider>


            {loading && (
                <Clock setLoading={setLoading} />
            )}

        </Context.Provider>
    );
};