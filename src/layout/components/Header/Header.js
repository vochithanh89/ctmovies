import Container from '@/components/Container/Container';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import Actions from './Actions';
import styles from './Header.module.scss';
import Logo from './Logo';
import SearchInput from './Search/SearchInput';

function Header({ type }) {
    const headerRef = useRef();

    useEffect(() => {
        const scrollEvent = () => {
            const scrollHeight = window.scrollY || document.documentElement.scrollTop;
            if (scrollHeight > 100) {
                headerRef.current.classList.add(styles.scroll);
            } else {
                headerRef.current.classList.remove(styles.scroll);
            }
        };
        window.addEventListener('scroll', scrollEvent);

        return () => window.removeEventListener('scroll', scrollEvent);
    }, []);

    return (
        <div
            className={clsx(styles.header, {
                [styles.fixed]: type === 'fixed',
            })}
            ref={headerRef}
        >
            <Container>
                <div className={styles.contents}>
                    <Logo />
                    <SearchInput />
                    <Actions />
                </div>
            </Container>
        </div>
    );
}

export default Header;
