import styles from './Layout.module.scss';
import Container from '@/components/Container/Container';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';

import Header from './components/Header/Header';
import ScrollTop from './components/ScrollTop/ScrollTop';

function WithBarLayout({ children }) {
    return (
        <div className={styles.layoutWrap}>
            <Header />
            <div className={styles.mainLayout}>
                <Container>
                    <LeftSidebar />
                    <div className={styles.withLeftbarContents}>{children}</div>
                    <ScrollTop />
                </Container>
            </div>
        </div>
    );
}

export default WithBarLayout;
