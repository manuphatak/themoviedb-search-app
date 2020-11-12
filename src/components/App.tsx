import React, { useState } from 'react';
import { buildMovieListIndex } from '../utils/searchMovieList';
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
    <div className={styles.App}>
      <LoadedApp movies={movieList.data.results} />
    </div>
  );
}

interface LoadedAppProps {
  movies: {
    id: React.Key;
    poster_path: string;
    title: string;
    overview: string;
  }[];
}

function LoadedApp(props: LoadedAppProps) {
  const [searchInput, setSearchInput] = useState('');

  const searchMovieList = buildMovieListIndex(props.movies);

  const searchResults = searchMovieList(searchInput);

  return (
    <div className={styles.LoadedApp}>
      <input
        type="search"
        className={styles.SearchInput}
        placeholder="Search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        data-testid="search-movies-input"
      />

      {searchResults.map((movie) => (
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
            <h2 className={styles.title}>{movie.title}</h2>
            <p className={styles.overview}>{movie.overview}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
