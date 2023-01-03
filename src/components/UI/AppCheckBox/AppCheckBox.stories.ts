import AppCheckBox from './AppCheckBox.vue';
import type { Story } from '@storybook/vue3';
import { ref } from 'vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'UI/AppCheckBox',
  component: AppCheckBox,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    modelValue: {
      type: Boolean
    }
  },
};

const Template: Story = (args) => ({
  components: {AppCheckBox},
  setup() {
    const modelValue = args.modelValue
    return {args, modelValue};
  },
  template: `
    Returned value: {{ modelValue }}
    <app-check-box
      v-model="modelValue"
      :disabled="args.disabled"
    >

    </app-check-box>
  `
});

export const Default = Template.bind({});
Default.args = {
  disabled: true,
  modelValue: true
};