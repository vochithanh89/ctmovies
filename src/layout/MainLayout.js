import styles from './Layout.module.scss';
import Container from '@/components/Container/Container';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import RightSidebar from './components/RightSidebar/RightSidebar';
import Header from './components/Header/Header';

function MainLayout({ children }) {
    return (
        <div className={styles.layoutWrap}>
            <Header />
            <div className={styles.mainLayout}>
                <Container>
                    <LeftSidebar />
                    <div className={styles.mainLayoutContents}>{children}</div>
                    <RightSidebar />
                </Container>
            </div>
        </div>
    );
}

export default MainLayout;
