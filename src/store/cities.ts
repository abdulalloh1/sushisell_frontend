import { defineStore } from "pinia";
import api from '@/api'

export const useCitiesStore = defineStore({
    id: 'cities',
    state: () => ({
        cities: []
    }),
    actions: {
        async getCities() {
            const { data } = await api.cities.getAll()
            this.$patch({})
        }
    }
})