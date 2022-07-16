import styles from './NotFound.module.scss';
import notFoundImg from '@/assets/images/404Img.png';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className={styles.notFound}>
            <div
                className={styles.background}
                style={{
                    backgroundImage: `url('${notFoundImg}')`,
                }}
            ></div>
            <div className={styles.text}>
                <Link to="/">Return to home</Link>
            </div>
        </div>
    );
}

export default NotFound;
