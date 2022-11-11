<script>
export default {
  inheritAttrs: false,
};
</script>
<script setup>
defineProps({
  tag: {
    type: String,
    default: 'button',
  },
});
</script>

<template>
  <component
    :is="tag"
    v-bind="$attrs"
    class="btn"
    :class="{
      'btn__icons btn__icon-left': $slots['left-icon'],
      'btn__icons btn__icon-right': $slots['right-icon'],
    }"
  >
    <span v-if="$slots['left-icon']" class="btn__icon">
      <slot name="left-icon" />
    </span>
    <slot />
    <span v-if="$slots['right-icon']" class="btn__icon">
      <slot name="right-icon" />
    </span>
  </component>
</template>

<style lang="scss">
.btn {
  @extend .fsh;
  position: relative;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  color: inherit;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  text-align: center;
  &:focus {
    outline: none;
  }
  &__icon-left {
    padding-left: 50px;
  }
  &__icon-right {
    padding-right: 50px;
  }
  &__icon {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__icon:first-child {
    left: 16px;
  }
  &__icon:last-child {
    right: 16px;
  }
  &.btn-bg {
    color: $white;
    cursor: pointer;
    padding: 11px 14px;
    border-radius: 10px;
    background-color: $brandColor;
    border: 1px solid $brandColor;
    transition: all 0.2s;
    &:hover {
      background-color: transparent;
      color: $brandColor;
    }
    &.disabled {
      pointer-events: none;
      opacity: 0.7;
    }
  }
  &.btn-delete {
    &:hover {
      color: $error;
      g {
        color: $error;
      }
    }
  }
  &.btn-edit,
  &.btn-show {
    &:hover {
      color: $brandColor;
      g {
        fill: $brandColor
      }
    }
  }
  &.btn-close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 27px;
    height: 27px;
  }
}
</style>
