<template>
  <Container>
    <SectionTitle :title="t('pastEditions.title')" />

    <section class="editions">
      <div
        v-for="edition in editions"
        :key="edition.year"
        class="edition"
      >
        <h3>{{ edition.icon }} {{ t('pastEditions.tournament') }} {{ edition.year }}</h3>
        <p>{{ t('pastEditions.officialVideo', { year: edition.year }) }}</p>

        <div class="video-wrapper">
          <iframe
            :src="edition.videoUrl"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>

    <SponsorsCarousel />
  </Container>
</template>

<script setup>
import { useI18n } from '../i18n'
import Container from '../components/Container.vue'
import SectionTitle from '../components/SectionTitle.vue'
import SponsorsCarousel from '../components/SponsorsCarousel.vue'

const { t } = useI18n()

const editions = [
  { year: '2025', icon: '🏆', videoUrl: 'https://www.youtube.com/embed/7s0wM0hdBe0' },
  { year: '2024', icon: '🏆', videoUrl: 'https://www.youtube.com/embed/pi7Qe3jYM8E' },
  { year: '2023', icon: '🏐', videoUrl: 'https://www.youtube.com/embed/IfaDOmJXqdY' },
  { year: '2022', icon: '🎥', videoUrl: 'https://www.youtube.com/embed/Sm5rKjMIomA' },
  { year: '2019', icon: '🎥', videoUrl: 'https://www.youtube.com/embed/iKbM3Mav-ZI' },
  { year: '2018', icon: '🏐', videoUrl: 'https://www.youtube.com/embed/Fi-nkIoJhKo' },
]
</script>

<style scoped>
.editions {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* CADA EDIÇÃO */
.edition {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.edition h3 {
  margin: 0;
  color: var(--color-primary-dark);
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.edition p {
  margin: 0;
  max-width: 760px;
  color: var(--color-text);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.7;
}

/* VÍDEO RESPONSIVO */
.video-wrapper {
  position: relative;
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* IMAGENS */
.image {
  width: 100%;
  max-width: 700px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.image:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 28px rgba(13, 79, 153, 0.12);
}
</style>