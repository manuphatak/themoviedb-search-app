import React, { useState } from 'react';
import { searchMovieList } from '../utils/searchMovieList';
import { Movie } from '../utils/TheMoveDBApi';
import styles from './LoadedApp.module.scss';
import { MovieCard, MovieCardSkeleton } from './MovieCard';
import cx from 'classnames';
interface LoadedAppProps {
  movies: Movie[];
}

export function LoadedApp(props: LoadedAppProps) {
  const [searchInput, setSearchInput] = useState('');

  const searchResults = searchMovieList(props.movies, searchInput);

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
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
}

interface LoadedAppSkeletonProps {
  isError?: boolean;
  message: string;
}

export function LoadedAppSkeleton(props: LoadedAppSkeletonProps) {
  return (
    <div className={cx(styles.LoadedApp, { [styles.error]: props.isError })}>
      <input
        type="search"
        className={styles.SearchInput}
        disabled
        value={props.message}
      />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
    </div>
  );
}
