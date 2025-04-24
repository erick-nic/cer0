import { useState } from "react";

interface SubmitOptions extends RequestInit { }

const useSubmitData = <T>() => {
    const [ data, setData ] = useState<T | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ message, setMessage ] = useState<string | null>(null);

    const submitData = async (url: string, options: SubmitOptions) => {
        try {
            setLoading(true);
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Error submitting data");

            const result: T = await response.json();
            if ((result as any).message) {
                setMessage((result as any).message);
            }
            setData(result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, message, submitData };
};

export default useSubmitData;