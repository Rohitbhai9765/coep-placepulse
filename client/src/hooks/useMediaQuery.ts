import { useEffect, useState } from "react";

const getMatches = (query: string) =>
  typeof window !== "undefined" && window.matchMedia(query).matches;

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => getMatches(query));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);

    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
};

export default useMediaQuery;
