import { defineStore } from "pinia";
import api from '@/api'

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: []
    }),
    getters: {
        citiesGetter: (state) => {
            console.log(state.cities)
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