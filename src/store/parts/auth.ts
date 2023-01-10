import { defineStore } from "pinia";
import api from "@/api";
import type { Login } from "@/types/auth";
import useToast from "@/components/UI/AppToast/useToast";
import { useMenuStore } from "@/store/parts/menu";
import { useCitiesStore } from "@/store/parts/cities";

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
              const activeCityExternalId = this.citiesStore.activeCity.external_id;
                if(activeCityExternalId) {
                  localStorage.setItem('externalAccessToken', data.token)
                }
                if(!activeCityExternalId) {
                  localStorage.setItem('accessToken', data.token)
                }

                this.isLoggedIn = true
                await Promise.resolve()
                /*await this.menu.getFavoriteProducts()*/
            }

            toast.error(data.error_message)
        }
    }
})