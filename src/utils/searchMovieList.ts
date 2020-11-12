export interface Movie {
  overview: string;
}

export function searchMovieList<T extends Movie>(
  movieList: T[],
  needle: string
): T[] {
  const lowerCaseNeedle = needle.toLowerCase();
  return movieList.filter((movie) =>
    movie.overview.toLowerCase().includes(lowerCaseNeedle)
  );
}
