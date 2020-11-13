export interface SearchableMovie {
  overview: string;
}

export function searchMovieList<T extends SearchableMovie>(
  movieList: T[],
  needle: string
): T[] {
  const lowerCaseNeedle = needle.toLowerCase();
  return movieList.filter((movie) =>
    movie.overview
      .toLowerCase()
      .replace(/[^\w\d\s]/gm, '')
      .includes(lowerCaseNeedle)
  );
}
