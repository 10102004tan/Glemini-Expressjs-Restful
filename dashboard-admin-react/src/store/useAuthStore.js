import { create } from 'zustand';
import api from '../libs/axios';
import Cookies from 'js-cookie';

export const useAuthStore = create((set, get) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    login: async (email, password) => {
        try {
            const response = await api.post('/v2/auth/login', { email, password });
            const { data } = response;
            console.log("[STORE] Login:", data);
            if (data) {
                console.log("[STORE] Login successful:", data);
                const { metadata: { tokens, user } } = data;
                set({
                    isAuthenticated: true,
                    user,
                });
                // set token to cookie
                
                // set withCredentials
                api.defaults.withCredentials = true
                api.defaults.headers.common['Authorization'] = tokens.accessToken
                api.defaults.headers.common['x-client-id'] = user.user_id
                // document.cookie = `Authorization=${tokens.accessToken}; path=/; max-age=${60 * 60 * 24 * 2}`; // 2 days
                // document.cookie = `refreshToken=${tokens.refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
                // document.cookie = `x-client-id=${user.user_id}; path=/; max-age=${60 * 60 * 24 * 7}`; // 2 days
                Cookies.set('Authorization', tokens.accessToken, { path: '/', expires: 2 }); // 2 days
                Cookies.set('refreshToken', tokens.refreshToken, { path: '/', expires: 7 }); // 7 days
                Cookies.set('x-client-id', user.user_id, { path: '/', expires: 7 }); // 7 days

                return {
                    success: true,
                    message: "Login successful",
                };
            }
        } catch (error) {
            console.log("[STORE] Login error:", error);
            let errorMessage = "Login failed";
            if (error.response && error.response.data) {
                errorMessage = error.response.data.message || errorMessage;
            }else if (error.message) {
                errorMessage = error.message;
            }else {
                errorMessage = "An unexpected error occurred";
            }
            return {
                success: false,
                message: errorMessage,
            };
        }
    },
    checkAuth: async () => {
        set({ isLoading: true });
        try {
            // get token from cookie
            const accessToken = Cookies.get('Authorization');
            const xClientId = Cookies.get('x-client-id');

            if (!accessToken || !xClientId) {
                console.log("[STORE] No access token or x-client-id found in cookies");
                set({ isAuthenticated: false, user: null, isLoading: false });
                return;
            }

            api.defaults.withCredentials = true
            api.defaults.headers.common['Authorization'] = accessToken
            api.defaults.headers.common['x-client-id'] = xClientId

            const response = await api.get('/v2/auth/me');
            const { metadata } = response.data
            console.log("/me=>emetadata::::", metadata)
            // set withCredentials
            set({ user: metadata, isAuthenticated: true, isLoading: false });
            return {
                success: true,
                message: "authenticated",
            }
        } catch (error) {
            let errorMessage = "Authentication failed";
            if (error.response && error.response.data) {
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.message) {
                errorMessage = error.message;
            } else {
                errorMessage = "An unexpected error occurred";
            }
            console.log("[STORE] CheckAuth error:", errorMessage);
            set({ isAuthenticated: false, user: null, isLoading: false });
            return {
                success: false,
                message: errorMessage,
            };
        }
    },
}))