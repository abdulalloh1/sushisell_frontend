import AppToast from './AppToast.vue';
import type { Story } from '@storybook/vue3';
import { onMounted, ref } from "vue";
import useToast from "@/components/UI/AppToast/useToast";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'UI/AppToast',
  component: AppToast,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    modelValue: {
      description: 'Value',
      control: {
        type: 'boolean',
      },
    },
  },
};

const Template: Story = (args) => ({
  components: {AppToast},
  setup() {
    const modelValue = ref(args.modelValue);
    const { toast } = useToast()

    function addToast () {
      toast.success(`yehu ${new Date()}`)
    }

    onMounted(() => {
      toast.success('wow')
    })

    return {args, modelValue, addToast};
  },
  template: `
    Returned value: {{ modelValue }}  <br/><br/><br/><br/><br/>
    <button @click="addToast">click me</button>
    <app-toast v-model="modelValue"/>
  `
});

export const Default = Template.bind({});
Default.args = {
  modelValue: true
};