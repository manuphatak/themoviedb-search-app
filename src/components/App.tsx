import React, { Key, useEffect, useState } from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';

export function App() {
  const state = useQueryLite([1, 2], TheMoveDBApi.getList);
  // eslint-disable-next-line no-console
  console.log('state', state);

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles.link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

class TheMoveDBApi {
  static requestOptions: RequestInit = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${process.env.REACT_APP_THE_MOVIE_DB_BEARER_TOKEN}`,
    }),
    redirect: 'follow',
  };

  static getList(id: Key, page: number) {
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
