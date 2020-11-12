import React, { useMemo, useState } from 'react';
import { buildMovieListIndex } from '../utils/searchMovieList';
import { Movie, TheMoveDBApi } from '../utils/TheMoveDBApi';
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
  movies: Movie[];
}

function LoadedApp(props: LoadedAppProps) {
  const [searchInput, setSearchInput] = useState('');

  const searchMovieList = useMemo(() => buildMovieListIndex(props.movies), [
    props.movies,
  ]);

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
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

interface MovieCardProps {
  movie: Movie;
}
function MovieCard(props: MovieCardProps): JSX.Element {
  return (
    <article className={styles.MovieCard} data-testid="movie-card">
      <img
        className={styles.poster}
        src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
        alt="Poster"
      />

      <div className={styles.info}>
        <h2 className={styles.title}>{props.movie.title}</h2>
        <p className={styles.overview}>{props.movie.overview}</p>
      </div>
    </article>
  );
}
