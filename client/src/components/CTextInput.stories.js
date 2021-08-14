import CTextInput from './CTextInput.vue';

export default {
  title: "Text Input"
}

export const singleLine = () => ({
  components: {
    CTextInput
  },
  data: () => ({
    text: "Single Line Text Input"
  }),
  template: `
  <div>
    <p>{{ text }}<p>
    <c-text-input v-model="text"></c-text-input>
  </div>`
})


export const multiLine = () => ({
  components: {
    CTextInput
  },
  data: () => ({
    text: "Multi Line Text Input"
  }),
  template: `
  <div>
    <p>{{ text }}<p>
    <c-text-input :multiLine="true" v-model="text"></c-text-input>
  </div>`
})
