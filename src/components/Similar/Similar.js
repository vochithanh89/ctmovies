import useGetData from '@/hooks/useGetData';
import { getSimilar } from '@/utils/api';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { imgUrl } from '../constants/constants';
import { settingsSelector } from '../redux/selectors';
import Image from '../shared/Image/Image';
import styles from './Similar.module.scss';

function Similar({ mediaType, id }) {
    const navigate = useNavigate();
    const { languge } = useSelector(settingsSelector);

    const { isError, data } = useGetData('similar', getSimilar, mediaType, id, languge);

    if (isError) {
        navigate('/error');
    }

    return (
        <div className={styles.similar}>
            <h2 className={styles.title}>Similar</h2>
            <div className={styles.similarList}>
                {data?.results.map((movie) => {
                    return (
                        <Link key={movie.id} to={`/${mediaType}/${movie.id}`} className={styles.similarItem}>
                            <Image className={styles.poster} src={imgUrl(movie.poster_path)} alt={movie.name} />
                            <div className={styles.details}>
                                <h2 className={styles.movieName}>
                                    {movie.name || movie.title || movie.original_name || movie.original_title}
                                </h2>
                                <p className={styles.otherDetail}>{`Status: ${data.status || 'Released'}`}</p>
                                <p className={styles.otherDetail}>{`Date: ${
                                    movie.release_date || movie.first_air_date || 'Unknown'
                                }`}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default memo(Similar);
