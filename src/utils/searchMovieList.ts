export interface SearchableMovie {
  overview: string;
}

export function buildMovieListIndex<T extends SearchableMovie>(
  movieList: T[]
): (needle: string) => T[] {
  return function searchMovieList(needle: string) {
    const lowerCaseNeedle = needle.toLowerCase();

    return movieList.filter((movie) =>
      movie.overview.toLowerCase().includes(lowerCaseNeedle)
    );
  };
}
