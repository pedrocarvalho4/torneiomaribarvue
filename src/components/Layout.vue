<template>
  <div class="layout">
    <SiteHeader />

    <main class="page-content">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-background);
}

.page-content {
  flex: 1;
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 28px 16px 48px;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .page-content {
    padding: 36px 20px 64px;
  }
}
</style>