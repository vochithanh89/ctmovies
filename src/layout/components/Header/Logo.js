import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '@/assets/images/logo.png';

function Logo() {
    return (
        <div className={styles.logo}>
            <Link to="/">
                <img className={styles.logoImg} src={logo} alt="ctmovies" />
            </Link>
        </div>
    );
}

export default Logo;
