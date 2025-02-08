import { useState, useEffect } from "react";

export const useSearchDebounce = () => {
    const [debouncedValue, setDebouncedValue] = useState<string>('');
    const [desiredValue, setDesiredValue] = useState<string>('');

    useEffect(() => {
            const handler = setTimeout(() => setDesiredValue(debouncedValue), 500)
            return () => clearTimeout(handler)
    }, [debouncedValue, setDebouncedValue]);
    return {setDebouncedValue, debouncedValue, desiredValue}
}