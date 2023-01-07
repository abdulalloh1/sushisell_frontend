import { defineStore } from "pinia";
import api from "@/api";
import type { Login } from "@/types/auth";
import useToast from "@/components/UI/AppToast/useToast";

const { toast } = useToast()
export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false
    }),
    actions: {
        async login(payload: Login) {
            const { data } = await api.auth.loginApi(payload)
            if(data.success) {
                localStorage.setItem('accessToken', data.token)
                this.isLoggedIn = true
                return Promise.resolve()
            }

            toast.error(data.error_message)
        }
    }
})