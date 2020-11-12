import { useEffect, useState } from 'react';

type QueryResponse<T> =
  | { isLoading: true; data: null }
  | { isLoading: false; data: T };

export function useQueryLite<A extends any[], R>(
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
  }, [...args]);

  return state;
}
