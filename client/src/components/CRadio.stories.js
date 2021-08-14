import CRadio from './CRadio.vue';
import CTextInput from './CTextInput.vue';

export default {
  title: "Radio"
}

export const text = () => ({
  components: { CRadio },
  data: () => ({
    selected: 1
  }),
  template: 
`
<div>
  <p>{{ selected }}</p>
  <c-radio name="radio" thisValue="1" v-model="selected">One</c-radio>
  <c-radio name="radio" thisValue="2" v-model="selected">Two</c-radio>
  <c-radio name="radio" thisValue="3" v-model="selected">Three<br>New Line<br>New Line</c-radio>
</div>
`
})

export const textInput = () => ({
  components: { CRadio, CTextInput },
  data: () => ({
    selected: 1
  }),
  template: 
`
<div>
  <p>{{ selected }}</p>
  <c-radio name="radio" thisValue="1" v-model="selected">
    <c-text-input></c-text-input>
  </c-radio>
  <c-radio name="radio" thisValue="2" v-model="selected">
    <c-text-input></c-text-input>
  </c-radio>
  <c-radio name="radio" thisValue="3" v-model="selected">
    <c-text-input></c-text-input>
  </c-radio>
</div>
`
})
