<script setup>
</script>

<template>
  <header class="header">
    <div class="container">
      <router-link :to="{name: 'home'}" class="link-brand"> VCONTACT </router-link>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  background-color: $brandColor;
  color: $white;
  padding: 15px 0;
  text-align: center;
  font-weight: 700;
}
</style>