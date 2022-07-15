import styles from './Image.module.scss';
import clsx from 'clsx';
import replacePT from '@/assets/images/replaceImgPT.jpg';
import replaceBR from '@/assets/images/replaceImgBR.jpg';
import LazyLoad from 'react-lazyload';
import SkeletonLoading from '../SkeletonLoading/SkeletonLoading';
import { memo } from 'react';

function ImageLazy({ type = 'poster', src, alt, onClick, onLoad, className }) {
    return (
        <LazyLoad
            style={{ display: 'flex' }}
            debounce={300}
            placeholder={
                <SkeletonLoading
                    className={clsx(styles.image, className, {
                        [styles.br]: type === 'background',
                    })}
                    height="auto"
                />
            }
        >
            <img
                className={clsx(styles.image, className, {
                    [styles.br]: type === 'background',
                })}
                src={src}
                alt={alt}
                onClick={onClick}
                onLoad={onLoad}
                onError={(e) => (e.target.src = type === 'poster' ? replacePT : replaceBR)}
            />
        </LazyLoad>
    );
}

export default memo(ImageLazy);
