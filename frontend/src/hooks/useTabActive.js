import { useState, useEffect } from 'react';
import tabService from '../services/tabService';

const useTabActive = () => {
    const [isActive, setIsActive] = useState(tabService.isTabActive());

    useEffect(() => {
        const cleanup = tabService.addListener(setIsActive);
        return cleanup;
    }, []);

    return isActive;
};

export default useTabActive;