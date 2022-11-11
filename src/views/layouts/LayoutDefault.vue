<script setup>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<template>
  <the-header />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <the-footer />
</template>

<style lang="scss">
.route-enter-from {
  opacity: 0;
  // transform: translateX(-100px);
  // transform: translateY(100px);
}
.route-enter-active {
  transition: all .3s ease-out;
}
.route-leave-to {
  opacity: 0;
  // transform: translateX(100px);
  // transform: translateY(-100px);
}
.route-leave-active {
  transition: all .3s ease-in;
}
</style>
