import { useState, useEffect } from "react";

interface FetchOptions extends RequestInit { };

const useFetchData = <T>(url: string, options?: FetchOptions) => {
    const [ data, setData ] = useState<T | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, options);
                if (!response.ok) throw new Error("Error fetching data");
                const result: T = await response.json();
                setData(result);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ url ]);

    return { data, loading, error };
};

export default useFetchData;
