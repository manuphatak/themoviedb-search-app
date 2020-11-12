export interface SearchableMovie {
  overview: string;
}

export function buildMovieListIndex<T extends SearchableMovie>(
  movieList: T[]
): (needle: string) => T[] {
  const preparedMovieList = movieList.map((movie) => ({
    ...movie,
    _search: movie.overview.toLowerCase(),
  }));

  return function searchMovieList(needle: string) {
    const lowerCaseNeedle = needle.toLowerCase();

    return preparedMovieList.filter((movie) =>
      movie._search.includes(lowerCaseNeedle)
    );
  };
}
