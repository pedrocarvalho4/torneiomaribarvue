<script setup>
import { useI18n } from '../i18n'
import Container from '../components/Container.vue'
import HeroSection from '../components/HeroSection.vue'
import SponsorsCarousel from '../components/SponsorsCarousel.vue'

const { t } = useI18n()
</script>

<template>
  <Container>
    <HeroSection />

    <section class="home-grid">
      <article class="info-card">
        <h2>{{ t('home.nextEditionTitle') }}</h2>
        <p>{{ t('home.nextEditionText') }}</p>
      </article>

      <article class="info-card">
        <h2>{{ t('home.categoriesTitle') }}</h2>
        <p>{{ t('home.categoriesText') }}</p>
      </article>

      <article class="info-card">
        <h2>{{ t('home.consultTournamentTitle') }}</h2>
        <p>{{ t('home.consultTournamentText') }}</p>
      </article>
    </section>

    <SponsorsCarousel />
  </Container>
</template>

<style scoped>
.home-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.info-card {
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

.info-card h2 {
  margin: 0 0 12px 0;
  color: white;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
}

.info-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.92);
  font-weight: 500;
  line-height: 1.7;
}

@media (min-width: 768px) {
  .home-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>