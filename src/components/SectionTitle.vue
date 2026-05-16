<template>
  <div class="section-title">
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  title: String,
})
</script>

<style scoped>
.section-title {
  margin-bottom: 6px;
}

.section-title h2 {
  margin: 0;
  color: var(--color-primary-dark);
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
}
</style>