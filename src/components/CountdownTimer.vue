<template>
  <section class="countdown-card">
    <div>
      <p class="eyebrow">{{ label }}</p>
      <h2>{{ title }}</h2>
    </div>

    <div class="countdown-grid">
      <div class="time-box">
        <strong>{{ timeLeft.days }}</strong>
        <span>{{ t('countdown.days') }}</span>
      </div>

      <div class="time-box">
        <strong>{{ timeLeft.hours }}</strong>
        <span>{{ t('countdown.hours') }}</span>
      </div>

      <div class="time-box">
        <strong>{{ timeLeft.minutes }}</strong>
        <span>{{ t('countdown.minutes') }}</span>
      </div>

      <div class="time-box">
        <strong>{{ timeLeft.seconds }}</strong>
        <span>{{ t('countdown.seconds') }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { useI18n } from '../i18n'

const { t } = useI18n()

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  targetDate: {
    type: String,
    required: true,
  },
})

const now = ref(new Date())

let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const timeLeft = computed(() => {
  const target = new Date(props.targetDate)
  const difference = target - now.value

  if (difference <= 0) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((difference / (1000 * 60)) % 60)
  const seconds = Math.floor((difference / 1000) % 60)

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
})
</script>

<style scoped>
.countdown-card {
  padding: 28px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
  color: var(--color-text-light);
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: var(--shadow-sm);
}

.eyebrow {
  margin: 0 0 6px 0;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.86;
}

h2 {
  margin: 0;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.time-box {
  min-width: 92px;
  padding: 16px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.14);
  text-align: center;
}

.time-box strong {
  display: block;
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
}

.time-box span {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
  opacity: 0.9;
}

@media (min-width: 768px) {
  .countdown-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .countdown-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>