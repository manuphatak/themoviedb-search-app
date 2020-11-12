export interface SearchableMovie {
  overview: string;
}

export function buildMovieListIndex<T extends SearchableMovie>(
  movieList: T[]
): (needle: string) => T[] {
  const reverseIndex = movieList.reduce(
    (index, movie) =>
      movie.overview
        .toLowerCase()
        .replace(/[^\w\d\s]/g, '')
        .split(' ')
        .reduce((i, word) => i.set(word, (value) => [...value, movie]), index),
    new DefaultDict(() => [] as T[])
  );

  return function searchMovieList(needle: string) {
    const lowerCaseNeedle = needle.toLowerCase();

    return reverseIndex
      .keys()
      .filter((key) => key.includes(lowerCaseNeedle))
      .map((key) => reverseIndex.get(key))
      .reduce(concat, [] as T[])
      .filter(onlyUniq);
  };
}

class DefaultDict<T> {
  private __getFallback: (key: string) => T;
  data: { [key: string]: T } = {};

  constructor(getFallback: (key: string) => T) {
    this.__getFallback = getFallback;
  }

  get(key: string) {
    return this.data.hasOwnProperty(key)
      ? this.data[key]
      : this.__getFallback(key);
  }

  set(key: string, setFn: (value: T) => T) {
    this.data[key] = setFn(this.get(key));
    return this;
  }

  keys() {
    return Object.keys(this.data);
  }
}
function concat<T>(previousValue: T[], currentValue: T[]): T[] {
  return [...previousValue, ...currentValue];
}

function onlyUniq<T>(value: T, index: number, array: T[]): boolean {
  return array.indexOf(value) === index;
}
