<template>
  <div
    class="modal-container"
    :class="{
      active: haveContent,
    }"
    v-show="haveContent"
  >
    <component
      class="m-auto"
      v-if="haveContent"
      :is="component"
      v-bind="props"
      v-click-outside="hideModal"
      @hide="hideModal"
      @submit="performSubmit"
    ></component>
  </div>
</template>

<script>
import { bus, event } from "./bus";

export default {
  data() {
    return {
      haveContent: false,
      component: undefined,
      props: undefined,
      submitCallback: undefined,
    };
  },
  methods: {
    showModal(e) {
      const { component, props, submit } = e;
      this.component = component;
      this.props = props;
      this.submitCallback = submit;
      this.haveContent = true;
    },
    hideModal() {
      this.haveContent = false;
      this.submitCallback = undefined;
      this.props = undefined;
      this.component = undefined;
    },
    performSubmit(e) {
      const cb = this.submitCallback;
      this.hideModal();
      cb(e);
    },
  },
  mounted() {
    bus.$on(event, this.showModal);
  },
  beforeDestroy() {
    bus.$off(event, this.showModal);
  },
};
</script>

<style lang="postcss" scoped>
.modal-container {
  @apply w-screen h-screen fixed flex z-50;
}

.modal-container.active {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
