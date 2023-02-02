import { defineStore } from "pinia";
import api from "@/api";
import useToast from "@/components/UI/AppToast/useToast";
import DeviceUuidCache from "@/cache/DeviceUuidCache";
import { InternalAccessToken } from "@/cache/AccessToken";
import ActiveCityCache from "@/cache/ActiveCityCache";

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: {
            products: []
        }
    }),
    actions: {
        async getCart () {
            const {data} = await api.cart.getAll({
                headers: {
                    UUID: DeviceUuidCache.get(),
                    Authorization: InternalAccessToken.get()
                }
            })
            this.cart = data
        },

        async changeProductAmount (id: number, quantity: number, wishes: number[]) {
            const newProduct = {
                id,
                city_id: ActiveCityCache.get(),
                kitchen_comments: wishes,
                quantity
            }
            const {data} = await api.cart.post(newProduct)

            if(data.success) {
                this.cart = data.cart
            }
        },

        async addKitProducts (payload) {
            const {toast} = useToast()
            const {data} = await api.cart.post(payload)

            if(data.success) {
                this.cart = data.cart
                return toast.success('Товар добавлен в корзину')
            }

            return toast.error(data.error_message)
        }
    }
})