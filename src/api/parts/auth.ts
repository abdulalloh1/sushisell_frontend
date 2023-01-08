import { Core } from "@/api/base/Core";
import type { Login, Register } from "@/types/auth";
import { axiosInstanceV2 } from "@/api/base/HTTPBaseService";

class Auth extends Core {
    constructor(url: string) {
        super(url);
        this._axios = axiosInstanceV2
    }

    loginApi (payload: Login) {
        return this._axios.post(this.url + '/login', payload, {
            headers: {
                Authorization: localStorage.getItem('accessToken')
            }
        })
    }

    getAvailableRegisterTypesApi () {
        return this._axios.get(this.url + '/getAvailableRegisterTypes/')
    }

    registerApi (payload: Register) {
        return this._axios.post(this.url + '/register', payload, {
            headers: {
                UUID: localStorage.getItem('deviceUUID')
            }
        })
    }

    registerCheckApi (payload: {phone: string, code: string}) {
        return this._axios.post(this.url + '/registerCheck', payload, {
            headers: {
                UUID: localStorage.getItem('deviceUUID')
            }
        })
    }

    userInfoApi () {
        
    }
}

export default Auth;