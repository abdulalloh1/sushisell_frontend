import axios from "axios";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const accessToken = localStorage.getItem('accessToken')
    config.headers = config.headers ?? {}

    if (accessToken) config.headers.Authorization = accessToken
    config.headers.Accept = 'application/json'

    return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL + 'v2'
})

export const axiosInstanceV1 = setupInterceptorsTo(instance)