export interface Movie {
  overview: string;
}

export function searchMovieList<T extends Movie>(
  movieList: T[],
  needle: string
): T[] {
  return movieList.filter((movie) =>
    movie.overview.toLowerCase().includes(needle.toLowerCase())
  );
}
