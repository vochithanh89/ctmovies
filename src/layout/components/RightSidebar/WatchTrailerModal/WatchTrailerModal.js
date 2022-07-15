import Modal from '@/components/shared/Modal/Modal';
import { memo, useEffect, useState } from 'react';
import styles from './WatchTrailerModal.module.scss';
import clsx from 'clsx';
import SkeletonLoading from '@/components/shared/SkeletonLoading/SkeletonLoading';

function WatchTrailerModal({ youtubeId, isOpen, toggle }) {
    const [iframeLoading, setIframeLoading] = useState(true);

    useEffect(() => {
        setIframeLoading(true);
    }, [youtubeId]);

    const renderSkeletonLoading = () => {
        return <SkeletonLoading className={styles.modalIframe} height="100%" />;
    };

    const handleIframeLoaded = () => {
        setIframeLoading(false);
    };

    return (
        <Modal background isOpen={isOpen} toggle={toggle}>
            <div className={styles.watchTrailerModal}>
                {iframeLoading && renderSkeletonLoading()}
                {isOpen && (
                    <iframe
                        className={clsx(styles.modalIframe, {
                            [styles.hide]: iframeLoading,
                        })}
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                        onLoad={handleIframeLoaded}
                    ></iframe>
                )}
            </div>
        </Modal>
    );
}

export default memo(WatchTrailerModal);
