import { defineStore } from "pinia";
import api from '@/api'
export const useSettingStore = defineStore('setting', {
    state: () => ({
        setting: {}
    }),
    actions: {
        async getSetting() {
            const { data } = await api.setting.getAll()
            this.setting = data.data
        }
    }
})