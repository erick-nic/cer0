import { useState, useEffect } from "react";

interface FetchOptions extends RequestInit { }

const useFetchData = <T>(url: string, options?: FetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);

        if (!response.ok) {
          const errorData = await response.json();
          const serverErrorMessage = errorData?.message || "Error fetching data";
          throw new Error(serverErrorMessage);
        }

        const result: T = await response.json();
        if ((result as any).message) {
          setMessage((result as any).message);
        }
        setData(result);
      } catch (err) {
        setError((err as Error).message);
        console.error("Fetch error:", (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error, message };
};

export default useFetchData;