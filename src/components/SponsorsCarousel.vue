<template>
  <section class="sponsors-section">
    <h2>{{ t('sponsors.title') }}</h2>

    <div class="carousel">
      <div class="track">
        <a
          v-for="(sponsor, index) in repeatedSponsors"
          :key="`${sponsor.name}-${index}`"
          :href="sponsor.link"
          target="_blank"
          rel="noopener noreferrer"
          class="sponsor-item"
        >
          <img
            :src="sponsor.logo"
            :alt="sponsor.name"
            :style="{ transform: `scale(${sponsor.scale || 1})` }"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
  import { useI18n } from '../i18n'
import { sponsors } from '../data/sponsors'

const { t } = useI18n()

const repeatedSponsors = computed(() => [...sponsors, ...sponsors])
</script>

<style scoped>
.sponsors-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sponsors-section h2 {
  margin: 0;
  color: var(--color-primary-dark);
  font-size: 20px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* CAROUSEL */
.carousel {
  width: 100%;
  overflow: hidden;
  padding: 20px 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

/* TRACK */
.track {
  display: flex;
  align-items: center;
  gap: 70px;
  width: max-content;
  animation: scroll 30s linear infinite;
}

/* ITEM */
.sponsor-item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}

/* LOGOS */
.sponsor-item img {
  width: auto;
  max-width: 160px;
  height: 65px;
  object-fit: contain;
  transition:
    transform 0.2s ease,
    filter 0.2s ease;
}

.sponsor-item:hover img {
  transform: scale(1.08);
}

/* PAUSA */
.carousel:hover .track {
  animation-play-state: paused;
}

/* ANIMAÇÃO */
@keyframes scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

/* MOBILE */
@media (max-width: 768px) {
  .track {
    gap: 40px;
  }

  .sponsor-item {
    min-width: 96px;
  }

  .sponsor-item img {
    max-width: 120px;
    height: 45px;
  }
}
</style>