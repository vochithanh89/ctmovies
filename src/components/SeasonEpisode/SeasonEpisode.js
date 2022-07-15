import useGetData from '@/hooks/useGetData';
import { getEpisodeList } from '@/utils/api';
import clsx from 'clsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { imgUrl } from '../constants/constants';
import Image from '../shared/Image/Image';
import styles from './SeasonEpisode.module.scss';

function SeasonEpisode({ id, seasons, currentSeason, currentEpisode, language }) {
    const navigate = useNavigate();
    const [seasonNumber, setSeasonNumber] = useState(currentSeason);

    const { isError, data } = useGetData('episodeList', getEpisodeList, id, seasonNumber, language);

    if (isError) {
        navigate('/error');
    }

    const handleChangeSeasonCount = (seasonNumber) => {
        setSeasonNumber(seasonNumber);
    };

    return (
        <div className={styles.seasonEpisode}>
            <div className={styles.season}>
                <h2 className={styles.title}>Season</h2>
                <div className={styles.list}>
                    {seasons.map((season) => (
                        <button
                            key={season.id}
                            onClick={() => handleChangeSeasonCount(season.season_number)}
                            className={clsx(styles.seasonItem, {
                                [styles.selected]: seasonNumber === season.season_number,
                            })}
                        >
                            <Image className={styles.seasonPoster} src={imgUrl(season.poster_path)} alt={season.name} />
                            <div className={styles.seasonDetails}>
                                <h2 className={styles.seasonName}>{season.name}</h2>
                                <p className={styles.otherDetail}>{`Date: ${season.air_date}`}</p>
                                <p className={styles.otherDetail}>{`Episode: ${season.episode_count}`}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.episode}>
                <h2 className={styles.title}>Episode</h2>
                <div className={styles.list}>
                    {data?.episodes.map((episode) => {
                        return (
                            <Link
                                key={episode.id}
                                to={`/watch/tv/${id}?season=${data.season_number}&episode=${episode.episode_number}`}
                                className={clsx(styles.episodeItem, {
                                    [styles.selected]:
                                        currentEpisode === episode.episode_number &&
                                        currentSeason === data.season_number,
                                })}
                                title={`Episode ${episode.episode_number}: ${episode.name}`}
                            >
                                <Image
                                    type="background"
                                    className={styles.episodePoster}
                                    src={imgUrl(episode.still_path)}
                                    alt={episode.name}
                                />
                                <h2
                                    className={styles.episodeName}
                                >{`Episode ${episode.episode_number}: ${episode.name}`}</h2>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SeasonEpisode;
