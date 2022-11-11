<script setup>
defineProps({
  inline: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<template>
  <div class="form-item" :class="{ 'form-item_inline': inline }">
    <label v-if="!!label" class="form-item__label">{{ label }}</label>
    <slot />
  </div>
</template>

<style lang="scss">
.form-item {
  position: relative;
  margin-bottom: 24px;
  &_inline {
    display: inline-block;
    margin-bottom: 0;
    & + .form-item_inline {
      margin-left: 16px;
    }
  }
  &__label {
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 10px;
    display: block;
  }
}
</style>
