import React from 'react';
import { BrowserRouter, Route, useParams } from 'react-router-dom';
import { TheMoveDBApi } from '../utils/TheMoveDBApi';
import { useQueryLite } from '../utils/useQueryLite';
import styles from './App.module.scss';
import { LoadedApp, LoadedAppSkeleton } from './LoadedApp';

interface AppProps {
  getMovieList?: typeof TheMoveDBApi.getList;
}

export function App(props: AppProps) {
  return (
    <BrowserRouter>
      <Route path="/:listId?" render={() => <HomePage {...props} />} />
    </BrowserRouter>
  );
}

function HomePage(props: AppProps) {
  const params = useParams<{ listId?: string }>();

  const listId = params.listId ?? 1;

  const getList = props.getMovieList ?? TheMoveDBApi.getList;
  const movieList = useQueryLite([listId, 1], getList);

  if (movieList.isLoading) {
    return (
      <div className={styles.App}>
        <LoadedAppSkeleton />
      </div>
    );
  }

  return (
    <div className={styles.App}>
      <LoadedApp movies={movieList.data.results} />
    </div>
  );
}
