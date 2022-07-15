import styles from './MovieListInfinite.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../MovieCard/MovieCard';
import Loading from '../Loading/Loading';

function MovieListInfinite({ data, mediaType, hasMore, fetchMore }) {
    return (
        <InfiniteScroll
            className={styles.movieList}
            dataLength={data.length} //This is important field to render the next data
            next={fetchMore}
            hasMore={hasMore}
            loader={<Loading />}
            scrollThreshold={1}
        >
            {data.map((item) => {
                return item.results.map((movie) => {
                    return (
                        <MovieCard
                            key={movie.id}
                            mediaType={mediaType}
                            movieName={movie.name || movie.title || movie.original_name || movie.original_title}
                            movieId={movie.id}
                            posterUrl={movie.poster_path}
                        />
                    );
                });
            })}
        </InfiniteScroll>
    );
}

export default MovieListInfinite;
