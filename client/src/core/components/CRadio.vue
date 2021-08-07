<template>
  <label class="radio">
    <span class="radio-button">
      <input 
        type="radio" 
        :value="thisValue" 
        @change="$emit('input', thisValue)" 
        :checked="thisValue == value" 
        :name="name">
      <span></span>
    </span>
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: ["name", "thisValue", "value"]
}
</script>

<style>
.radio-button {
  @apply inline-block w-12 h-12;
}

.radio-button > input {
  @apply hidden;
}

.radio-button > span {
  @apply inline-block w-12 h-12 relative rounded-full;
  @apply hover:bg-gray-100;
}

.radio-button > span:active {
  @apply bg-gray-200;
}

.radio-button > input:checked + span {
  @apply hover:bg-green-100;
}


.radio-button > input:checked + span:active {
  @apply bg-green-200;
}

.radio-button > input:checked + span {
  @apply text-green-500;
}

.radio-button > input:checked + span::after {
  @apply bg-current; 
}

.radio-button > span::before, .radio-button > span::after {
  @apply inline-block rounded-full absolute;
  content: '';
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.radio-button > span::before {
  @apply w-5 h-5 border-2 border-current;
}

.radio-button > span::after {
  @apply w-3 h-3 bg-transparent;
}

.radio {
  @apply flex flex-row items-center font-roboto text-body1;
}

.radio > .radio-button {
  @apply mr-2 self-start;
}
</style>
