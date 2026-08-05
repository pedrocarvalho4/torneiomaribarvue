<template>
  <Container>
    <SectionTitle :title="t('scheduleResults.title')" />

    <section class="schedule-header">
      <h2>{{ t('testSchedule.title') }}</h2>
      <p>{{ t('testSchedule.description') }}</p>
    </section>

    <div class="actions">
      <button
        class="toggle-button"
        :class="{ active: activeSection === 'calendar' }"
        type="button"
        @click="activeSection = 'calendar'"
      >
        {{ t('testSchedule.calendars') }}
      </button>

      <button
        class="toggle-button"
        :class="{ active: activeSection === 'search' }"
        type="button"
        @click="activeSection = 'search'"
      >
        {{ t('testSchedule.search') }}
      </button>

      <button
        class="toggle-button"
        :class="{ active: activeSection === 'fields' }"
        type="button"
        @click="activeSection = 'fields'"
      >
        {{ t('testSchedule.gamesByField') }}
      </button>

      <button
        class="toggle-button"
        :class="{ active: activeSection === 'nextPending' }"
        type="button"
        @click="activeSection = 'nextPending'"
      >
        {{ t('testSchedule.nextPendingMatches') }}
      </button>
      <button
        class="toggle-button"
        :class="{ active: activeSection === 'rankings' }"
        type="button"
        @click="activeSection = 'rankings'"
      >
        {{ t('testSchedule.rankings') }}
      </button>
    </div>

    <section class="schedule-content">
      <ScheduleFullCalendarBoard
        v-if="activeSection === 'calendar'"
      />

      <ScheduleSearchBoard
        v-else-if="activeSection === 'search'"
      />

      <ScheduleFieldsBoard
        v-else-if="activeSection === 'fields'"
      />

      <ScheduleNextPendingMatchesBoard
        v-else-if="activeSection === 'nextPending'"
      />
      <ScheduleRankingsBoard
        v-else-if="activeSection === 'rankings'"
      />
    </section>

    <SponsorsCarousel />
  </Container>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../i18n'

import Container from '../components/Container.vue'
import SectionTitle from '../components/SectionTitle.vue'
import SponsorsCarousel from '../components/SponsorsCarousel.vue'

import ScheduleFullCalendarBoard from '../components/ScheduleFullCalendarBoard.vue'
import ScheduleSearchBoard from '../components/ScheduleSearchBoard.vue'
import ScheduleFieldsBoard from '../components/ScheduleFieldsBoard.vue'
import ScheduleNextPendingMatchesBoard from '../components/ScheduleNextPendingMatchesBoard.vue'
import ScheduleRankingsBoard from '../components/ScheduleRankingsBoard.vue'

const { t } = useI18n()

const activeSection = ref('calendar')
</script>

<style scoped>
.schedule-header {
  padding: 40px 32px;
  margin-bottom: 32px;
  border-radius: var(--radius-lg);
  background: linear-gradient(
    135deg,
    #0b4f99 0%,
    #0d6efd 60%,
    #1f7ae0 100%
  );
  color: white;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.schedule-header h2 {
  margin: 0 0 12px;
  color: white;
  font-size: clamp(26px, 3vw, 36px);
  font-weight: 800;
  line-height: 1.15;
}

.schedule-header p {
  max-width: 720px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.92);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.7;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
}

.toggle-button {
  padding: 12px 18px;
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
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.toggle-button:hover,
.toggle-button.active {
  border-color: #0b4f99;
  background: #0b4f99;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(13, 79, 153, 0.18);
}

.schedule-content {
  width: 100%;
  margin-bottom: 40px;
}

@media (max-width: 600px) {
  .schedule-header {
    padding: 36px 20px;
  }

  .actions {
    flex-direction: column;
  }

  .toggle-button {
    width: 100%;
  }
}
</style>