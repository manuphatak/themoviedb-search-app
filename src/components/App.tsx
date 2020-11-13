import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useParams,
} from 'react-router-dom';
import { TheMoveDBApi } from '../utils/TheMoveDBApi';
import { toNumber } from '../utils/toNumber';
import { useMovieLists } from '../utils/useMovieLists';
import styles from './App.module.scss';
import { LoadedApp, LoadedAppSkeleton } from './LoadedApp';

interface AppProps {
  getMovieList?: typeof TheMoveDBApi.getList;
}

const queryCache = new QueryCache();

export function App(props: AppProps) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/:listId(\d+)" render={() => <HomePage {...props} />} />
          <Route component={FourOhFourPage} />
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools />
    </ReactQueryCacheProvider>
  );
}

function HomePage(props: AppProps) {
  const getList = props.getMovieList ?? TheMoveDBApi.getList;
  const movieLists = useMovieLists(getList);

  if (movieLists.isLoading) {
    return <LoadingPage />;
  }

  if (movieLists.isError) {
    return <FiveHundredPage />;
  }

  const movies = movieLists.data!.flatMap((movieList) => movieList.results);
  return (
    <div className={styles.App}>
      <LoadedApp movies={movies} />
      <ControlPanel />
    </div>
  );
}

function LoadingPage() {
  return (
    <div className={styles.App}>
      <LoadedAppSkeleton message="" />
      <ControlPanel />
    </div>
  );
}
function FiveHundredPage() {
  return (
    <div className={styles.App}>
      <LoadedAppSkeleton isError message="Something went wrong" />
      <ControlPanel />
    </div>
  );
}
function FourOhFourPage() {
  return (
    <div className={styles.App}>
      <LoadedAppSkeleton isError message="Page Not Found" />
      <ControlPanel />
    </div>
  );
}

function ControlPanel() {
  const params = useParams<{ listId?: string }>();
  const listId = toNumber(params.listId, 1);

  const toRandomList = `/${Math.max(1, Math.floor(Math.random() * 10000))}`;
  const toNextList = `/${listId + 1}`;
  const toPrevList = `/${Math.max(1, listId - 1)}`;

  return (
    <div className={styles.Panel}>
      <Link to={toNextList} className={styles.PanelButton}>
        +
      </Link>
      <Link to={toRandomList} className={styles.PanelButton}>
        ?
      </Link>
      <Link to={toPrevList} className={styles.PanelButton}>
        -
      </Link>
    </div>
  );
}
