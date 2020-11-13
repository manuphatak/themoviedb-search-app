import React from 'react';
import { TheMoveDBApi } from '../utils/TheMoveDBApi';
import { useQueryLite } from '../utils/useQueryLite';
import styles from './App.module.scss';
import { LoadedApp, LoadedAppSkeleton } from './LoadedApp';

interface AppProps {
  getMovieList?: typeof TheMoveDBApi.getList;
}

export function App(props: AppProps) {
  const getList = props.getMovieList ?? TheMoveDBApi.getList;
  const movieList = useQueryLite([1, 1], getList);

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
