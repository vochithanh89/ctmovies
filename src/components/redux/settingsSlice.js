import { getLanguage, getTheme } from '@/utils/settingsLocal';
import { createSlice } from '@reduxjs/toolkit';
import { languages } from '../constants/constants';

const initLanguage = getLanguage() || languages[0].value;
const initTheme = getTheme() || 'dark';

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        language: initLanguage,
        theme: initTheme,
    },
    reducers: {
        languageChange: (state, action) => {
            state.language = action.payload ? action.payload : state.language;
        },
        themeChange: (state, action) => {
            state.theme = action.payload ? action.payload : state.theme;
        },
    },
});
