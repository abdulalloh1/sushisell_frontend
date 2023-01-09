import { defineStore } from "pinia";
import api from "@/api";
import { useCitiesStore } from "@/store/parts/cities";
import { useCartStore } from "@/store/parts/cart";

export interface Product {
    name: String,
    possible_kitchen_comments?: {id: number, title: string}[]
}
export const useMenuStore = defineStore('menu', {
    state: () => ({
        activeCategory: '',
        categories: [],
        products:<Product[]> [],
        cityStore: useCitiesStore(),
        cart: useCartStore(),
        favoriteProducts: []
    }),
    getters: {
        computedCategories(state) {
            return state.categories.map(category => {
                    if (this.cityStore.activeCity.external_id) {
                        category.name = category.title
                        category.products = state.products.filter(product => product.category_id === category.id)
                    }

                    return category
                })
                .filter(category => !this.cityStore.activeCity.external_id ? category : category.parent_id ? category : '')
        },

        computedCategoriesAndProducts () {
            if(!this.cart.cart.products.length) return this.computedCategories

            let newArray = []
            this.cart.cart.products.map(cartItem => {
                newArray = this.computedCategories.map(category => {
                    category.products.find(product => {
                        if(product.id === cartItem.id) {
                            product.quantity = cartItem.quantity
                            return product
                        }
                    })
                    return category
                })
            })

            return newArray
        }
    },
    actions: {
        async getMenu() {
            if (!this.cityStore.activeCity.id) return

            if (this.cityStore.activeCity.external_id) {
                const { data } = await api.catalog.getCatalogApi()
                this.categories = data.categories
                this.products = data.products
                return
            }

            const { data } = await api.menu.getSingle(this.cityStore.activeCity.id)
            this.categories = data.data
        },

        async getFavoriteProducts () {
            const {data} = await api.auth.favoriteProductsApi()
            if(data.success) this.favoriteProducts = data.products
        },

        async addRemoveFavoriteProduct (id: number) {
            const {data} = await api.auth.addRemoveFavoriteProductApi({
                product: id,
                mark: !this.favoriteProducts.includes(String(id))
            })
            if(data.success) this.favoriteProducts = data.products
        }
    }
})