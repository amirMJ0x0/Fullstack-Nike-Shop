import { useRef } from "react";

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

    return debouncedFunction;
};

export default useDebounce;
