import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { TheMoveDBApi } from './TheMoveDBApi';
import { toNumber } from './toNumber';

export function useMovieLists(getList: typeof TheMoveDBApi.getList) {
  const params = useParams<{ listId?: string }>();
  const listId = toNumber(params.listId, 1);

  const movieLists = useInfiniteQuery(['movieList', listId], getList, {
    staleTime: 60 * 5 * 1000,
    cacheTime: Infinity,
    getFetchMore: (lastGroup) => {
      if (lastGroup.page >= lastGroup.total_pages) {
        return;
      }

      return lastGroup.page + 1;
    },
  });

  // iterate through pages
  useEffect(() => {
    if (movieLists.canFetchMore && !movieLists.isFetchingMore) {
      movieLists.fetchMore();
    }
  }, [movieLists]);

  return movieLists;
}
