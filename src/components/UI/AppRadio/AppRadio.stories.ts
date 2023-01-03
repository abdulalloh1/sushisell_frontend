import AppRadio from './AppRadio.vue';
import type { Story } from '@storybook/vue3';
import { ref } from 'vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'UI/AppRadio',
  component: AppRadio,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    modelValue: {
      type: Boolean
    }
  },
};

const Template: Story = (args) => ({
  components: {AppRadio},
  setup() {
    const modelValue = args.modelValue
    return {args, modelValue};
  },
  template: `
    Returned value: {{ modelValue }}
    <app-radio
      v-model="modelValue"
      :disabled="args.disabled"
    >

    </app-radio>
  `
});

export const Default = Template.bind({});
Default.args = {
  disabled: true,
  modelValue: true
};