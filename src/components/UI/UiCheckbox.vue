<script>
export default {
  inheritAttrs: false,
};
</script>
<script setup>
// template
/* <p>Checked: {{ checkedArray }} {{ value }}</p>
    <p><ui-checkbox v-model="value">Отметить</ui-checkbox></p>
    <p><ui-checkbox v-model="checkedArray" value="A">A</ui-checkbox></p>
    <p><ui-checkbox v-model="checkedArray" value="B">B</ui-checkbox></p> */
/* const checkedArray = ref([])
   const value = ref(true) */
import { useModelProxy } from '@/composables/useModelProxy.js'

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const modelValueProxy = useModelProxy(props, { emit }, 'modelValue')
</script>

<template>
  <label class="checkbox">
    <input v-model="modelValueProxy" v-bind="$attrs" type="checkbox" class="checkbox__input">
    <span class="checkbox__box" />
    <slot />
  </label>
</template>

<style lang="scss">
.checkbox {
  @extend .df;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-property: background-color, border-color;
  input.checkbox__input {
    position: absolute;
    z-index: -1;
    opacity: 0;
    padding: 0;
    &:checked ~ .checkbox__box::after {
        display: block;
    }
  }
  .checkbox__box {
    @extend .fsh;
    position: relative;
    display: block;
    border: 2px solid $brandColor;
    border-radius: 8px;
    height: 28px;
    width: 28px;
    margin-right: 10px;
    &::after {
      content: '';
      position: absolute;
      display: none;
      top: 50%;
      left: 50%;
      width: 14px;
      height: 13px;
      background-image: url('@/assets/images/icon-check.svg');
      border: none;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
