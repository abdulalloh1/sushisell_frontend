import AppInput from './AppInput.vue';
import type { Story } from '@storybook/vue3';
import { ref } from 'vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'UI/AppInput',
  component: AppInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    label: {
      description: 'Label of Input',
      control: {
        type: 'text',
      },
      table: {
        category: 'Slots',
        type: {
          summary: 'html',
        },
      }
    },
    modelValue: {
      description: 'Value',
      control: {
        type: 'text',
      },
    },

  },
};

const Template: Story = (args) => ({
  components: {AppInput},
  setup() {
    const modelValue = ref(args.modelValue);

    return {args, modelValue};
  },
  template: `
    Returned value: {{ modelValue }}  <br/><br/><br/><br/><br/>
    <app-input 
        v-model="modelValue"
        :placeholder="args.placeholder"
        :isError="args.isError"
        :error-text="args.errorText"
    >
      <template #label>{{ args.label }}</template>
    </app-input>
  `
});

export const Default = Template.bind({});
Default.args = {
  label: 'Amount',
  modelValue: '1000000',
  placeholder: 'woow'
};