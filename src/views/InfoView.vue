<template>
  <Container>
    <SectionTitle :title="t('registrationInfo.title')" />

    <HeroSection />

    <section class="info-grid">
      <article class="info-card">
        <h3>{{ t('registrationInfo.mainDataTitle') }}</h3>
        <ul>
          <li><strong>{{ t('registrationInfo.locationLabel') }}</strong> {{ t('registrationInfo.locationValue') }}</li>
          <li><strong>{{ t('registrationInfo.datesLabel') }}</strong> {{ t('registrationInfo.datesValue') }}</li>
          <li><strong>{{ t('registrationInfo.startLabel') }}</strong> {{ t('registrationInfo.startValue') }}</li>
          <li><strong>{{ t('registrationInfo.categoriesLabel') }}</strong> {{ t('registrationInfo.categoriesValue') }}</li>
        </ul>
        <p class="note">{{ t('registrationInfo.sub16Note') }}</p>
      </article>

      <article class="info-card">
        <h3>{{ t('registrationInfo.priceTitle') }}</h3>

        <ul>
          <li><strong>{{ t('registrationInfo.priceBaseStrong') }}</strong> — {{ t('registrationInfo.priceBaseText') }}</li>
          <li><strong>{{ t('registrationInfo.priceSecondStrong') }}</strong> — {{ t('registrationInfo.priceSecondText') }}</li>
          <li><strong>{{ t('registrationInfo.priceDinnerAthleteStrong') }}</strong> — {{ t('registrationInfo.priceDinnerAthleteText') }}</li>
          <li><strong>{{ t('registrationInfo.priceDinnerGuestStrong') }}</strong> — {{ t('registrationInfo.priceDinnerGuestText') }}</li>
        </ul>

        <p class="note">
          {{ t('registrationInfo.dinnerNote') }}
        </p>
      </article>

      <article class="info-card">
        <h3>{{ t('registrationInfo.includesTitle') }}</h3>
        <ul>
          <li>{{ t('registrationInfo.includesShirt') }}</li>
          <li>{{ t('registrationInfo.includesWater') }}</li>
          <li>{{ t('registrationInfo.includesCampingDiscount') }}</li>
        </ul>
        <p class="note">{{ t('registrationInfo.campingDiscountNote') }}</p>
      </article>

      <article class="info-card">
        <h3>{{ t('registrationInfo.goalTitle') }}</h3>
        <p v-html="t('registrationInfo.goalText')"></p>
        <ul>
          <li>{{ t('registrationInfo.saturdayGames') }}</li>
          <li>{{ t('registrationInfo.sundayGames') }}</li>
        </ul>
      </article>

      <article class="info-card">
        <h3>{{ t('registrationInfo.accommodationTitle') }}</h3>
        <p v-html="t('registrationInfo.accommodationText')"></p>
        <p>
          {{ t('registrationInfo.accommodationNote') }}
        </p>
      </article>

      <article class="info-card">
        <h3>{{ t('registrationInfo.availableSlotsTitle') }}</h3>
        <ul>
          <li>{{ t('registrationInfo.slotsMale') }}</li>
          <li>{{ t('registrationInfo.slotsMixed') }}</li>
          <li>{{ t('registrationInfo.slotsFemale') }}</li>
          <li>{{ t('registrationInfo.slotsSub16') }}</li>
        </ul>
      </article>
    </section>

  </Container>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from '../i18n'
import Container from '../components/Container.vue'
import SectionTitle from '../components/SectionTitle.vue'
  import HeroSection from '../components/HeroSection.vue'

const { t } = useI18n()

const registrationUrl = 'https://forms.gle/QiTkWNkt2Tmcb3JD9'
const registrationOpenDate = new Date('2026-06-01T00:00:00+01:00')

const now = ref(new Date())
let timer = null

const remainingTime = computed(() => {
  const diff = registrationOpenDate.getTime() - now.value.getTime()

  if (diff <= 0) {
    return {
      isOpen: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  const totalSeconds = Math.floor(diff / 1000)

  return {
    isOpen: false,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
})

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer)
  }
})
</script>

<<style scoped>
.info-hero {
  padding: 56px 32px;
  border-radius: var(--radius-lg);
  background: linear-gradient(
    135deg,
    #0b4f99 0%,
    #0d6efd 60%,
    #1f7ae0 100%
  );
  color: white;
  box-shadow: var(--shadow-sm);
}

.info-hero h2 {
  margin: 0 0 12px;
  color: white;
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 800;
  line-height: 1.1;
}

.info-hero p {
  margin: 0 0 20px;
  max-width: 760px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
}

.info-hero span {
  display: inline-block;
  padding: 12px 18px;
  border-radius: 999px;
  background: white;
  color: #0b4f99;
  font-size: 14px;
  font-weight: 800;
  line-height: 1;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.info-card {
  padding: 24px;
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

.info-card h3 {
  margin: 0 0 14px;
  color: white;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.info-card p,
.info-card li {
  color: rgba(255, 255, 255, 0.92);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.7;
}

.info-card strong {
  color: white;
  font-weight: 800;
}

.info-card p {
  margin: 0 0 12px;
}

.info-card p:last-child {
  margin-bottom: 0;
}

.info-card ul {
  margin: 0;
  padding-left: 20px;
}

.info-card li {
  margin-bottom: 8px;
}

.info-card li::marker {
  color: white;
  font-weight: 800;
}

.note {
  margin-top: 12px !important;
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 14px !important;
  font-weight: 500;
}

.registration-status {
  padding: 32px;
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

.registration-status h3 {
  margin: 0 0 12px;
  color: white;
  font-size: clamp(24px, 3vw, 30px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.registration-status p {
  margin: 0 0 8px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
}

.registration-status strong {
  display: block;
  margin-bottom: 18px;
  color: white;
  font-weight: 800;
}

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(80px, 1fr));
  gap: 12px;
  max-width: 520px;
  margin-top: 18px;
}

.time-box {
  padding: 14px 12px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.16);
  text-align: center;
}

.time-box strong {
  display: block;
  margin: 0;
  color: white;
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
}

.time-box span {
  display: block;
  margin-top: 6px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  font-weight: 700;
}

.registration-button {
  display: inline-block;
  margin-top: 14px;
  padding: 13px 22px;
  border-radius: 999px;
  background: white;
  color: #0b4f99;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.registration-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
}

@media (min-width: 800px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .info-hero,
  .registration-status {
    padding: 24px 20px;
  }

  .countdown-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>