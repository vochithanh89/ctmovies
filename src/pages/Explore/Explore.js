import { filtersSelector, settingsSelector } from '@/components/redux/selectors';
import styles from './Explore.module.scss';
import { getExplore, getFilters } from '@/utils/api';
import useGetListInfinite from '@/hooks/useGetListInfinite';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loading from '@/components/Loading/Loading';
import Select from 'react-select';
import useGetData from '@/hooks/useGetData';

import { customSelectStyles } from './customSelectStyles';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import MovieListInfinite from '@/components/MovieListInfinite/MovieListInfinite';
import { filtersSlice } from '@/components/redux/filtersSlice';

function Explore() {
    const dispatch = useDispatch(filtersSlice);
    const { language } = useSelector(settingsSelector);
    const filters = useSelector(filtersSelector);
    const navigate = useNavigate();
    const [mediaType, setMediaType] = useState('movie');
    const handleMediaTypeChange = (mediaType) => {
        setMediaType(mediaType);
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

    const { data: filtersData } = useGetData('filters', getFilters, mediaType, language);
    const { isLoading, isError, isSuccess, result, hasNextPage, fetchNextPage } = useGetListInfinite(
        'exploreList',
        getExplore,
        mediaType,
        language,
        filters[mediaType],
    );

    const handleOptionChange = (option, type) => {
        const action = `${type}Change`;
        dispatch(
            filtersSlice.actions[action]({
                mediaType: mediaType,
                value: option.value,
            }),
        );
    };

    if (isError) {
        navigate('/error');
    }

    return (
        <div className={styles.explore}>
            <div className={styles.actions}>
                <button
                    onClick={() => handleMediaTypeChange('movie')}
                    className={clsx(styles.actionBtn, {
                        [styles.active]: mediaType === 'movie',
                    })}
                >
                    Movies
                </button>
                <button
                    onClick={() => handleMediaTypeChange('tv')}
                    className={clsx(styles.actionBtn, {
                        [styles.active]: mediaType === 'tv',
                    })}
                >
                    TV Show
                </button>
            </div>
            {filtersData && (
                <div className={styles.filters}>
                    <Select
                        isSearchable={false}
                        onChange={(option) => handleOptionChange(option, 'genre')}
                        styles={customSelectStyles}
                        options={filtersData.genres}
                        value={filtersData.genres.find((genre) => genre.value === filters[mediaType].with_genres)}
                    />
                    <Select
                        isSearchable={false}
                        onChange={(option) => handleOptionChange(option, 'time')}
                        styles={customSelectStyles}
                        options={filtersData.time}
                        value={filtersData.time.find((year) => year.value === filters[mediaType].year)}
                    />
                    <Select
                        isSearchable={false}
                        onChange={(option) => handleOptionChange(option, 'sort')}
                        styles={customSelectStyles}
                        options={filtersData.sort}
                        value={filtersData.sort.find((sortValue) => sortValue.value === filters[mediaType].sort_by)}
                    />
                </div>
            )}
            {isLoading && <Loading />}
            {isSuccess && (
                <MovieListInfinite
                    data={result}
                    mediaType={mediaType}
                    hasMore={hasNextPage}
                    fetchMore={fetchNextPage}
                />
            )}
        </div>
    );
}

export default Explore;
