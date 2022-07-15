import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        movie: {
            with_genres: '',
            year: '',
            sort_by: 'popularity.desc',
        },
        tv: {
            with_genres: '',
            year: '',
            sort_by: 'popularity.desc',
        },
    },
    reducers: {
        genreChange: (state, action) => {
            if (action.payload.mediaType === 'movie') {
                state.movie.with_genres =
                    action.payload.value !== undefined ? action.payload.value : state.movie.with_genres;
            } else if (action.payload.mediaType === 'tv') {
                state.tv.with_genres = action.payload.value !== undefined ? action.payload.value : state.tv.with_genres;
            }
        },
        timeChange: (state, action) => {
            if (action.payload.mediaType === 'movie') {
                state.movie.year = action.payload.value !== undefined ? action.payload.value : state.movie.year;
            } else if (action.payload.mediaType === 'tv') {
                state.tv.year = action.payload.value !== undefined ? action.payload.value : state.tv.year;
            }
        },
        sortChange: (state, action) => {
            if (action.payload.mediaType === 'movie') {
                state.movie.sort_by = action.payload.value !== undefined ? action.payload.value : state.movie.sort_by;
            } else if (action.payload.mediaType === 'tv') {
                state.tv.sort_by = action.payload.value !== undefined ? action.payload.value : state.tv.sort_by;
            }
        },
    },
});
