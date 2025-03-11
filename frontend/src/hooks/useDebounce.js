import { useEffect, useRef } from "react";

const useDebounce = (func, delay) => {
    const timeoutRef = useRef(null);

    const debouncedFunction = (...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            func(...args);
        }, delay);
    };
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return debouncedFunction;
};

export default useDebounce;
