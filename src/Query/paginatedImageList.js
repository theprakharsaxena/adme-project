import { useInfiniteQuery } from "@tanstack/react-query";
import fetchImages from "../services/fetchImages";

export function useInfiniteQueryGetPaginatedItemsList(data) {
  const query = useInfiniteQuery(
    ["paginated-images", data],
    ({ pageParam = 0 }) => {
      return fetchImages({
        ...data,
        offset: pageParam,
      });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage,allPages);
        if (lastPage.length < 20) return undefined;
        return allPages.length;
      },
    }
  );

  return query;
}
