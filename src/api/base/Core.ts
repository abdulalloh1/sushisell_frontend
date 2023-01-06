import {axiosInstanceV1} from "@/api/base/HTTPBaseService";
import type { AxiosInstance } from "axios";

export class Core {
    protected _axios: AxiosInstance;
    protected url: string;

    constructor(url: string, instance?: AxiosInstance) {
        this._axios = instance ?? axiosInstanceV1;
        this.url = url;
    }

    getAll (params?: object) {
        return this._axios.get(this.url, {params})
    }

    getSingle (id: number, params?: object) {
        return this._axios.get(this.url + '/' + id, {params})
    }
}