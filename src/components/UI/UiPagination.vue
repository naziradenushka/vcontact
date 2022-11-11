<script setup>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import { watch, computed, ref } from 'vue';

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  perPages: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: [Number, String],
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const totalPages = ref(Math.ceil(props.total / props.perPages));
const minPage = ref(2);
const maxPage = ref(5);

watch(
  () => props.perPages,
  (newValue) => {
    totalPages.value = Math.ceil(props.total / newValue);
    if (totalPages.value < props.modelValue) emit('update:modelValue', totalPages.value);
  },
);
watch(
  () => props.total,
  (newValue) => {
    totalPages.value = Math.ceil(newValue / props.perPages);
  },
);

const totalCurrentPages = computed(() => {
  if (totalPages.value < 6) {
    minPage.value = 2;
    maxPage.value = totalPages.value - 1;
  } else {
    if (props.modelValue < 5) {
      minPage.value = 2;
      maxPage.value = 5;
    } else if (props.modelValue > totalPages.value - 4) {
      minPage.value = totalPages.value - 4;
      maxPage.value = totalPages.value - 1;
    } else if (props.modelValue > 4) {
      minPage.value = props.modelValue - 1;
      maxPage.value = props.modelValue + 1;
    }
  }
  return rangeNumbers(minPage.value, maxPage.value);
});

function rangeNumbers(min, max) {
  let list = [];
  for (let i = min; i <= max; i++) {
    list.push(i);
  }
  return list;
}
function prevPage() {
  emit('update:modelValue', props.modelValue - 1);
}
function nextPage() {
  emit('update:modelValue', props.modelValue + 1);
}
</script>

<template>
  <ul class="pagination__inner">
    <li class="pagination__prev">
      <a href="#" :class="{ disable: modelValue == 1 }" @click.prevent="prevPage()">
        <ui-icon icon="icon-arrow-left" />
      </a>
    </li>
    <li>
      <a href="#" :class="{ current: modelValue == 1 }" @click.prevent="$emit('update:modelValue', 1)"> 1 </a>
    </li>
    <li v-if="modelValue > 4 && totalPages > 5">
      <span>...</span>
    </li>
    <li v-for="i in totalCurrentPages" :key="i">
      <a :href="`?page=${i}`" :class="{ current: i == modelValue }" @click.prevent="$emit('update:modelValue', i)">
        {{ i }}
      </a>
    </li>
    <li v-if="modelValue < totalPages - 3">
      <span>...</span>
    </li>
    <li>
      <a
        href="#"
        :class="{ current: modelValue == totalPages }"
        @click.prevent="$emit('update:modelValue', totalPages)"
      >
        {{ totalPages }}
      </a>
    </li>
    <li class="pagination__next">
      <a href="#" :class="{ disable: modelValue == totalPages }" @click.prevent="nextPage()">
        <ui-icon icon="icon-arrow-right" />
      </a>
    </li>
  </ul>
</template>

<style lang="scss">
.pagination {
  @extend .df, .aic, .jcsb;
  margin: 0 -5px 0 0;
  &__wrapper {
    &-inner {
      padding: 20px 0;
      text-align: right;
      .dropdown {
        margin-bottom: 15px;
      }
    }
  }
  &__perpage {
    .dropdown__toggle {
      width: 90px;
    }
  }
  &__inner {
    display: flex;
    align-items: center;
    li {
      margin: 0 5px;
    }
    .current,
    .current:focus,
    a:hover {
      color: $brandColor;
      border-color: $brandColor;
      svg g {
        fill: $brandColor;
      }
    }
    a {
      @extend .df, .aic, .jcc;
      width: 40px;
      height: 40px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }
    .disable {
      pointer-events: none;
      opacity: 0.5;
      // display: none;
    }
  }
}
@media (max-width: 575px) {
  .pagination {
    &__inner {
      a {
        width: 28px;
        height: 28px;
        font-size: 14px;
      }
      li {
        margin: 0 3px;
      }
    }
  }
}
</style>
