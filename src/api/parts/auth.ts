import { Core } from "@/api/base/Core";
import type { Login } from "@/types/auth";
import { axiosInstanceV2 } from "@/api/base/HTTPBaseService";

class Auth extends Core {
    constructor(url: string) {
        super(url);
        this._axios = axiosInstanceV2
    }

    loginApi (payload: Login) {
        return this._axios.post(this.url + '/login', payload)
    }
}

export default Auth;