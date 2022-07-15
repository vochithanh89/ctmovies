import { memo, useEffect, useRef, useState } from 'react';
import style from './ScrollTop.module.scss';
import { IoIosArrowUp } from 'react-icons/io';
import { createPortal } from 'react-dom';

function ScrollTop() {
    const scrollBtnRef = useRef();
    const [currentHeight, setCurrentHeight] = useState(0);

    useEffect(() => {
        const scrollBtnElement = scrollBtnRef.current;
        const handleScroll = () => {
            const scrollH = window.scrollY || document.documentElement.scrollTop;
            if (scrollH < currentHeight && scrollH >= 100) {
                scrollBtnElement.style.display = 'flex';
                setCurrentHeight(scrollH);
            } else {
                scrollBtnElement.style.display = 'none';
                setCurrentHeight(scrollH);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    return createPortal(
        <div
            className={style.scrollTopBtn}
            ref={scrollBtnRef}
            onClick={(e) => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }}
        >
            <IoIosArrowUp></IoIosArrowUp>
        </div>,
        document.querySelector('body'),
    );
}

export default memo(ScrollTop);
