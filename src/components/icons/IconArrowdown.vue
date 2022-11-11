<script>
export default {
  props: {
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icons icon-arrowdown"
    viewBox="0 0 17 17"
    aria-labelledby="arrowdown"
  >
    <g :fill="iconColor">
      <path d="M5 7.5L10 12.5L15 7.5H5Z" />
    </g>
  </svg>
</template>