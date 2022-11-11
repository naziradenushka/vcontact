import { computed } from 'vue';

export function useNumberSpace(number) {
  const numberSpace = computed(() => {
    let isEmpty = !!number.value;
    if (number.value == 0) return 0;
    else if (!isEmpty) return '';
    return String(number.value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  });

  return {
    numberSpace
  }
}

// usage
/* import { useNumberSpace } from '@/composables/useNumberSpace.js'
const checkedArray = ref('12345678')
const { numberSpace } = useNumberSpace(checkedArray)
return {
  numberSpace
}; */
