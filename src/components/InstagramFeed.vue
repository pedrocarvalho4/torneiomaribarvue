<template>
  <section class="instagram-feed">
    <h2>{{ t('instagramFeed.title') }}</h2>

    <div
      class="elfsight-app-59d00429-5777-4e44-b6b6-ac464b551d78"
      data-elfsight-app-lazy
    ></div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
  import { useI18n } from '../i18n'

const { t } = useI18n()

onMounted(() => {
  const scriptId = 'elfsight-platform-script'

  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://static.elfsight.com/platform/platform.js'
    script.async = true
    document.body.appendChild(script)
  }
})
</script>

<style scoped>
.instagram-feed {
  padding: 32px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: #ffffff;
}

.instagram-feed h2 {
  margin: 0 0 20px 0;
  color: var(--color-primary-dark);
  font-size: 24px;
}
</style>