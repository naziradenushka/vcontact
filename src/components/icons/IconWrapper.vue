<script>
import IconArrow from '@/components/icons/IconArrow.vue';
import IconArrowdown from '@/components/icons/IconArrowdown.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconArrowLeftDouble from '@/components/icons/IconArrowLeftDouble.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import IconArrowRightDouble from '@/components/icons/IconArrowRightDouble.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconChecklist from '@/components/icons/IconChecklist.vue';
const icons = {
  'icon-arrow': IconArrow,
  'icon-arrow-down': IconArrowdown,
  'icon-arrow-left': IconArrowLeft,
  'icon-arrow-left-double': IconArrowLeftDouble,
  'icon-arrow-right': IconArrowRight,
  'icon-arrow-right-double': IconArrowRightDouble,
  'icon-close': IconClose,
  'icon-delete': IconDelete,
  'icon-edit': IconEdit,
  'icon-check': IconChecklist,
};
</script>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  icon: {
    type: String,
    required: true,
    validate: (name) => Object.keys(icons).includes(name),
  },
  color: {
    type: String,
    default: '#000',
  },
});

const iconSrc = computed(() => {
  return icons[props.icon];
})
</script>

<template>
  <component :is="iconSrc" :icon-color="color" />
</template>

<style lang="scss">
.icons {
  width: 20px;
  height: 20px;
}
</style>
