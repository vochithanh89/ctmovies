import styles from './Loading.module.scss';
import clsx from 'clsx';

function Loading({ width = 70, thickness = 4, className }) {
    return (
        <div className={styles.loadingWrap}>
            <div
                className={clsx(className, styles['loadingio-spinner-eclipse-yfwtxy6yoge'])}
                style={{
                    width: `${width + width / 5}px`,
                    height: `${width + width / 5}px`,
                }}
            >
                <div className={clsx(styles['ldio-l50rxptks9'])}>
                    <div
                        style={{
                            width: `${width}px`,
                            height: `${width}px`,
                            boxShadow: `0 ${thickness}px 0 0 cornflowerblue`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Loading;
