import { defineStore } from "pinia";
import api from "@/api";

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
                    UUID: localStorage.getItem('deviceUUID'),
                    Authorization: localStorage.getItem('accessToken')
                }
            })
            this.cart = data
        },

        async addRemoveProduct (id: number, quantity: number) {
            const newProduct = {
                id,
                city_id: localStorage.getItem('activeCity'),
                kitchen_comments: [],
                quantity
            }
            const {data} = await api.cart.post(newProduct)

            if(data.success) {
                this.cart = data.cart
            }
        }
    }
})