import styles from './SkeletonLoading.module.scss';
import clsx from 'clsx';

function SkeletonLoading({ className, count = 1, circle = false, ratio, width = '100%', height = '1.6rem' }) {
    return (
        <div className={styles.skeletonWrap}>
            {[...new Array(count)].map((item, index) => {
                return (
                    <div
                        key={index}
                        className={clsx(className, styles.skeleton, {
                            [styles.circle]: circle,
                        })}
                        style={{
                            width: circle ? height : width,
                            height,
                            aspectRatio: ratio,
                        }}
                    ></div>
                );
            })}
        </div>
    );
}

export default SkeletonLoading;
