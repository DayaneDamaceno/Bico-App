import { useInfiniteQuery } from "react-query";
import { obterPrestadoresMaisProximos } from "../api/ApiService";

export function usePrestadoresMaisProximos() {
  const { data: prestadores, ...rest } = useInfiniteQuery(
    "prestadoresMaisProximos",
    ({ pageParam = 1 }) => obterPrestadoresMaisProximos(pageParam),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length > 0 ? allPages.length + 1 : undefined,
      refetchInterval: false,
    }
  );

  return {
    prestadores,
    ...rest,
  };
}
