import styles from './RightSidebar.module.scss';
import { youtubeThumnailUrl } from '@/components/constants/constants';
import { settingsSelector } from '@/components/redux/selectors';
import Image from '@/components/shared/Image/Image';

import useGetData from '@/hooks/useGetData';
import { getNewTrailers } from '@/utils/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SkeletonLoading from '@/components/shared/SkeletonLoading/SkeletonLoading';
import useModal from '@/hooks/useModal';
import WatchTrailerModal from './WatchTrailerModal/WatchTrailerModal';
import { useState } from 'react';

function RightSidebar() {
    const navigate = useNavigate();
    const { language } = useSelector(settingsSelector);
    const { isOpen, toggle } = useModal();
    const [youtubeId, setYoutubeId] = useState('');

    const { isLoading, isError, isSuccess, data } = useGetData('trailers', getNewTrailers, language);

    const renderTrailerList = () => {
        return data.map((trailer) => {
            return (
                <button
                    key={trailer.id}
                    onClick={() => handleWatchTrailerModal(trailer.key)}
                    className={styles.trailerItem}
                >
                    <Image type="background" className={styles.trailerThumnail} src={youtubeThumnailUrl(trailer.key)} />
                    <p className={styles.trailerName}>{trailer.name}</p>
                </button>
            );
        });
    };

    const renderSkeletonLoading = () => {
        return [...new Array(6)].map((item, index) => {
            return (
                <div key={index} className={styles.trailerItem}>
                    <SkeletonLoading className={styles.trailerThumnail} height="auto" />
                    <SkeletonLoading className={styles.trailerName} count={2} />
                </div>
            );
        });
    };

    const handleWatchTrailerModal = (youtubeId) => {
        setYoutubeId(youtubeId);
        toggle();
    };

    if (isError) {
        navigate('/error');
    }

    return (
        <div className={styles.rightSidebar}>
            <h2 className={styles.title}>New Trailers</h2>

            <div className={styles.trailerList}>
                {isLoading && renderSkeletonLoading()}
                {isSuccess && renderTrailerList()}
                {youtubeId && <WatchTrailerModal youtubeId={youtubeId} isOpen={isOpen} toggle={toggle} />}
            </div>
        </div>
    );
}

export default RightSidebar;
