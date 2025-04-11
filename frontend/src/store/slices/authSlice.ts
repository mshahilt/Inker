import { DecodedToken } from '@/types';
import { decodeToken, TokenUtils } from '@/utils/tokenUtil';
import { createSlice } from '@reduxjs/toolkit';

interface initialState {
    user: DecodedToken ,
    accessToken: string | null;
}

const initialState: initialState = {
    user: decodeToken(),
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
            state.user = { id: '', username: '', role: '' };
            state.accessToken = null;
            window.location.href = '/auth'; 
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
