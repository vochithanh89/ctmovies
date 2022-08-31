import { Link } from 'react-router-dom';
import { imgUrlFull } from '../constants/constants';
import SkeletonLoading from '../shared/SkeletonLoading/SkeletonLoading';
import styles from './SliderCard.module.scss';

function SliderCard({ mediaType, movieName, movieId, backgroundUrl, description }) {
    return (
        <div
            style={{ display: 'block' }}
            debounce={100}
            placeholder={<SkeletonLoading className={styles.sliderCard} height="auto" />}
        >
            <Link
                style={{ backgroundImage: `url(${imgUrlFull(backgroundUrl)})` }}
                className={styles.sliderCard}
                to={`/${mediaType}/${movieId}`}
            >
                <div className={styles.info}>
                    <h2 className={styles.movieName}>{movieName}</h2>
                    <p className={styles.description}>{description}</p>
                </div>
            </Link>
        </div>
    );
}

export default SliderCard;
