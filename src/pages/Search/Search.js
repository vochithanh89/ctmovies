import styles from './Search.module.scss';
import SearchInput from '@/layout/components/Header/Search/SearchInput';
import { Helmet } from 'react-helmet';
import { siteName, slogan, title } from '@/components/constants/constants';

function Search() {
    return (
        <>
            <Helmet>
                <title>{`Search - ${title}`}</title>
                <meta name="description" content={slogan} />
                <meta property="og:title" content={`Search - ${title}`} />
                <meta property="og:image" content={''} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:description" content={slogan} />
            </Helmet>
            <div className={styles.search}>
                <SearchInput type="searchPage" />
            </div>
        </>
    );
}

export default Search;
