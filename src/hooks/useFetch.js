import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setisFetching] = useState();
  const [error, seterror] = useState();
  const [fetchedData, setfetchedData] = useState(initialValue);
  useEffect(() => {
    async function fetchData() {
      setisFetching(true);
      try {
        const data = await fetchFn();
        setfetchedData(data);
      } catch (error) {
        seterror({ message: error.message || "Failed to fetch data." });
      }
      setisFetching(false);
    }
    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    error,
    fetchedData,
  };
}
