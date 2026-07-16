<template>
  <section class="registrations-board">
    <div class="registrations-header">
      <h2>{{ t('registrationsFromSheet.title') }}</h2>
      <p>{{ t('registrationsFromSheet.subtitle') }}</p>
    </div>

    <div v-if="loading" class="state-card">
      {{ t('registrationsFromSheet.loading') }}
    </div>

    <div v-else-if="error" class="state-card error">
      {{ t('registrationsFromSheet.loadError') }}
    </div>

    <template v-else>
      <section
        v-for="category in categories"
        :key="category.key"
        class="category-card"
      >
        <h3>{{ category.title }}</h3>

        <div class="progress-wrapper">
          <div class="progress-header">
            <span class="progress-label">Inscrições</span>
            <span class="progress-count">
              {{ category.teams.length }} / {{ category.max }}
            </span>
          </div>

          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: `${getProgress(category.teams.length, category.max)}%` }"
            ></div>
          </div>
        </div>

        <p v-if="!category.teams.length" class="empty-category">
          {{ t('registrationsFromSheet.emptyCategory') }}
        </p>

        <div v-else class="teams-list">
          <article
            v-for="(team, index) in category.teams"
            :key="`${team.athlete1}-${team.athlete2}-${index}`"
            class="team-row"
          >
            <span class="team-number">
              {{ String(index + 1).padStart(2, '0') }}
            </span>

            <span class="team-name">
              {{ team.athlete1 }} / {{ team.athlete2 }}
            </span>

            <span
              class="status"
              :class="team.verified ? 'verified' : 'pending'"
              :title="team.verified
                ? t('registrationsFromSheet.verified')
                : t('registrationsFromSheet.pending')"
            >
              {{ team.verified ? '✔️' : '⏳' }}
            </span>
          </article>
        </div>
      </section>
    </template>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const sheetID = '1DjbucAnoBFOPJvaRA75i3MWRbfhB8yW403OQgT2b5hw'
const gid = '1329029271'

const rows = ref([])
const loading = ref(false)
const error = ref(false)

function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function buildFullName(firstName, lastName) {
  return `${firstName || ''} ${lastName || ''}`.trim()
}

function normalizeRow(row) {
  return {
    type: row.c[1]?.v || '',
    athlete1: buildFullName(row.c[2]?.v, row.c[3]?.v),
    athlete2: buildFullName(row.c[4]?.v, row.c[5]?.v),
    verified: normalizeText(row.c[6]?.v) === 'x',
  }
}

async function loadRegistrations() {
  loading.value = true
  error.value = false

  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&gid=${gid}&_=${Date.now()}`
    const response = await fetch(url)
    const text = await response.text()

    const jsonText = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1)
    const json = JSON.parse(jsonText)

    rows.value = json.table.rows
      .map(normalizeRow)
      .filter((row) => row.athlete1 && row.athlete2)
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

function getProgress(current, max) {
  if (!max) return 0
  return Math.min((current / max) * 100, 100)
}

const masculino = computed(() =>
  rows.value.filter((row) => {
    const type = normalizeText(row.type)
    return type.includes('masculino') || type.includes('masculina')
  })
)

const feminino = computed(() =>
  rows.value.filter((row) => {
    const type = normalizeText(row.type)
    return type.includes('feminino') || type.includes('feminina')
  })
)

const misto = computed(() =>
  rows.value.filter((row) => {
    const type = normalizeText(row.type)
    return type.includes('misto') || type.includes('mista')
  })
)

const sub16 = computed(() =>
  rows.value.filter((row) => normalizeText(row.type).includes('sub'))
)

  const paiFilhoMini = computed(() =>
    rows.value.filter((row) => {
      const type = normalizeText(row.type)

      return (
        type.includes('pai-filho') ||
        type.includes('pai filho')
      )
    })
  )

const categories = computed(() => [
  {
    key: 'masculino',
    title: t('common.male'),
    teams: masculino.value,
    max: 64,
  },
  {
    key: 'misto',
    title: t('common.mixed'),
    teams: misto.value,
    max: 64,
  },
  {
    key: 'feminino',
    title: t('common.female'),
    teams: feminino.value,
    max: 32,
  },
  {
    key: 'sub16',
    title: t('common.sub16'),
    teams: sub16.value,
    max: 6,
  },
  {
    key: 'pai-filho-mini',
    title: 'Pai-Filho (Mini)',
    teams: paiFilhoMini.value,
    max: 6,
  },
])

onMounted(() => {
  loadRegistrations()
})
</script>

<style scoped>
.registrations-board {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 32px 0;
}

.registrations-header,
.category-card {
  padding: 28px;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
}

.category-card {
  border: 1px solid var(--color-border);
}

.registrations-header h2 {
  margin: 0 0 8px;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
}

.registrations-header p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 15px;
  font-weight: 500;
}

.category-card h3 {
  margin: 0 0 14px;
  color: var(--color-primary-dark);
  font-size: 22px;
  font-weight: 800;
}

.progress-wrapper {
  margin-bottom: 18px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.progress-label,
.progress-count {
  font-size: 14px;
  font-weight: 800;
}

.progress-label {
  color: var(--color-text-muted);
}

.progress-count {
  color: var(--color-primary-dark);
}

.progress-track {
  width: 100%;
  height: 12px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(11, 79, 153, 0.15);
}

.progress-fill {
  height: 100%;
  min-width: 4px;
  border-radius: inherit;
  background: linear-gradient(90deg, #0b4f99, #1d7ff2);
  transition: width 0.3s ease;
}

.empty-category {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 15px;
  font-weight: 600;
}

.teams-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.team-row {
  display: grid;
  grid-template-columns: 42px 1fr 36px;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-background);
}

.team-number {
  color: var(--color-primary-dark);
  font-size: 14px;
  font-weight: 800;
}

.team-name {
  color: var(--color-text);
  font-size: 15px;
  font-weight: 700;
}

.status {
  text-align: right;
  font-size: 20px;
  line-height: 1;
}

.state-card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  text-align: center;
  font-weight: 700;
}

.error {
  border-color: #f2b8b5;
  background: #fff5f5;
  color: #8a1c16;
}

@media (max-width: 600px) {
  .registrations-header,
  .category-card {
    padding: 22px;
  }

  .team-row {
    grid-template-columns: 38px 1fr 30px;
    gap: 10px;
  }

  .team-name {
    font-size: 14px;
  }
}
</style>