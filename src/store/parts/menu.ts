import { defineStore } from "pinia";
import api from "@/api";
import { useCitiesStore } from "@/store/parts/cities";

export interface Product {
    name: String,
    possible_kitchen_comments?: {id: number, title: string}[]
}
export const useMenuStore = defineStore('menu', {
    state: () => ({
        activeCategory: '',
        categories: [],
        products:<Product[]> [],
        cityStore: useCitiesStore()
    }),
    getters: {
        computedCategories(state) {
            return state.categories
                .map(category => {
                    if (this.cityStore.activeCity.external_id) {
                        category.name = category.title
                        category.products = state.products.filter(product => product.category_id === category.id)
                    }

                    return category
                })
                .filter(category => !this.cityStore.activeCity.external_id ? category : category.parent_id ? category : '')
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
        }
    }
})