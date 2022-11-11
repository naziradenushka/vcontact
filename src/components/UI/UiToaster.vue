<script>
// нет смысла переписывать в <script setup> , потому что функции success и error потом не видит
import { ref } from 'vue'
export default {
  name: 'UiToaster',
  setup() {
    const toasts = ref([])

    const cancel = () => {
      toasts.value.splice(0, 1)
    }
    const success = (message) => {
      toasts.value.push({
        class: 'toast_success',
        msg: message,
      })
      setTimeout(() => {
        cancel()
      }, 2000)
    }
    const error = (message) => {
      toasts.value.push({
        class: 'toast_error',
        msg: message,
      })
      setTimeout(() => {
        cancel()
      }, 2000)
    }

    return {
      toasts,

      cancel,
      success,
      error
    }
  },
}
</script>

<template>
  <div class="toasts">
    <div
      v-for="(toast, index) in toasts"
      :key="index"
      class="toast"
      :class="toast.class"
    >
      <span>{{ toast.msg }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.toasts {
  position: fixed;
  top: 15px;
  left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-right: 15px;
  white-space: pre-wrap;
  z-index: 40;
  pointer-events: none;
}
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background: $white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  line-height: 1.1;
  width: auto;
}
.toast + .toast {
  margin-top: 10px;
}
.toast.toast_success {
  color: $brandColor;
}
.toast.toast_error {
  color: $error;
}
@media (max-width: 800px) {
  .toasts {
    left: 15px;
  }
}
</style>
