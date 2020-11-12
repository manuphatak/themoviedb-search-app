import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MOVIE_LIST } from '../utils/mockData';
import { App } from './App';

describe('given a loaded App', () => {
  async function loadedApp() {
    const wrapper = render(
      <App getMovieList={() => Promise.resolve(MOVIE_LIST)} />
    );

    await act(async () => {
      await wrapper.findAllByTestId('movie-card');
    });

    return wrapper;
  }

  describe('when initially rendering', () => {
    it('renders all of the movie cards', async () => {
      const { getAllByTestId } = await loadedApp();

      expect(getAllByTestId('movie-card')).toHaveLength(20);
    });
  });

  describe('when searching', () => {
    it('filters moves', async () => {
      const { getAllByTestId, getByTestId, getByText } = await loadedApp();

      fireEvent.change(getByTestId('search-movies-input'), {
        target: { value: 'Civil' },
      });

      expect(getByText('Thor: Ragnarok')).toBeInTheDocument();
      expect(getByText('Spider-Man: Homecoming')).toBeInTheDocument();
      expect(getAllByTestId('movie-card')).toHaveLength(2);
    });
  });
});
