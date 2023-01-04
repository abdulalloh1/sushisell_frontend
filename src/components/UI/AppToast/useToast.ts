import { reactive, ref } from "vue";

interface IToast {
  id: number,
  text: string
}

const DURATION = ref(2000)
const items: IToast[] = reactive([])

export default function useToast() {
  const toast = {
    success: (text: string, duration: number = 0) => {
      init(text, duration, 'success')
    },
    error: (text: string, duration: number = 0) => {
      init(text, duration, 'error')
    }
  }

  function init (text: string, duration: number, type: string) {
    const id = new Date()

    items.push({
      id,
      text: text,
      type
    })

    deleteFunction(id)

    if(duration) DURATION.value = duration
  }

  function deleteFunction (id: number) {
    setTimeout(() => {
      const index = items.findIndex(item => item.id === id)
      items.splice(index, 1)
    }, DURATION.value)
  }

  return {
    toast, items
  }
}