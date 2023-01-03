import {axiosInstanceV1} from "@/api/base/HTTPBaseService";

export class Core {
    constructor(url) {
        this._axios = axiosInstanceV1
        this.url = url
    }

    getAll (params) {
        return this._axios.get(this.url, {params})
    }

    getSingle (id, params) {
        return this._axios.get(`${this.url}/${id}`, {params})
    }

    post (body) {
        return this._axios.post(this.url, body)
    }

    delete (id) {
        return this._axios.delete(this.url + '/' + id)
    }
}