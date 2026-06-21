<template>
  <section class="schedule-board">
    <div class="schedule-header">
      <h2>{{ t('scheduleFullCalendar.title') }}</h2>
      <p>{{ t('scheduleFullCalendar.description') }}</p>
    </div>

    <div class="calendar-tabs">
      <button
        v-for="category in calendarCategories"
        :key="category.id"
        class="calendar-category-button"
        :class="{ active: selectedCategoryId === category.id }"
        type="button"
        @click="selectedCategoryId = category.id"
      >
        {{ category.label }}
      </button>
    </div>

    <div v-if="selectedCategory" class="calendar-frame-wrapper">
      <div class="calendar-frame-header">
        <h3>{{ selectedCategory.label }}</h3>
      </div>

      <iframe
        :title="`${t('scheduleFullCalendar.frameTitle')} ${selectedCategory.label}`"
        :src="selectedCategory.url"
        class="calendar-frame"
        loading="lazy"
      />
    </div>

    <div v-else class="state-card">
      {{ t('scheduleFullCalendar.empty') }}
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const calendarCategories = computed(() => [
  {
    id: 'sub16',
    label: t('scheduleFullCalendar.categories.sub16'),
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt60NOmuEHBMR0dMMSe6N7U7bmFkvBPJ_UX1k7rAVTPqUoWnB7-wEKPtHl74Owm-zexTk5KepTTs0/pubhtml?gid=1946814567&single=true',
  },
  {
    id: 'first-phase-mixed',
    label: t('scheduleFullCalendar.categories.firstPhaseMixed'),
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt60NOmuEHBMR0dMMSe6N7U7bmFkvBPJ_UX1k7rAVTPqUoWnB7-wEKPtHl74Owm-zexTk5KepTTs0/pubhtml?gid=1057529267&single=true',
  },
  {
    id: 'first-phase-male',
    label: t('scheduleFullCalendar.categories.firstPhaseMale'),
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt60NOmuEHBMR0dMMSe6N7U7bmFkvBPJ_UX1k7rAVTPqUoWnB7-wEKPtHl74Owm-zexTk5KepTTs0/pubhtml?gid=2067354137&single=true',
  },
  {
    id: 'first-phase-female',
    label: t('scheduleFullCalendar.categories.firstPhaseFemale'),
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt60NOmuEHBMR0dMMSe6N7U7bmFkvBPJ_UX1k7rAVTPqUoWnB7-wEKPtHl74Owm-zexTk5KepTTs0/pubhtml?gid=381487257&single=true',
  },
  {
    id: 'second-phase-mixed',
    label: t('scheduleFullCalendar.categories.secondPhaseMixed'),
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt60NOmuEHBMR0dMMSe6N7U7bmFkvBPJ_UX1k7rAVTPqUoWnB7-wEKPtHl74Owm-zexTk5KepTTs0/pubhtml?gid=109933911&single=true',
  },
  {
    id: 'second-phase-male',
    label: t('scheduleFullCalendar.categories.secondPhaseMale'),
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt60NOmuEHBMR0dMMSe6N7U7bmFkvBPJ_UX1k7rAVTPqUoWnB7-wEKPtHl74Owm-zexTk5KepTTs0/pubhtml?gid=1992541591&single=true',
  },
  {
    id: 'second-phase-female',
    label: t('scheduleFullCalendar.categories.secondPhaseFemale'),
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt60NOmuEHBMR0dMMSe6N7U7bmFkvBPJ_UX1k7rAVTPqUoWnB7-wEKPtHl74Owm-zexTk5KepTTs0/pubhtml?gid=108382013&single=true',
  },
  {
    id: 'cup-mixed',
    label: t('scheduleFullCalendar.categories.cupMixed'),
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt60NOmuEHBMR0dMMSe6N7U7bmFkvBPJ_UX1k7rAVTPqUoWnB7-wEKPtHl74Owm-zexTk5KepTTs0/pubhtml?gid=1652358830&single=true',
  },
  {
    id: 'cup-male',
    label: t('scheduleFullCalendar.categories.cupMale'),
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt60NOmuEHBMR0dMMSe6N7U7bmFkvBPJ_UX1k7rAVTPqUoWnB7-wEKPtHl74Owm-zexTk5KepTTs0/pubhtml?gid=1027930941&single=true',
  },
  {
    id: 'cup-female',
    label: t('scheduleFullCalendar.categories.cupFemale'),
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt60NOmuEHBMR0dMMSe6N7U7bmFkvBPJ_UX1k7rAVTPqUoWnB7-wEKPtHl74Owm-zexTk5KepTTs0/pubhtml?gid=299876945&single=true',
  },
])

const selectedCategoryId = ref(calendarCategories.value[0]?.id || '')

const selectedCategory = computed(() =>
  calendarCategories.value.find((category) => category.id === selectedCategoryId.value)
)
</script>

<style scoped>
.schedule-board {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.schedule-header {
  padding: 28px;
  border-radius: var(--radius-lg);
  background: linear-gradient(
    135deg,
    var(--color-primary-dark) 0%,
    var(--color-primary) 100%
  );
  color: var(--color-text-light);
  box-shadow: var(--shadow-sm);
}

.schedule-header h2 {
  margin: 0 0 8px;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.schedule-header p {
  margin: 0;
  max-width: 760px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
}

.calendar-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.calendar-category-button {
  padding: 12px 16px;
  border: 1px solid var(--color-primary-dark);
  border-radius: 999px;
  background: white;
  color: var(--color-primary-dark);
  font-size: 14px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

  .calendar-category-button:hover,
  .calendar-category-button.active {
    background: #0b4f99;
    color: #ffffff;
    border-color: #0b4f99;
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(13, 79, 153, 0.18);
  }

.calendar-frame-wrapper {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.calendar-frame-header {
  padding: 18px 22px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background);
}

.calendar-frame-header h3 {
  margin: 0;
  color: var(--color-primary-dark);
  font-size: 20px;
  font-weight: 800;
  line-height: 1.2;
}

.calendar-frame {
  display: block;
  width: 100%;
  min-height: 720px;
  border: 0;
  background: white;
}

.state-card {
  padding: 32px 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text);
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}

@media (max-width: 600px) {
  .calendar-tabs {
    flex-direction: column;
  }

  .calendar-category-button {
    width: 100%;
  }

  .calendar-frame {
    min-height: 620px;
  }
}
</style>