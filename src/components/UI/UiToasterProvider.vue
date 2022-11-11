<script setup>
import { provide, ref } from 'vue';
import UiToaster from '@/components/UI/UiToaster.vue';

const toaster = ref(null);

function success(message) {
  toaster.value.success(message);
}
function error(message) {
  toaster.value.error(message);
}

provide('toaster', {
  success: success,
  error: error,
});
</script>

<template>
  <ui-toaster ref="toaster" />
  <slot />
</template>
