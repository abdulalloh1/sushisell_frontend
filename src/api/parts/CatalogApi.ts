import { CoreApi } from "@/api/base/CoreApi";
import { useCitiesStore } from "@/store/parts/cities";
import DeviceUuidCache from "@/cache/DeviceUuidCache";

class CatalogApi extends CoreApi {
    constructor(url: string) {
        super(url);
    }

    getCatalogApi () {
        const citiesStore = useCitiesStore()

        return this._axios2.get(`${this.url}`, {
            params: {
                city_id: citiesStore.activeCity.external_id,
                kitchen_comment: 1
            },
            headers: {
                UUID: DeviceUuidCache.get()
            }
        })
    }
}

export default CatalogApi;