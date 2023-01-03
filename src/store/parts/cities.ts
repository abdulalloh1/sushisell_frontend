import { defineStore } from "pinia";
import api from '@/api'

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: [],
        activeCity: 'Красноярск'
    }),
    getters: {
        citiesGetter: (state) => {
            return state.cities
        }
    },
    actions: {
        async getCities() {
            const { data } = await api.cities.getAll()
            this.cities = data.data
        }
    }
})