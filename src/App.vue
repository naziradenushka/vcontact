<script setup>
// import { getItem } from '@/helpers/persistanceStorage';
import UiToasterProvider from '@/components/UI/UiToasterProvider.vue';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layout = computed(() => {
  let layout = route.meta.layout;
  // let isAuth = !!getItem('accessToken');
  // if (isAuth) {
  return layout || 'layout-default';
  // } else {
  //   return 'layout-auth';
  // }
});

const footerBottom = () => {
  document.querySelector('main').removeAttribute('style');
  var header = document.querySelector('header').clientHeight;
  var footer = document.querySelector('footer').clientHeight;
  var main = document.querySelector('main').scrollHeight;
  var window_height = window.innerHeight;
  if (header + footer + main < window_height) {
    document.querySelector('main').style.height = window_height - (header + footer) + 'px';
  } else {
    document.querySelector('main').removeAttribute('style');
  }
};
const windowResize = () => {
  window.onresize = () => {
    setTimeout(footerBottom, 600);
  };
};
const footerPosition = () => {
  footerBottom();
  setTimeout(footerBottom, 600);
  windowResize();
};

onMounted(() => {
  footerPosition();
});

// пользовательская директива
// const vFocus = {
//   mounted: (el) => el.focus()
// }
</script>

<template>
  <ui-toaster-provider>
    <component :is="layout" />
  </ui-toaster-provider>
</template>
