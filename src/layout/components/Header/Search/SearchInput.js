import styles from './Search.module.scss';
import { MdOutlineClear } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import useDebounce from '@/hooks/useDebounce';
import { getSearchInput } from '@/utils/api';
import SearchResult from './SearchResult';

function SearchInput() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [isShowSearchResult, setIsShowSearchResult] = useState(false);

    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        const value = debounceValue.trim();
        if (value) {
            setIsLoading(true);
            getSearchInput(value).then((data) => {
                setIsLoading(false);
                setResult(data);
            });
        } else {
            setResult([]);
        }
    }, [debounceValue]);

    const handleSearchValue = (e) => {
        const searchValue = e.target.value;
        searchValue && setIsShowSearchResult(true);
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClearSearchValue = () => {
        setSearchValue('');
    };

    const handleHideResult = () => {
        setIsShowSearchResult(false);
    };

    const handleShowResult = (e) => {
        const searchValue = e.target.value;
        searchValue && setIsShowSearchResult(true);
    };

    return (
        <div className={styles.search}>
            <div className={styles.searchInputContainer}>
                <input
                    value={searchValue}
                    onChange={handleSearchValue}
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search any Movies or TVShows"
                    onBlur={handleHideResult}
                    onFocus={handleShowResult}
                />
                <span
                    className={clsx(styles.loading, {
                        [styles.active]: isLoading,
                    })}
                >
                    <AiOutlineLoading3Quarters />
                </span>
                <button onClick={handleClearSearchValue} className={styles.clearBtn}>
                    <MdOutlineClear />
                </button>
                {isShowSearchResult && <SearchResult data={result} />}
            </div>
        </div>
    );
}

export default SearchInput;
