import React from 'react';
import { QueryCache, ReactQueryCacheProvider, useQuery } from 'react-query';
import { BrowserRouter, Link, Route, useParams } from 'react-router-dom';
import { TheMoveDBApi } from '../utils/TheMoveDBApi';
import styles from './App.module.scss';
import { LoadedApp, LoadedAppSkeleton } from './LoadedApp';
import { ReactQueryDevtools } from 'react-query-devtools';

interface AppProps {
  getMovieList?: typeof TheMoveDBApi.getList;
}

const queryCache = new QueryCache();

export function App(props: AppProps) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <BrowserRouter>
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
  const movieList = useQuery([listId, 1, 'movieList'], getList, {
    staleTime: 60 * 5 * 1000,
    cacheTime: Infinity,
  });

  if (movieList.isLoading || movieList.isError) {
    return (
      <div className={styles.App}>
        <LoadedAppSkeleton isError={movieList.isError} />
        <ControlPanel listId={listId} />
      </div>
    );
  }

  return (
    <div className={styles.App}>
      <LoadedApp movies={movieList.data!.results} />
      <ControlPanel listId={listId} />
    </div>
  );
}

interface ControlPanelProps {
  listId: number;
}
function ControlPanel(props: ControlPanelProps) {
  return (
    <div className={styles.Panel}>
      <Link to={`/${props.listId + 1}`} className={styles.PanelButton}>
        +
      </Link>
      <Link
        to={`/${Math.max(1, Math.floor(Math.random() * 200))}`}
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
