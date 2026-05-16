<template>
  <div class="card">
    <h3 class="year">{{ year }}</h3>
    <p class="description">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  year: String,
  description: String,
})
</script>

<style scoped>
.card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(13, 110, 253, 0.22);
  box-shadow: 0 8px 28px rgba(13, 79, 153, 0.08);
}

.year {
  margin: 0 0 10px 0;
  color: var(--color-primary-dark);
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.description {
  margin: 0;
  color: var(--color-text);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.7;
}
</style>