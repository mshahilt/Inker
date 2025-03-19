import { TokenUtils } from '@/utils/tokenUtil';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    accessToken: TokenUtils.getToken() || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload?.user;
            state.accessToken = action.payload?.accessToken;
            TokenUtils.setToken(action.payload?.accessToken)
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            window.location.href = '/auth'; 
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
