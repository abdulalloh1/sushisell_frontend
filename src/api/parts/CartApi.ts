import { CoreApi } from "@/api/base/CoreApi";
import { axiosInstanceV2 } from "@/api/base/HTTPBaseService";
import DeviceUuidCache from "@/cache/DeviceUuidCache";

class CartApi extends CoreApi {
    constructor(url: string) {
        super(url, axiosInstanceV2);
    }

    post (payload: object, config?: object) {
        return this._axios.post(this.url + '/product', payload, {
            ...config,
            headers: {
                UUID: DeviceUuidCache.get()
            }
        })
    }
}

export default CartApi