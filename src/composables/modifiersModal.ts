import { ref } from "vue";

const isModifiersModalOpen = ref(false)
const roll = ref({
    modifier_groups: []
})
export function useModifiersModal() {

    return {roll, isModifiersModalOpen}
}