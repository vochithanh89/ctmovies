import styles from './Layout.module.scss';
import Header from './components/Header/Header';

function FullLayout({ children }) {
    return (
        <div className={styles.layoutWrap}>
            <Header type="fixed" />
            <div className={styles.FullLayout}>{children}</div>
        </div>
    );
}

export default FullLayout;
