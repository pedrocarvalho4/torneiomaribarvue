<template>
  <Container>
    <SectionTitle :title="t('gallery.title')" />

    <p class="intro">
      {{ t('gallery.intro') }}
    </p>

    <section class="gallery-grid">
      <figure class="gallery-item">
        <a href="https://photos.app.goo.gl/qyertcwkpV1SNkMs8" target="_blank">
          <img src="/images/fotos2025s.jpg" :alt="t('gallery.albums.photos2025Saturday')" />
        </a>
        <figcaption>{{ t('gallery.albums.label2025Saturday') }}</figcaption>
      </figure>

      <figure class="gallery-item">
        <a href="https://photos.app.goo.gl/EibMBwH2B16N9ghH7" target="_blank">
          <img src="/images/fotos2025d.jpg" :alt="t('gallery.albums.photos2025Sunday')" />
        </a>
        <figcaption>{{ t('gallery.albums.label2025Sunday') }}</figcaption>
      </figure>

      <figure class="gallery-item">
        <a href="https://photos.app.goo.gl/hp8fLvz1LyTehZ4a7" target="_blank">
          <img src="/images/fotos2024s.jpg" :alt="t('gallery.albums.photos2024Saturday')" />
        </a>
        <figcaption>{{ t('gallery.albums.label2024Saturday') }}</figcaption>
      </figure>

      <figure class="gallery-item">
        <a href="https://photos.app.goo.gl/NF27oLehUX7MmNJx8" target="_blank">
          <img src="/images/fotos2024d.jpg" :alt="t('gallery.albums.photos2024Sunday')" />
        </a>
        <figcaption>{{ t('gallery.albums.label2024Sunday') }}</figcaption>
      </figure>

      <figure class="gallery-item">
        <a href="https://photos.app.goo.gl/fEXzmdKYdp9gZvLf7" target="_blank">
          <img src="/images/fotos2022.jpg" :alt="t('gallery.albums.photos2022')" />
        </a>
        <figcaption>2022</figcaption>
      </figure>

      <figure class="gallery-item">
        <a href="https://photos.app.goo.gl/bPjnK9YMF6nGyUDg6" target="_blank">
          <img src="/images/fotos2023.jpg" :alt="t('gallery.albums.photos2023')" />
        </a>
        <figcaption>2023</figcaption>
      </figure>
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
.intro {
  margin: 0 0 24px 0;
  max-width: 760px;
  color: var(--color-text);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.7;
}

/* GRID */
.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

/* ITEM */
.gallery-item {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* IMAGEM */
.gallery-item img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

/* HOVER */
.gallery-item:hover img {
  transform: scale(1.03);
  box-shadow: 0 8px 28px rgba(13, 79, 153, 0.12);
}

/* TEXTO */
.gallery-item figcaption {
  color: var(--color-primary-dark);
  font-size: 14px;
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

/* RESPONSIVO */
@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>