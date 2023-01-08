import {axiosInstanceV1} from "@/api/base/HTTPBaseService";
import type { AxiosInstance } from "axios";

export class Core {
    protected _axios: AxiosInstance;
    protected url: string;

    constructor(url: string, instance?: AxiosInstance) {
        this._axios = instance ?? axiosInstanceV1;
        this.url = url;
    }

    getAll (config?: object) {
        return this._axios.get(this.url, config)
    }

    getSingle (id: number, config?: object) {
        return this._axios.get(this.url + '/' + id, config)
    }

    post (config?: object) {
        return this._axios.post(this.url, config)
    }
}