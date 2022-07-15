import { NavLink } from 'react-router-dom';
import styles from './LeftSidebar.module.scss';
import { FaHome, FaCompass, FaHistory } from 'react-icons/fa';
import clsx from 'clsx';

function LeftSidebar({ type }) {
    return (
        <div className={styles.leftSidebar}>
            <h2 className={styles.title}>Menu</h2>
            <div className={styles.menu}>
                <NavLink to="/" className={(nav) => clsx(styles.menuItem, { [styles.active]: nav.isActive })}>
                    <FaHome className={styles.icon} />
                    <p className={styles.text}>Home</p>
                </NavLink>
                <NavLink to="/explore" className={(nav) => clsx(styles.menuItem, { [styles.active]: nav.isActive })}>
                    <FaCompass className={styles.icon} />
                    <p className={styles.text}>Explore</p>
                </NavLink>
                <NavLink to="/history" className={(nav) => clsx(styles.menuItem, { [styles.active]: nav.isActive })}>
                    <FaHistory className={styles.icon} />
                    <p className={styles.text}>History</p>
                </NavLink>
            </div>
        </div>
    );
}

export default LeftSidebar;
