<template>
  <Container>
    <SectionTitle :title="t('about.title')" />

    <section class="about-layout">
      <article class="about-card">
        <h3>{{ t('about.tournamentTitle') }}</h3>
        <p>
          {{ t('about.tournamentText') }}
        </p>
      </article>

      <article class="about-card">
        <h3>{{ t('about.environmentTitle') }}</h3>
        <p>
          {{ t('about.environmentText') }}
        </p>
      </article>

      <article class="about-card">
        <h3>{{ t('about.goalTitle') }}</h3>
        <p>
          {{ t('about.goalText') }}
        </p>
      </article>
    </section>

    <InstagramFeed />
  </Container>
</template>

<script setup>
import { useI18n } from '../i18n'
import Container from '../components/Container.vue'
import SectionTitle from '../components/SectionTitle.vue'
import InstagramFeed from '../components/InstagramFeed.vue'

const { t } = useI18n()
</script>

<style scoped>
.about-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.about-card {
  padding: 28px;
  border: none;
  border-radius: var(--radius-lg);
  background: linear-gradient(
    135deg,
    #0b4f99 0%,
    #0d6efd 100%
  );
  color: white;
  box-shadow: var(--shadow-sm);
}

.about-card h3 {
  margin: 0 0 12px 0;
  font-size: 22px;
  font-weight: 800;
  color: white;
}

.about-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.7;
  font-weight: 500;
}

@media (min-width: 768px) {
  .about-layout {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>