import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: any) => {
    const [debounce, setDebounce] = useState<string>('');

    useEffect(() => {
        const handle = setTimeout(() => {
            setDebounce(value);
        }, delay);

        return () => clearInterval(handle);
    }, [value,delay]);

    return debounce;
};

export default useDebounce;