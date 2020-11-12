import { act, render } from '@testing-library/react';
import React from 'react';
import { MOVIE_LIST } from '../utils/mockData';
import { App } from './App';

test('renders all of the movie cards', async () => {
  const { findAllByTestId, getAllByTestId } = render(
    <App getMovieList={() => Promise.resolve(MOVIE_LIST)} />
  );

  await act(async () => {
    await findAllByTestId('movie-card');
  });

  expect(getAllByTestId('movie-card')).toHaveLength(20);
});
