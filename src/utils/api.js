import { axiosGet } from './request';

export const getSearchInput = async (query, language = 'en-US') => {
    const data = await axiosGet('/search/multi', {
        params: {
            query,
            language,
            page: 1,
            include_adult: false,
        },
    });

    data.results = data.results.filter((movie) => movie.poster_path);

    if (data.results.length > 10) {
        return data.results.slice(0, 19);
    }
    return data.results;
};

export const getNewTrailers = async (language = 'en-US') => {
    const newMoviesList = await axiosGet('/movie/upcoming', {
        params: {
            language,
            page: 1,
        },
    });
    const movieIdList = newMoviesList.results.map((movie) => movie.id);
    const movieListRequest = movieIdList.map((id) => axiosGet(`/movie/${id}/videos`));
    const movieList = await Promise.all(movieListRequest);
    const trailersList = movieList.map((movie) => movie.results[0]);
    return trailersList.filter((trailer) => !!trailer);
};

export const getHome = async (language) => {
    const defaultParams = {
        language,
    };

    const home = [
        {
            title: 'Movies Trending',
            slidesPerView: 1,
            mediaType: 'movie',
            path: '/movie/now_playing',
            params: defaultParams,
        },
        {
            title: 'Movies Now Playing',
            mediaType: 'movie',
            path: '/trending/movie/day',
            params: defaultParams,
        },
        {
            title: 'Movies Popular',
            mediaType: 'movie',
            path: '/movie/popular',
            params: defaultParams,
        },
        {
            title: 'Top Rated Movies',
            mediaType: 'movie',
            path: '/movie/top_rated',
            params: defaultParams,
        },
        {
            title: 'Movies Upcoming',
            mediaType: 'movie',
            path: '/movie/upcoming',
            params: defaultParams,
        },
        {
            title: 'TV Shows Trending',
            slidesPerView: 1,
            mediaType: 'tv',
            path: '/trending/tv/day',
            params: defaultParams,
        },
        {
            title: 'TV Shows Airing To Day',
            mediaType: 'tv',
            path: '/tv/airing_today',
            params: defaultParams,
        },
        {
            title: 'TV Shows Popular',
            mediaType: 'tv',
            path: '/tv/popular',
            params: defaultParams,
        },
        {
            title: 'Top Rated TV Shows',
            mediaType: 'tv',
            path: '/tv/top_rated',
            params: defaultParams,
        },
        {
            title: 'TV Shows On The Air',
            mediaType: 'tv',
            path: '/tv/on_the_air',
            params: defaultParams,
        },
    ];

    const homeListRequest = home.map(async (item, index) => {
        const data = await axiosGet(item.path, {
            params: {
                ...item.params,
            },
        });
        return {
            ...item,
            data: data.results,
        };
    });
    return await Promise.all(homeListRequest);
};

export const getFilters = async (mediaType, language) => {
    const filters = {
        genres: [
            {
                label: 'All Genres',
                value: '',
            },
        ],
        time: [
            {
                label: 'All Time',
                value: '',
            },
            {
                label: '2022',
                value: '2022',
            },
            {
                label: '2021',
                value: '2021',
            },
            {
                label: '2020',
                value: '2020',
            },
            {
                label: '2019',
                value: '2019',
            },
            {
                label: '2018',
                value: '2018',
            },
            {
                label: '2017',
                value: '2017',
            },
            {
                label: '2016',
                value: '2016',
            },
            {
                label: '2015',
                value: '2020',
            },
            // {
            //     label: 'Older',
            //     value: {
            //         'primary_release_date.lte': '2014',
            //     },
            // },
        ],
        sort: [
            {
                label: 'Popularity',
                value: 'popularity.desc',
            },
            {
                label: 'Recent',
                value: 'primary_release_date.desc',
            },
            {
                label: 'Oldest',
                value: 'primary_release_date.asc',
            },
            {
                label: 'Revenue',
                value: 'revenue.desc',
            },
            {
                label: 'Vote Average',
                value: 'sort_by=vote_average.desc',
            },
        ],
    };

    let genres;

    if (mediaType === 'movie') {
        genres = await axiosGet('/genre/movie/list', {
            params: {
                language,
            },
        });
    } else if (mediaType === 'tv') {
        genres = await axiosGet('/genre/tv/list', {
            params: {
                language,
            },
        });
    }

    genres = genres.genres.map((genre) => {
        return {
            label: genre.name,
            value: genre.id,
        };
    });

    filters.genres.push(...genres);
    return filters;
};

export const getExplore = async (page, mediaType, language, filters) => {
    const data = await axiosGet(`/discover/${mediaType}`, {
        params: {
            language: language,
            page,
            ...filters,
            include_adult: false,
            with_watch_monetization_types: 'flatrate',
            include_video: false,
        },
    });

    return data;
};

export const getDetails = async (mediaType, id, language) => {
    const details = await axiosGet(`/${mediaType}/${id}`, {
        params: {
            language,
            append_to_response: 'credits',
        },
    });

    details.credits.cast = details.credits.cast.filter((item) => item.profile_path).slice(0, 9);

    return details;
};

export const getSimilar = async (mediaType, id, language) => {
    const data = await axiosGet(`/${mediaType}/${id}/similar`, {
        params: {
            language,
        },
    });
    return data;
};

export const getEpisodeList = async (id, season, language) => {
    const data = await axiosGet(`/tv/${id}/season/${season}`, {
        params: {
            language,
        },
    });
    return data;
};
