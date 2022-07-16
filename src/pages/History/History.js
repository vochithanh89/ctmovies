import styles from './History.module.scss';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { useEffect, useMemo, useState } from 'react';
import MovieList from '@/components/MovieList/MovieList';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { clearAllHistory, getHistory } from '@/utils/historyLocal';
import { Helmet } from 'react-helmet';
import { siteName, slogan, title } from '@/components/constants/constants';
import historyImg from '@/assets/images/SEO/history.jpg';

function History() {
    const [history, setHistory] = useState(getHistory());

    const disabled = useMemo(() => !history.length > 0, [history]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

    const handleClearAllHistory = () => {
        clearAllHistory();
        setHistory([]);
    };

    return (
        <>
            <Helmet>
                <title>{`History - ${title}`}</title>
                <meta name="description" content={slogan} />
                <meta property="og:title" content={`History - ${title}`} />
                <meta property="og:image" content={historyImg} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:description" content={slogan} />
            </Helmet>
            <div className={styles.history}>
                <h1 className={styles.title}>History</h1>
                <div className={styles.actions}>
                    <button onClick={handleClearAllHistory} className={clsx(styles.clearBtn)} disabled={disabled}>
                        <RiDeleteBin6Line className={styles.icon} />
                        Clear All
                    </button>
                </div>
                {!disabled ? (
                    <MovieList data={history} />
                ) : (
                    <div className={styles.textContainer}>
                        <h2 className={styles.noHistoryText}>No History Found</h2>
                        <Link to="/explore" className={styles.watchNowText}>
                            Watch Now
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default History;
