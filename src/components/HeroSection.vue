<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const registrationUrl = 'https://forms.gle/QiTkWNkt2Tmcb3JD9'
const registrationOpenDate = new Date('2026-05-01T00:00:00+01:00')

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

<template>
  <section class="hero">
    <div class="hero-content">
      <p class="hero-eyebrow">{{ t('home.nextEditionText') }}</p>

      <h1 class="hero-title">{{ t('home.heroTitle') }}</h1>

      <p class="hero-subtitle">
        {{ t('home.heroSubtitle') }}
      </p>

      <div class="hero-actions">
        <a
          v-if="remainingTime.isOpen"
          class="registration-button"
          :href="registrationUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('home.registrationButton') }}
        </a>

        <div v-else class="countdown">
          <p class="countdown-title">{{ t('home.registrationCountdownTitle') }}</p>

          <div class="countdown-grid">
            <div class="time-box">
              <strong>{{ remainingTime.days }}</strong>
              <span>{{ t('home.countdownDays') }}</span>
            </div>

            <div class="time-box">
              <strong>{{ remainingTime.hours }}</strong>
              <span>{{ t('home.countdownHours') }}</span>
            </div>

            <div class="time-box">
              <strong>{{ remainingTime.minutes }}</strong>
              <span>{{ t('home.countdownMinutes') }}</span>
            </div>

            <div class="time-box">
              <strong>{{ remainingTime.seconds }}</strong>
              <span>{{ t('home.countdownSeconds') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 80px 24px;
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

.hero-content {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}

.hero-eyebrow {
  margin: 0 0 12px 0;
  color: white;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-title {
  margin: 0;
  color: white;
  font-size: 40px;
  font-weight: 800;
  line-height: 1.1;
}

.hero-subtitle {
  margin: 16px 0 0 0;
  color: white;
  font-size: 18px;
  line-height: 1.6;
}

.hero-actions {
  margin-top: 28px;
}

.registration-button {
  display: inline-block;
  padding: 13px 22px;
  border-radius: 999px;
  background-color: white;
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

.countdown {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.countdown-title {
  margin: 0;
  color: white;
  font-size: 15px;
  font-weight: 800;
}

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.time-box {
  min-width: 78px;
  padding: 12px 10px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.16);
  color: white;
  text-align: center;
}

.time-box strong {
  display: block;
  color: white;
  font-size: 24px;
  font-weight: 800;
  line-height: 1;
}

.time-box span {
  display: block;
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .hero {
    padding: 56px 20px;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .countdown-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .time-box {
    min-width: 90px;
  }
}
</style>