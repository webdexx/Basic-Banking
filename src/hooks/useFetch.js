import { useState, useEffect } from "react";

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            Authorization: token ? token : undefined,
            ...(options.headers || {}),
          },
        });

        if (!res.ok) {
          const message = `Request Failed with status ${res.status}`;
          throw new Error(message);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();

  }, [url, token]);

  return { data, loading, error };
}