import styles from './Search.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Image from '@/components/shared/Image/Image';
import { imgUrl } from '@/components/constants/constants';

function SearchResult({ data }) {
    const [movies, setMovies] = useState(data);

    useEffect(() => {
        setMovies(data);
    }, [data]);

    return (
        <ul onMouseDown={(e) => e.preventDefault()} className={styles.searchResult}>
            {movies.length > 0 ? (
                movies.map((movie) => {
                    return (
                        <li key={movie.id}>
                            <Link className={styles.resultItem} to={`/${movie.media_type}/${movie.id}`}>
                                <div className={styles.poster}>
                                    <Image
                                        src={imgUrl(movie.poster_path)}
                                        alt={movie.name || movie.title || movie.original_name || movie.original_title}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <h2 className={styles.movieName}>
                                        {movie.name || movie.title || movie.original_name || movie.original_title}
                                    </h2>
                                    <p className={styles.otherInfo}>{`Date: ${
                                        movie.release_date || movie.first_air_date || 'Unknown'
                                    }`}</p>
                                    <p
                                        className={styles.otherInfo}
                                    >{`Vote: ${movie.vote_average} (${movie.vote_count})`}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })
            ) : (
                <p className={styles.nofiText}>Not result found</p>
            )}
        </ul>
    );
}

export default SearchResult;
