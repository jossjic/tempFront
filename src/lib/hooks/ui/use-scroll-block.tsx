import { useEffect, useRef } from "react";



const useScrollBlock = (deps?: ReadonlyArray<boolean> | undefined) => {
    const bodyRef = useRef<HTMLBodyElement | null>(null);
    useEffect(function () {
        // block scroll when filters are open
        const updatePageScroll = function updatePageScroll() {
            bodyRef.current = window.document.querySelector('body');
            if (bodyRef.current) {
                if (deps?.some((val) => val === true)) {
                    bodyRef.current.style.overflow = 'hidden';
                } else {
                    bodyRef.current.style.overflow = '';
                }
            }
        };
        updatePageScroll();
    }, deps);
};

export default useScrollBlock;