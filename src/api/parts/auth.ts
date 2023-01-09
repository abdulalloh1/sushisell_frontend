import { Core } from "@/api/base/Core";
import type { Login, Register } from "@/types/auth";
import { axiosInstanceV1, axiosInstanceV2 } from "@/api/base/HTTPBaseService";

class Auth extends Core {
    constructor(url: string) {
        super(url);
    }

    loginApi (payload: Login) {
        return this._axios2.post(this.url + '/login', payload, {
            headers: {
                UUID: localStorage.getItem('deviceUUID')
            }
        })
    }

    getCaptchaApi () {
        return this._axios.get(`auth/captcha`)
    }

    authExternal (payload: object) {
        return this._axios.post('/auth-external', payload)
    }

    getAvailableRegisterTypesApi () {
        return this._axios2.get(this.url + '/getAvailableRegisterTypes/')
    }

    registerApi (payload: Register) {
        return this._axios2.post(this.url + '/register', payload, {
            headers: {
                UUID: localStorage.getItem('deviceUUID')
            }
        })
    }

    registerCheckApi (payload: {phone: string, code: string}) {
        return this._axios2.post(this.url + '/registerCheck', payload, {
            headers: {
                UUID: localStorage.getItem('deviceUUID')
            }
        })
    }

    userInfoApi () {

    }

    favoriteProductsApi () {
        return this._axios2.get(this.url + '/favoriteProduct')
    }

    addRemoveFavoriteProductApi (payload: object) {
        return this._axios2.post(this.url + '/favoriteProduct', payload)
    }
}

export default Auth;