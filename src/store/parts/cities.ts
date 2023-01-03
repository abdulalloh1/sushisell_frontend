import { defineStore } from "pinia";
import api from '@/api'

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: [],
        activeCity: 'Красноярск'
    }),
    actions: {
        async getCities() {
            const { data } = await api.cities.getAll()
            this.cities = data.data
        }
    }
})