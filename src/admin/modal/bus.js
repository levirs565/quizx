import Vue from 'vue';

export const bus = new Vue();
export const event = 'modal';

export default function(component, props, submit) {
  bus.$emit(event, { component, props, submit });
}
