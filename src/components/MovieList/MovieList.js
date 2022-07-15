import styles from './MovieList.module.scss';
import MovieCard from '../MovieCard/MovieCard';

function MovieList({ data }) {
    return (
        <div className={styles.movieList}>
            {data.map((movie) => {
                return (
                    <MovieCard
                        key={movie.id}
                        mediaType={movie.mediaType}
                        movieName={movie.movieName}
                        movieId={movie.id}
                        posterUrl={movie.poster_path}
                        pathName={
                            movie.mediaType === 'tv'
                                ? `Season ${movie.season} Episode ${movie.episode}`
                                : 'Watch Continue'
                        }
                        path={movie.path}
                    />
                );
            })}
        </div>
    );
}

export default MovieList;
