import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setLoading(true);

        try {
            const res = await fetch(url, {method, body, headers});

            if (!res.ok) {
                throw new Error(`Couldn\`t fetch ${url}, status: ${res.status}`);
            }
            setLoading(false)
            return await res.json();
        } catch (e) {
            setLoading(false)
            setError(e.message);
            throw e;
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])
    return {
        loading, request, error, clearError
    }
}