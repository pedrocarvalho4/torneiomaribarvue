<template>
  <Container>
    <SectionTitle :title="t('scheduleResults.title')" />

    <section class="empty-state">
      <h2>{{ t('scheduleResults.emptyTitle') }}</h2>
      <p>
        {{ t('scheduleResults.emptyText') }}
        {{ t('scheduleResults.registrationsInfo') }}
      </p>
    </section>

    <RegistrationsFromSheet v-if="registrationsOpen" />

    <SponsorsCarousel />

    <div class="accordion">
      <button class="accordion-header" type="button" @click="isOpen = !isOpen">
        <span>
          {{ isOpen ? t('scheduleResults.testOpen') : '+' }}
        </span>
      </button>

      <div v-if="isOpen" class="accordion-content">
        <div class="actions">
          <button
            class="toggle-button"
            :class="{ active: activeSection === 'matches' }"
            @click="toggleSection('matches')"
          >
            {{ t('scheduleResults.upcomingMatches') }}
          </button>

          <button
            class="toggle-button"
            :class="{ active: activeSection === 'results' }"
            @click="toggleSection('results')"
          >
            {{ t('scheduleResults.finalResults2025') }}
          </button>

          <button
            class="toggle-button"
            :class="{ active: activeSection === 'fullSchedule' }"
            @click="toggleSection('fullSchedule')"
          >
            {{ t('scheduleResults.fullSchedule') }}
          </button>
        </div>
      </div>
    </div>

    <UpcomingMatchesTable v-if="activeSection === 'matches'" />

    <FinalResultsBoard
      v-if="activeSection === 'results'"
      :competitions="finalResults2025"
    />

    <FilteredScheduleBoard v-if="activeSection === 'fullSchedule'" />
  </Container>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../i18n'
import Container from '../components/Container.vue'
import SectionTitle from '../components/SectionTitle.vue'
import SponsorsCarousel from '../components/SponsorsCarousel.vue'
import UpcomingMatchesTable from '../components/UpcomingMatchesTable.vue'
import FinalResultsBoard from '../components/FinalResultsBoard.vue'
import FilteredScheduleBoard from '../components/FilteredScheduleBoard.vue'
import RegistrationsFromSheet from '../components/RegistrationsFromSheet.vue'
import { finalResults2025 } from '../data/finalResults2025'

const { t } = useI18n()

const registrationsOpen = true
const isOpen = ref(false)
const activeSection = ref(null)

function toggleSection(section) {
  activeSection.value = activeSection.value === section ? null : section
}
</script>

<style scoped>
.empty-state {
  padding: 56px 32px;
  border: none;
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

.empty-state h2 {
  margin: 0 0 16px;
  color: white;
  font-size: clamp(26px, 3vw, 36px);
  font-weight: 800;
  line-height: 1.15;
}

.empty-state p {
  margin: 0 auto;
  max-width: 720px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.7;
}

.accordion {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.accordion-header {
  padding: 10px 16px;
  border: 1px solid var(--color-primary-dark);
  border-radius: 999px;
  background: white;
  color: var(--color-primary-dark);
  font-size: 14px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.accordion-header:hover {
  background: var(--color-primary-dark);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(13, 79, 153, 0.18);
}

.accordion-content {
  width: 100%;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
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
  background: var(--color-primary-dark);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(13, 79, 153, 0.18);
}

@media (max-width: 600px) {
  .empty-state {
    padding: 36px 20px;
  }

  .actions {
    flex-direction: column;
  }

  .toggle-button,
  .accordion-header {
    width: 100%;
  }
}
</style>