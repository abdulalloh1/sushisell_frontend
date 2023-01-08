import { defineStore } from "pinia";
import api from '@/api'
import { useMenuStore } from "@/store/parts/menu";

export interface City {
    name: string,
    id: number
}

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        isCitiesFetching: false,
        cities: <City[]> [],
        activeCity: <City> {}
    }),
    actions: {
        async getCities() {
            this.isCitiesFetching = true
            const { data } = await api.cities.getAll()
            this.isCitiesFetching = false
            this.cities = data.data

            const activeCity = localStorage.getItem('activeCity')

            if(activeCity) {
                await this.changeActiveCity(activeCity)
            }
        },

        async changeActiveCity (id: number) {
            const selectedCity: City = this.cities.find(city => city.external_id ? +city.external_id === +id : +city.id === +id)
            this.activeCity = { ...selectedCity }

            localStorage.setItem('activeCity', this.activeCity.external_id ? this.activeCity.external_id : this.activeCity.id)

            const catalogStore = useMenuStore()
            await catalogStore.getMenu()
        }
    }
})