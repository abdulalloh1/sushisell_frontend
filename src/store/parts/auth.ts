import { defineStore } from "pinia";
import api from "@/api";
import type { Login } from "@/types/auth";
import useToast from "@/components/UI/AppToast/useToast";

const { toast } = useToast()
export const useAuthStore = defineStore('auth', {
    state: () => ({

    }),
    actions: {
        async login(payload: Login) {
            const { data } = await api.auth.loginApi(payload)
            if(data.success) return localStorage.setItem('accessToken', data.token)

            toast.error(data.error_message)
        }
    }
})