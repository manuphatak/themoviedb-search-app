import React from 'react';
import { TheMoveDBApi } from '../utils/TheMoveDBApi';
import { useQueryLite } from '../utils/useQueryLite';
import styles from './App.module.scss';

interface AppProps {
  getMovieList?: typeof TheMoveDBApi.getList;
}

export function App(props: AppProps) {
  const getList = props.getMovieList ?? TheMoveDBApi.getList;
  const movieList = useQueryLite([1, 1], getList);

  if (movieList.isLoading) {
    // TODO: Loading screen
    return <>Loading</>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.App}>
        <input
          type="search"
          className={styles.SearchInput}
          placeholder="Search"
        />

        {movieList.data.results.map((movie) => (
          <article
            key={movie.id}
            className={styles.MovieCard}
            data-testid="movie-card"
          >
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="Poster"
            />

            <div className={styles.info}>
              <p className={styles.title}>{movie.title}</p>
              <p className={styles.overview}>{movie.overview}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
