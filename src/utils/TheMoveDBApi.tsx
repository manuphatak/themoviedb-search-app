import { Key } from 'react';

interface MovieList {
  results: {
    id: Key;
    poster_path: string;
    title: string;
    overview: string;
  }[];
}

export class TheMoveDBApi {
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
