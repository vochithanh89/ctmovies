import styles from './Image.module.scss';
import clsx from 'clsx';
import replacePT from '@/assets/images/replaceImgPT.jpg';
import replaceBR from '@/assets/images/replaceImgBR.jpg';
import { memo } from 'react';

function Image({ type = 'poster', src, alt, onClick, onLoad, className }) {
    return (
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
    );
}

export default memo(Image);
