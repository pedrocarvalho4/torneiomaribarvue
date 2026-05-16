<template>
  <section class="container">
    <slot />
  </section>
</template>

<script setup>
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}
</style>