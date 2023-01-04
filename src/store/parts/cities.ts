import { defineStore } from "pinia";
import api from '@/api'

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: [],
        activeCity: {
            id: 10,
            name: 'Красноярск'
        }
    }),
    actions: {
        async getCities() {
            const { data } = await api.cities.getAll()
            this.cities = data.data
        },

        changeActiveCity (id: number) {
            const selectedCity = this.cities.find(city => city.id === id)
            this.activeCity = selectedCity
        }
    }
})