import { defineStore } from "pinia";
import api from '@/api'
import { useMenuStore } from "@/store/parts/menu";
import ActiveCityCache from "@/cache/ActiveCityCache";

export interface City {
    name: string,
    id: number,
    external_id: number | null
}

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        isCitiesFetching: false,
        cities: <City[]> [],
        activeCity: <City> {}
    }),
    getters: {
        hasActiveCityExternalId (): boolean {
            return !!this.activeCity.external_id
        }
    },
    actions: {
        async getCities() {
            this.isCitiesFetching = true
            const { data } = await api.cities.getAll()
            this.isCitiesFetching = false
            this.cities = data.data

            const activeCity = ActiveCityCache.get()

            if(activeCity) {
                await this.changeActiveCity(activeCity)
            }
        },

        async changeActiveCity (id: number) {
            const selectedCity: City = this.cities.find(city => city.external_id ? +city.external_id === +id : +city.id === +id)
            this.activeCity = { ...selectedCity }

            if(this.hasActiveCityExternalId) {
                ActiveCityCache.set(this.activeCity.external_id)
            }
            else {
                ActiveCityCache.set(this.activeCity.id)
            }

            const catalogStore = useMenuStore()
            await catalogStore.getMenu()
        }
    }
})