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
                if(this.citiesStore.activeCity.external_id) localStorage.setItem('externalAccessToken', data.token)
                if(!this.citiesStore.activeCity.external_id) localStorage.setItem('accessToken', data.token)

                this.isLoggedIn = true
                await this.menu.getFavoriteProducts()
                return Promise.resolve()
            }

            toast.error(data.error_message)
        }
    }
})