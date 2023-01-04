import {axiosInstanceV1} from "@/api/base/HTTPBaseService";

export class Core {
    protected _axios: AxiosInstance;
    protected url: string;

    constructor(url: string) {
        this._axios = axiosInstanceV1;
        this.url = url;
    }

    getAll (params?: object) {
        return this._axios.get(this.url, {params})
    }
}