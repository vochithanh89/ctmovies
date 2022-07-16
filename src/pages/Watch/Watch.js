import styles from './Watch.module.scss';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { embedSrc, siteName, slogan, title } from '@/components/constants/constants';
import SkeletonLoading from '@/components/shared/SkeletonLoading/SkeletonLoading';
import Similar from '@/components/Similar/Similar';
import useGetData from '@/hooks/useGetData';
import { getDetails } from '@/utils/api';
import { useSelector } from 'react-redux';
import { settingsSelector } from '@/components/redux/selectors';
import SeasonEpisode from '@/components/SeasonEpisode/SeasonEpisode';
import { addMovieToHistory } from '@/utils/historyLocal';
import Comments from '@/components/Comments/Comments';
import { Helmet } from 'react-helmet';

function Watch() {
    const navigate = useNavigate();
    const location = useLocation();

    const { mediaType, id } = useParams();
    const [seachParams] = useSearchParams();

    const { language } = useSelector(settingsSelector);

    const [iframeLoading, setIframeLoading] = useState(true);

    const season = useMemo(() => (seachParams.get('season') ? Number(seachParams.get('season')) : 1), [seachParams]);
    const episode = useMemo(() => (seachParams.get('episode') ? Number(seachParams.get('episode')) : 1), [seachParams]);

    const [seasons, setSeasons] = useState(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

    const { isLoading, isError, isSuccess, data } = useGetData('details', getDetails, mediaType, id, language);

    const movieName = useMemo(() => {
        return data && (data.name || data.title || data.original_name || data.original_title);
    }, [data]);

    useEffect(() => {
        if (data) {
            setSeasons(data.seasons);
        }
    }, [data]);

    //handle history
    useEffect(() => {
        if (data) {
            const { id, poster_path, overview } = data;
            const path = location.pathname;
            const historyData =
                mediaType === 'movie'
                    ? { id, movieName, mediaType, poster_path, overview, path }
                    : { id, movieName, mediaType, poster_path, overview, season, episode, path };
            addMovieToHistory(historyData);
        }
    }, [movieName, mediaType, season, episode, data, location]);

    useEffect(() => {
        setIframeLoading(true);
    }, [season, episode]);

    if (isError) {
        navigate('/error');
    }

    const handleIframeLoaded = () => {
        setIframeLoading(false);
    };

    const renderDetails = () => {
        return (
            <>
                <h2 className={styles.movieName}>
                    {mediaType === 'movie' ? movieName : `${movieName} Season ${season} Episode ${episode}`}
                </h2>
                <p className={styles.otherDetail}>{`Release Date: ${
                    data.release_date || data.first_air_date || 'Unknown'
                }`}</p>
                <p className={styles.overview}>{data.overview}</p>
            </>
        );
    };

    const renderSkeletonLoading = () => {
        return (
            <>
                <SkeletonLoading className={styles.movieName} width="20rem" height="2rem" />
                <SkeletonLoading className={styles.otherDetail} width="16rem" />
                <div className={styles.overview}>
                    <SkeletonLoading count={6} />
                </div>
            </>
        );
    };

    return (
        <>
            <Helmet>
                {mediaType === 'tv' ? (
                    <title>{movieName ? `${movieName} Season ${season} Episode ${episode} - ${title}` : title}</title>
                ) : (
                    <title>{movieName ? `${movieName} - ${title}` : title}</title>
                )}
                <meta name="description" content={slogan} />
                {mediaType === 'tv' ? (
                    <meta
                        property="og:title"
                        content={movieName ? `${movieName} Season ${season} Episode ${episode} - ${title}` : title}
                    />
                ) : (
                    <meta property="og:title" content={movieName ? `${movieName} - ${title}` : title} />
                )}
                <meta property="og:image" content={data.poster_path} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:description" content={slogan} />
            </Helmet>
            <div className={styles.watch}>
                <div className={styles.watchPlace}>
                    {iframeLoading && <SkeletonLoading className={styles.watchIframe} height="auto" />}
                    <iframe
                        title={id}
                        src={embedSrc(mediaType, id, season, episode)}
                        allowFullScreen="allowfullscreen"
                        frameBorder="0"
                        className={clsx(styles.watchIframe, {
                            [styles.hide]: iframeLoading,
                        })}
                        onLoad={handleIframeLoaded}
                    ></iframe>

                    <div className={styles.details}>
                        {isLoading && renderSkeletonLoading()}
                        {isSuccess && renderDetails()}
                    </div>

                    <div className={styles.comments}>
                        <Comments movieId={id} mediaType={mediaType} season={season} episode={episode} />
                    </div>
                </div>
                <div className={styles.rightSidebar}>
                    {mediaType === 'movie' && <Similar mediaType={mediaType} id={id} />}
                    {mediaType === 'tv' && seasons && (
                        <SeasonEpisode
                            id={id}
                            seasons={seasons}
                            currentSeason={season}
                            currentEpisode={episode}
                            language={language}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Watch;
