import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        loginModal: false,
    },
    reducers: {
        loginModalToggle: (state, action) => {
            state.loginModal = action.payload === undefined ? !state.loginModal : action.payload;
        },
    },
});
