import React, { useEffect } from 'react';
import {
  QueryCache,
  ReactQueryCacheProvider,
  useInfiniteQuery,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { BrowserRouter, Link, Route, useParams } from 'react-router-dom';
import { TheMoveDBApi } from '../utils/TheMoveDBApi';
import styles from './App.module.scss';
import { LoadedApp, LoadedAppSkeleton } from './LoadedApp';

interface AppProps {
  getMovieList?: typeof TheMoveDBApi.getList;
}

interface ControlPanelProps {
  listId: number;
  fetchMore: () => void;
}

const queryCache = new QueryCache();

export function App(props: AppProps) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route path="/:listId?" render={() => <HomePage {...props} />} />
      </BrowserRouter>
      <ReactQueryDevtools />
    </ReactQueryCacheProvider>
  );
}

function HomePage(props: AppProps) {
  const params = useParams<{ listId?: string }>();

  const listId = toNumber(params.listId, 1);

  const getList = props.getMovieList ?? TheMoveDBApi.getList;
  const movieLists = useAllPages(listId, getList);

  if (movieLists.isLoading || movieLists.isError) {
    return (
      <div className={styles.App}>
        <LoadedAppSkeleton isError={movieLists.isError} />
        <ControlPanel listId={listId} fetchMore={movieLists.fetchMore} />
      </div>
    );
  }

  const movies = movieLists.data!.map((movieList) => movieList.results).flat();
  return (
    <div className={styles.App}>
      <LoadedApp movies={movies} />
      <ControlPanel listId={listId} fetchMore={movieLists.fetchMore} />
    </div>
  );
}

function useAllPages(listId: number, getList: typeof TheMoveDBApi.getList) {
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

  useEffect(() => {
    if (movieLists.canFetchMore && !movieLists.isFetchingMore) {
      movieLists.fetchMore();
    }
  }, [movieLists]);

  return movieLists;
}

function ControlPanel(props: ControlPanelProps) {
  return (
    <div className={styles.Panel}>
      <Link to={`/${props.listId + 1}`} className={styles.PanelButton}>
        +
      </Link>
      <Link
        to={`/${Math.max(1, Math.floor(Math.random() * 10000))}`}
        className={styles.PanelButton}
      >
        ?
      </Link>
      <Link
        to={`/${Math.max(1, props.listId - 1)}`}
        className={styles.PanelButton}
      >
        -
      </Link>
    </div>
  );
}

function toNumber(value: string | undefined, fallback: number): number {
  if (value === undefined) {
    return fallback;
  }
  try {
    return parseInt(value, 10);
  } catch (_error) {
    return fallback;
  }
}
