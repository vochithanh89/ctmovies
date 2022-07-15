import { imgUrl, imgUrlFull } from '@/components/constants/constants';
import Container from '@/components/Container/Container';
import { settingsSelector } from '@/components/redux/selectors';
import Image from '@/components/shared/Image/Image';
import SkeletonLoading from '@/components/shared/SkeletonLoading/SkeletonLoading';
import useGetData from '@/hooks/useGetData';
import { getDetails } from '@/utils/api';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MdSignalWifiStatusbarNull, MdOutlineCalendarToday, MdStarOutline } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Details.module.scss';
import ImageLazy from '@/components/shared/Image/ImageLazy';

function Details() {
    const navigate = useNavigate();
    const { language } = useSelector(settingsSelector);

    const { mediaType, id } = useParams();

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

    const { isLoading, isError, isSuccess, data } = useGetData('details', getDetails, mediaType, id, language);

    const movieName = useMemo(() => {
        return data && (data.name || data.title || data.original_name || data.original_title);
    }, [data]);

    if (isError) {
        navigate('/error');
    }

    const renderDetails = () => {
        return (
            <Container>
                <div className={styles.detailsContainer}>
                    <div className={styles.poster}>
                        <Image className={styles.posterImg} src={imgUrlFull(data.poster_path)} alt={movieName} />
                    </div>
                    <div className={styles.info}>
                        <h2 className={styles.movieName}>{movieName}</h2>
                        <p className={styles.overview}>{data.overview || 'No Overview'}</p>
                        <p className={styles.otherDetail}>
                            <MdSignalWifiStatusbarNull className={styles.icon} />
                            {`Status: ${data.status || 'Released'}`}
                        </p>
                        <p className={styles.otherDetail}>
                            <MdOutlineCalendarToday className={styles.icon} />
                            {`Release Date: ${data.release_date || data.first_air_date || 'Unknown'}`}
                        </p>
                        <p className={styles.otherDetail}>
                            <MdStarOutline className={styles.icon} />
                            {`Vote Average: ${data.vote_average} (${data.vote_count} vote)`}
                        </p>
                        <ul className={styles.genres}>
                            {data.genres.map((genre) => {
                                return (
                                    <li key={genre.id} className={styles.genre}>
                                        {genre.name}
                                    </li>
                                );
                            })}
                        </ul>
                        <div>
                            <Link to={`/watch/${mediaType}/${id}`} className={styles.watchBtn}>
                                Watch Now
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        );
    };

    const renderSkeletonLoading = () => {
        return (
            <Container>
                <div className={styles.detailsContainer}>
                    <div className={styles.poster}>
                        <SkeletonLoading ratio="10/16" className={styles.posterImg} width="100%" height="auto" />
                    </div>
                    <div className={styles.info}>
                        <SkeletonLoading className={styles.movieName} width="24rem" height="2.6rem" />
                        <div className={styles.overview}>
                            <SkeletonLoading count={4} />
                        </div>
                        <SkeletonLoading className={styles.otherDetail} width="20rem" />
                        <SkeletonLoading className={styles.otherDetail} width="20rem" />
                        <SkeletonLoading className={styles.otherDetail} width="20rem" />
                        <ul className={styles.genres}>
                            {[...new Array(4)].map((genre, index) => {
                                return (
                                    <li key={index} className={clsx(styles.genre, styles.loading)}>
                                        <SkeletonLoading width="10rem" height="3.2rem" />
                                    </li>
                                );
                            })}
                        </ul>
                        <div>
                            <SkeletonLoading width="12rem" height="4.4rem" />
                        </div>
                    </div>
                </div>
            </Container>
        );
    };

    return (
        <div className={styles.detailsWrap}>
            <div
                style={{
                    backgroundImage: `url('${data && imgUrlFull(data.backdrop_path)}')`,
                }}
                className={styles.details}
            >
                {isLoading && renderSkeletonLoading()}
                {isSuccess && renderDetails()}
            </div>
            <div className={styles.casts}>
                <Container>
                    <div className={styles.castsContainer}>
                        <h2 className={styles.castTitle}>Cast</h2>
                        <ul className={styles.castList}>
                            {data?.credits.cast.map((cast) => {
                                return (
                                    <li className={styles.cast} key={cast.id}>
                                        <ImageLazy
                                            className={styles.castPoster}
                                            src={imgUrl(cast.profile_path)}
                                            alt={cast.name || cast.original_name}
                                        />
                                        <h2 className={styles.castName}>{cast.name || cast.original_name}</h2>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Details;
