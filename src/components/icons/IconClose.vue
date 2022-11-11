<script>
export default {
  props: {
    iconColor: {
      type: String,
      default: 'currentColor',
    },
  },
};
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="icons icon-close" viewBox="0 0 30 30" aria-labelledby="close">
    <g :fill="iconColor">
      <path
        d="M7.57422 7.57617L22.4235 22.4254"
        stroke="#6D7A8F"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.57422 22.4238L22.4235 7.57459"
        stroke="#6D7A8F"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>