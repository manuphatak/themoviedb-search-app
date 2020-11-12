import React, { Key, useEffect, useState } from 'react';
import styles from './App.module.scss';

export function App() {
  const movieList = useQueryLite([1, 1], TheMoveDBApi.getList);
  // eslint-disable-next-line no-console
  console.log('state', movieList);

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
          <article key={movie.id} className={styles.MovieCard}>
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

type MovieList = {
  results: {
    id: Key;
    poster_path: string;
    title: string;
    overview: string;
  }[];
};

class TheMoveDBApi {
  static requestOptions: RequestInit = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${process.env.REACT_APP_THE_MOVIE_DB_BEARER_TOKEN}`,
    }),
    redirect: 'follow',
  };

  static getList(id: Key, page: number): Promise<MovieList> {
    const params = new URLSearchParams({ page: page.toString() });
    return fetch(
      `https://api.themoviedb.org/4/list/${id}?${params}`,
      TheMoveDBApi.requestOptions
    ).then((response) => response.json());
  }
}

type QueryResponse<T> =
  | { isLoading: true; data: null }
  | { isLoading: false; data: T };

function useQueryLite<A extends any[], R>(
  args: A,
  query: (...args: A) => Promise<R>
) {
  const [state, setState] = useState<QueryResponse<R>>({
    isLoading: true,
    data: null,
  });

  useEffect(() => {
    // TODO: catch errors
    query(...args).then((data) => setState({ isLoading: false, data }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, args);

  return state;
}
