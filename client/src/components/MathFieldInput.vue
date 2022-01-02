<script>
import { VTextField } from "vuetify/lib";

export default {
  extends: VTextField,
  methods: {
    // Adapted from VTextField implementation
    genInput() {
      const listeners = Object.assign({}, this.listeners$);
      delete listeners.change;
      return [
        this.$createElement("math-field", {
          staticClass: "math-field-input text--primary",
          domProps: {
            value: this.lazyValue,
          },
          attrs: {
            ...this.$attrs,
            "read-only": this.isReadonly,
            disabled: this.isDisabled,
            id: this.computedId,
          },
          on: Object.assign(listeners, {
            focus: this.onFocus,
            keydown: this.onKeyDown,
            blur: this.onBlur,
            input: this.onInput,
          }),
          ref: "input",
        }),
      ];
    },
  },
};
</script>
<style>
.math-field-input {
  flex-grow: 1;
  align-self: center;
  outline: none !important;
}
</style>
