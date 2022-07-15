import { useEffect, useState } from 'react';

function useDebounce(searchValue, delay = 500) {
    const [debounceValue, setDebounceValue] = useState(searchValue);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceValue(searchValue);
        }, [delay]);

        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line
    }, [searchValue]);
    return debounceValue;
}

export default useDebounce;
