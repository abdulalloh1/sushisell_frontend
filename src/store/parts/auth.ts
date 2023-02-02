import { defineStore } from "pinia";
import api from "@/api";
import type { Login } from "@/types/auth";
import useToast from "@/components/UI/AppToast/useToast";
import { useMenuStore } from "@/store/parts/menu";
import { useCitiesStore } from "@/store/parts/cities";
import { ExternalAccessToken, InternalAccessToken } from "@/cache/AccessToken";

const { toast } = useToast()
export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        menu: useMenuStore(),
        citiesStore: useCitiesStore()
    }),
    actions: {
        async login(payload: Login) {
            const { data } = await api.auth.loginApi(payload)
            if(data.success) {
                if(this.citiesStore.hasActiveCityExternalId) {
                    ExternalAccessToken.set(data.token)
                }
                if(!this.citiesStore.hasActiveCityExternalId) {
                    InternalAccessToken.set(data.token)
                }

                this.isLoggedIn = true
                return Promise.resolve()
            }

            toast.error(data.error_message)
        },

        checkTokenFromLocalstorage () {
            const accessWithExternalId = ExternalAccessToken.get() && this.citiesStore.hasActiveCityExternalId
            const accessWithoutExternalId = InternalAccessToken.get() && !this.citiesStore.hasActiveCityExternalId

            this.isLoggedIn = !!accessWithExternalId || !!accessWithoutExternalId
        }
    }
})