<script>
// нет смысла переписывать в <script setup> , потому что функцию focus потом не видит
import { computed, ref } from 'vue'
export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    multiline: {
      type: Boolean,
    },
    small: {
      type: Boolean,
    },
    rounded: {
      type: Boolean,
    },
    // eslint-disable-next-line vue/require-prop-types
    modelModifiers: {
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const input = ref(null)

    const isModelModifiersLazy = computed(() => {
      return props.modelModifiers.lazy ? 'change' : 'input'
    })

    const focus = () => {
      input.value.focus();
    }

    return {
      input,

      isModelModifiersLazy,
      focus,
    }
  }
};
</script>

<template>
  <div
    class="input-wrapper"
    :class="{
      'input-wrapper__icons input-wrapper__icon-left': $slots['left-icon'],
      'input-wrapper__icons input-wrapper__icon-right': $slots['right-icon'],
    }"
  >
    <div
      v-if="$slots['left-icon']"
      class="input-wrapper__icon"
    >
      <slot name="left-icon" />
    </div>

    <component
      :is="multiline ? 'textarea' : 'input'"
      ref="input"
      class="input"
      :class="{ 'input-wrapper_sm': small, 'input-wrapper_rounded': rounded }"
      v-bind="$attrs"
      :value="modelValue"
      @[isModelModifiersLazy]="$emit('update:modelValue', $event.target.value)"
    />

    <div
      v-if="$slots['right-icon']"
      class="input-wrapper__icon"
    >
      <slot name="right-icon" />
    </div>
  </div>
</template>

<style lang="scss">
.input-wrapper {
  position: relative;
  input, textarea {
    width: 100%;
    padding: 12px 16px;
    height: 52px;
    border-radius: 8px;
    border: 2px solid $brandColor;
    font-weight: 600;
    font-size: 20px;
    line-height: 1.2;
    transition: .2s;
    background-color: var(--white);
    outline: none;
    box-shadow: none;
    &.input-wrapper_rounded {
      border-radius: 26px;
    }
    &.input-wrapper_sm.input-wrapper_rounded {
      border-radius: 22px;
    }
    &.input-wrapper_sm {
      padding: 8px 16px;
      height: 44px;
      border-radius: 4px;
    }
  }
  textarea {
    width: 100%;
    min-height: 211px;
  }

  &__icon-left {
    input, textarea {
      padding-left: 50px;
    }
  }
  &__icon-right {
    input, textarea {
      padding-right: 50px;
    }
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
}
</style>
