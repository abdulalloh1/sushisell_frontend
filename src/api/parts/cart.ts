import { Core } from "@/api/base/Core";
import { axiosInstanceV2 } from "@/api/base/HTTPBaseService";

class Cart extends Core {
    constructor(url: string) {
        super(url, axiosInstanceV2);
    }

    post (payload: object, config?: object) {
        return this._axios.post(this.url + '/product', payload, {
            ...config,
            headers: {
                UUID: localStorage.getItem('deviceUUID')
            }
        })
    }
}

export default Cart