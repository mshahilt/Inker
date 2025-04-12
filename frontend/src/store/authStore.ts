import {create} from 'zustand/index';
import {devtools, persist} from 'zustand/middleware';
import {IUser} from "shared/types";
import {AuthService} from '@/services/authServices';

interface AuthState {
    user: Partial<IUser> | null
    accessToken: string | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    signUpError: string | null
}

interface AuthStore extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    googleAuthLogin: (token: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    refreshUser: () => Promise<void>;
    fetchUser: () => Promise<void>;
    logout: () => Promise<{ error: string | null, status: boolean }>;
    clearState: () => Promise<void>;
    refreshToken: () => Promise<string>;
    setState: (state: Partial<AuthState>) => void;
}

const AuthStore = create<AuthStore>();

export const useAuthStore = AuthStore(
    devtools(
        persist(
            function authStore(set, getState) {
                return {
                    user: null,
                    accessToken: null,
                    isAuthenticated: true,
                    isLoading: true,
                    error: null,
                    signUpError: null,

                    login: async (email, password) => {
                        set({isLoading: true, error: null});
                        // const {data, error} = await auth.login(email, password);
                        const {data, error} = await AuthService.loginService({email, password});

                        if (error) {
                            set({error: error, isLoading: false});
                            return;
                        }

                        const {user, accessToken} = data;

                        console.log("user login", accessToken);

                        set({
                            user,
                            accessToken,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                    },

                    googleAuthLogin: async (token: string) => {
                        set({isLoading: true, error: null});
                        const {data, error} = await AuthService.googleAuthLogin(token);

                        if (!data || error) {
                            set({error: error, isLoading: false});
                            return;
                        }

                        const {user, token: accessToken} = data;

                        set({
                            user,
                            accessToken,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                    },

                    register: async (name: string, email: string, password: string) => {
                        set({isLoading: true, signUpError: null});
                        const {data, error} = await AuthService.registerService({name, email, password});

                        if (error) {
                            set({signUpError: error, isLoading: false});
                            return;
                        }

                        console.log('signup data', data);

                        const {user, token: accessToken} = data;

                        set({
                            user,
                            accessToken,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                    },

                    logout: async () => {
                        set({isLoading: true, error: null});
                        const {error} = await AuthService.logout();
                        if (error) {
                            set({error: error, isLoading: false});
                            return {error: error, status: false};
                        }
                        await getState().clearState();
                        console.log('Logged out');
                        return {error: null, status: true};
                    },

                    refreshToken: async () => {
                        set({error: null});

                        if (!getState().isAuthenticated) {
                            return;
                        }

                        const {data, error} = await AuthService.refreshToken();

                        if (error) {
                            set({error: error, isLoading: false});
                            await getState().logout();
                            return error;
                        }

                        const {token} = data;

                        set({accessToken: token, isLoading: false});
                        return token;
                    },

                    fetchUser: async () => {
                        set({isLoading: true, error: null});

                        const {data: user, error} = await AuthService.fetchUser();


                        if (error) {
                            set({error: error, isLoading: false});
                            return;
                        }


                        set({
                            user,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                    },

                    refreshUser: async () => {
                        set({error: null, isLoading: true});

                        const token = await getState().refreshToken();
                        if (!token) {
                            set({isLoading: false});
                            return;
                        }

                        await getState().fetchUser();
                    },

                    setState: ({isLoading, isAuthenticated, user, accessToken}) => {
                        set({isLoading, isAuthenticated, user, accessToken});
                    },

                    clearState:
                        async () => {
                            set({
                                user: null,
                                accessToken: null,
                                isAuthenticated: false,
                                isLoading: false,
                                error: null,
                                signUpError: null,
                            });
                        },
                }
                    ;
            },
            {
                name: 'auth-storage',
                partialize: (state) => ({
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
                }),
            },
        ), {name: 'auth-store', enabled: true},
    ),
);

export default useAuthStore;
