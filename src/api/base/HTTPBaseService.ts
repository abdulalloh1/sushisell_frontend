import axios from "axios";
import { useCitiesStore } from "@/store/parts/cities";
import { ExternalAccessToken, InternalAccessToken } from "@/cache/AccessToken";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const citiesStore = useCitiesStore()
    const activeCityExternalId = citiesStore.activeCity.external_id;
    const accessToken = InternalAccessToken.get()
    const externalAccessToken = ExternalAccessToken.get()
    config.headers = config.headers ?? {}

    if (accessToken && !activeCityExternalId) config.headers.Authorization = accessToken
    if (externalAccessToken && activeCityExternalId) config.headers.Authorization = externalAccessToken
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
    baseURL: import.meta.env.VITE_API_URL + '/v2'
})

const instance2 = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL
})

export const axiosInstanceV1 = setupInterceptorsTo(instance)
export const axiosInstanceV2 = setupInterceptorsTo(instance2)