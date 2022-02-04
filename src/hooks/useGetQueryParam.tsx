import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useGetQueryParam = (str: string) => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search).get(str), [search]);
};
