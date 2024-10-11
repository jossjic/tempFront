import { useEffect } from "react";

const useEscape = ({ fn }: { fn: Function }, deps?: ReadonlyArray<boolean> | undefined) => {
    return useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                fn && fn();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [deps]);
}

export default useEscape;