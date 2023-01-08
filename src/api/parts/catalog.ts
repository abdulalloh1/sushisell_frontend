import { Core } from "@/api/base/Core";
import { axiosInstanceV2 } from "@/api/base/HTTPBaseService";
import { useCitiesStore } from "@/store/parts/cities";
import type { AxiosInstance } from "axios";

class Catalog extends Core {
    constructor(url: string, instance: AxiosInstance) {
        super(url);
        this._axios = instance ?? axiosInstanceV2
    }

    getCatalogApi () {
        const citiesStore = useCitiesStore()

        return this._axios.get(`${this.url}`, {
            params: {
                city_id: citiesStore.activeCity.external_id,
                kitchen_comment: 1
            },
            headers: {
                UUID: localStorage.getItem('deviceUUID')
            }
        })
    }
}

export default Catalog;