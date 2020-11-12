import React from 'react';
import { Movie } from '../utils/TheMoveDBApi';
import styles from './MovieCard.module.scss';
import cx from 'classnames';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard(props: MovieCardProps) {
  return (
    <article className={styles.MovieCard} data-testid="movie-card">
      <img
        className={styles.poster}
        src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
        alt="Poster"
      />

      <div className={styles.info}>
        <h2 className={styles.title}>{props.movie.title}</h2>
        <p className={styles.overview}>{props.movie.overview}</p>
      </div>
    </article>
  );
}

export function MovieCardSkeleton() {
  return (
    <article className={cx(styles.MovieCard, styles.skeleton)}>
      <div className={styles.poster} />

      <div className={styles.info}>
        <p className={styles.title} />
        <p className={styles.overview} />
      </div>
    </article>
  );
}
