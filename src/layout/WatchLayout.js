import styles from './Layout.module.scss';
import Header from './components/Header/Header';
import Container from '@/components/Container/Container';

function WatchLayout({ children }) {
    return (
        <div className={styles.layoutWrap}>
            <Header />
            <div className={styles.FullLayout}>
                <Container>{children}</Container>
            </div>
        </div>
    );
}

export default WatchLayout;
