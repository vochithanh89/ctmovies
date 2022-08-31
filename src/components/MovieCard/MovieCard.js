import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { imgUrl } from '../constants/constants';
import Image from '../shared/Image/Image';
import ImageLazy from '../shared/Image/ImageLazy';
import styles from './MovieCard.module.scss';

function MovieCard({ type = 'default', className, mediaType, movieName, movieId, posterUrl, pathName, path }) {
    return (
        <div
            className={clsx(styles.movieCard, className, {
                [styles.default]: type !== 'slider' && type !== 'background',
            })}
        >
            <Link to={`/${mediaType}/${movieId}`} className={styles.detailPath} title={movieName}>
                {type === 'background' && (
                    <Image className={styles.poster} type="background" src={imgUrl(posterUrl)} alt={movieName} />
                )}
                {type === 'default' && (
                    <ImageLazy className={styles.poster} type="poster" src={imgUrl(posterUrl)} alt={movieName} />
                )}
                {type === 'slider' && (
                    <Image className={styles.poster} type="poster" src={imgUrl(posterUrl)} alt={movieName} />
                )}

                <h2 className={styles.movieName}>{movieName}</h2>
            </Link>
            {path && (
                <Link to={path} className={styles.episodeName}>
                    {pathName}
                </Link>
            )}
        </div>
    );
}

export default MovieCard;
