import { configureStore } from '@reduxjs/toolkit';
import { filtersSlice } from './filtersSlice';
import { firebaseSlice } from './firebaseSlice';
import { modalSlice } from './modalSlice';
import { settingsSlice } from './settingsSlice';

export const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        settings: settingsSlice.reducer,
        filters: filtersSlice.reducer,
        firebase: firebaseSlice.reducer,
    },
});
