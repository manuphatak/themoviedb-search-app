export interface Movie {
  overview: string;
}

export function buildMovieListIndex<T extends Movie>(
  movieList: T[]
): (needle: string) => T[] {
  return function searchMovieList(needle: string) {
    const lowerCaseNeedle = needle.toLowerCase();

    return movieList.filter((movie) =>
      movie.overview.toLowerCase().includes(lowerCaseNeedle)
    );
  };
}
