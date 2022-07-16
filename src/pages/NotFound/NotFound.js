import styles from './NotFound.module.scss';
import notFoundImg from '@/assets/images/404Img.png';
import { Link } from 'react-router-dom';
import { siteName, slogan, title } from '@/components/constants/constants';
import errorImg from '@/assets/images/SEO/error.jpg';
import { Helmet } from 'react-helmet';

function NotFound() {
    return (
        <>
            <Helmet>
                <title>{`Error - ${title}`}</title>
                <meta name="description" content={slogan} />
                <meta property="og:title" content={`Error - ${title}`} />
                <meta property="og:image" content={errorImg} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:description" content={slogan} />
            </Helmet>
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
        </>
    );
}

export default NotFound;
