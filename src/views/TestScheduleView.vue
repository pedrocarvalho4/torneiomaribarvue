<template>
  <Container>
    <SectionTitle :title="t('testSchedule.title')" />

    <div class="back-wrapper">
      <RouterLink class="back-link" to="/calendarios-resultados">
        ← {{ t('testSchedule.back') }}
      </RouterLink>
    </div>

    <section class="test-header">
      <h2>{{ t('testSchedule.title') }}</h2>
      <p>{{ t('testSchedule.description') }}</p>
    </section>

    <div class="actions">
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
        :class="{ active: activeSection === 'calendar' }"
        type="button"
        @click="activeSection = 'calendar'"
      >
        {{ t('testSchedule.calendars') }}
      </button>

      <button
        class="toggle-button"
        :class="{ active: activeSection === 'nextPending' }"
        type="button"
        @click="activeSection = 'nextPending'"
      >
        {{ t('testSchedule.nextPendingMatches') }}
      </button>
    </div>

    <ScheduleFullCalendarBoard v-if="activeSection === 'calendar'" />

    <ScheduleSearchBoard v-if="activeSection === 'search'" />

    <ScheduleFieldsBoard v-if="activeSection === 'fields'" />

    

    <ScheduleNextPendingMatchesBoard v-if="activeSection === 'nextPending'" />
  </Container>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../i18n'
import Container from '../components/Container.vue'
import SectionTitle from '../components/SectionTitle.vue'
import ScheduleSearchBoard from '../components/ScheduleSearchBoard.vue'
import ScheduleFieldsBoard from '../components/ScheduleFieldsBoard.vue'
import ScheduleFullCalendarBoard from '../components/ScheduleFullCalendarBoard.vue'
import ScheduleNextPendingMatchesBoard from '../components/ScheduleNextPendingMatchesBoard.vue'

const { t } = useI18n()

const activeSection = ref('calendar')
</script>

<style scoped>
.back-wrapper {
  margin-bottom: 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: var(--color-primary-dark);
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.test-header {
  padding: 40px 32px;
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
  margin-bottom: 32px;
}

.test-header h2 {
  margin: 0 0 12px;
  color: white;
  font-size: clamp(26px, 3vw, 36px);
  font-weight: 800;
  line-height: 1.15;
}

.test-header p {
  margin: 0 auto;
  max-width: 720px;
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
    box-shadow 0.2s ease;
}

.toggle-button:hover,
.toggle-button.active {
  background: #0b4f99;
  color: #ffffff;
  border-color: #0b4f99;
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(13, 79, 153, 0.18);
}

@media (max-width: 600px) {
  .test-header {
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