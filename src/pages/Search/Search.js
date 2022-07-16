import styles from './Search.module.scss';
import SearchInput from '@/layout/components/Header/Search/SearchInput';

function Search() {
    return (
        <div className={styles.search}>
            <SearchInput type="searchPage" />
        </div>
    );
}

export default Search;
