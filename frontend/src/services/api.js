import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL,
    withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) =>
        error ? reject(error) : resolve(token)
    );
    failedQueue = [];
};

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return api(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await api.post('/auth/refresh');
                const { accessToken } = data;

                processQueue(null, accessToken);

                originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                if (refreshError.response?.status === 401) {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api; 