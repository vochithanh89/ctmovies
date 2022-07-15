import { createSlice } from '@reduxjs/toolkit';

export const firebaseSlice = createSlice({
    name: 'firebase',
    initialState: {
        user: null,
    },
    reducers: {
        userChange: (state, action) => {
            state.user = action.payload !== undefined ? action.payload : state.user;
        },
    },
});
