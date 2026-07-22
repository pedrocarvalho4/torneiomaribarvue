<template>
  <section class="schedule-board">
    <div class="schedule-header">
      <h2>{{ t('scheduleSearch.title') }}</h2>
      <p>{{ t('scheduleSearch.subtitle') }}</p>
    </div>

    <section class="filters-card">
      <h3>{{ t('scheduleSearch.filtersTitle') }}</h3>

      <div class="filters-grid">
        <label>
          {{ t('scheduleSearch.type') }}
          <select v-model="typeFilter">
            <option value="">{{ t('scheduleSearch.all') }}</option>
            <option value="MAS">{{ t('scheduleSearch.male') }}</option>
            <option value="FEM">{{ t('scheduleSearch.female') }}</option>
            <option value="MIX">{{ t('scheduleSearch.mixed') }}</option>
            <option value="JSub16">{{ t('scheduleSearch.sub16') }}</option>
            <option value="JPF">{{ t('scheduleSearch.parentChildMini') }}</option>
          </select>
        </label>

        <label>
          {{ t('scheduleSearch.teamContains') }}
          <input
            v-model="teamFilter"
            type="text"
            :placeholder="t('scheduleSearch.teamPlaceholder')"
          />
        </label>

        <label class="checkbox-label">
          <input v-model="onlyPending" type="checkbox" />
          {{ t('scheduleSearch.onlyPending') }}
        </label>
      </div>
    </section>

    <div v-if="loading" class="state-card">
      {{ t('scheduleSearch.loading') }}
    </div>

    <div v-else-if="error" class="state-card error">
      {{ t('scheduleSearch.loadError') }}
    </div>

    <template v-else>
      <p v-if="filteredMatches.length > resultLimit" class="warning">
        {{
          t('scheduleSearch.resultLimitWarning', {
            count: filteredMatches.length,
            limit: resultLimit,
          })
        }}
      </p>

      <div v-if="limitedFilteredMatches.length" class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>{{ t('scheduleSearch.table.matchNumber') }}</th>
              <th>{{ t('scheduleSearch.table.day') }}</th>
              <th>{{ t('scheduleSearch.table.time') }}</th>
              <th>{{ t('scheduleSearch.table.field') }}</th>
              <th>{{ t('scheduleSearch.table.teamA') }}</th>
              <th></th>
              <th>X</th>
              <th></th>
              <th>{{ t('scheduleSearch.table.teamB') }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="match in limitedFilteredMatches" :key="match.key">
              <td>{{ match.number }}</td>
              <td>{{ match.day }}</td>
              <td>{{ match.time }}</td>
              <td>{{ match.field }}</td>
              <td>{{ match.teamA }}</td>
              <td>{{ match.resultA }}</td>
              <td>X</td>
              <td>{{ match.resultB }}</td>
              <td>{{ match.teamB }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="state-card">
        {{ t('scheduleSearch.empty') }}
      </div>
    </template>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const sheetID = '1kfgRR4FLQLwYU7rOFgX_GMCch5YNbtAgQ9rP-GMvJpY'

const fields = [
  { name: 'Campo 1', gid: '650587454' },
  { name: 'Campo 2', gid: '1262682405' },
  { name: 'Campo 3', gid: '904494172' },
  { name: 'Campo 4', gid: '905396585' },
  { name: 'Campo 5', gid: '1492041148' },
  { name: 'Campo 6', gid: '97577329' },
  { name: 'Campo 7', gid: '1900519433' },
  { name: 'Campo 8', gid: '893152317' },
  { name: 'Campo 9', gid: '736332025' },
  { name: 'Campo 10', gid: '1021276879' },
  { name: 'Campo 11', gid: '2021499087' },
  { name: 'Campo 12', gid: '932659387' },
  { name: 'Campo 13', gid: '2097218917' },
  { name: 'Campo 14', gid: '739111083' },
  { name: 'Campo 15', gid: '1891098394' },
  { name: 'Campo 16', gid: '457615366' },
  { name: 'Campo 17', gid: '326434782' },
  { name: 'Campo 18', gid: '1359512400' },
  { name: 'Campo 19', gid: '1668490881' },
  { name: 'Campo 20', gid: '757667119' },
]

const rows = ref([])
const loading = ref(false)
const error = ref(false)

const typeFilter = ref('')
const teamFilter = ref('')
const onlyPending = ref(true)

const resultLimit = 20

function formatTime(cell) {
  if (!cell?.v) return ''

  const match = /Date\((\d+),(\d+),(\d+),(\d+),(\d+)/.exec(cell.v)
  if (!match) return cell.v

  return `${String(match[4]).padStart(2, '0')}:${String(match[5]).padStart(2, '0')}`
}

function normalizeRow(row, field) {
  return {
    key: `${row.c[0]?.v || ''}-${field}-${row.c[2]?.v || ''}`,
    number: row.c[0]?.v || '',
    day: row.c[1]?.v || '',
    time: formatTime(row.c[2]),
    field,
    teamA: row.c[4]?.v || '',
    resultA: row.c[5]?.v?.toString().trim() || '',
    resultB: row.c[7]?.v?.toString().trim() || '',
    teamB: row.c[8]?.v || '',
  }
}

async function fetchField(field) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&gid=${field.gid}&_=${Date.now()}`
  const response = await fetch(url)
  const text = await response.text()
  const json = JSON.parse(text.substring(47).slice(0, -2))

  return json.table.rows.map((row) => normalizeRow(row, field.name))
}

async function loadSchedule() {
  loading.value = true
  error.value = false

  try {
    const results = await Promise.allSettled(fields.map((field) => fetchField(field)))

    rows.value = results
      .filter((result) => result.status === 'fulfilled')
      .flatMap((result) => result.value)
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

function sortMatches(a, b) {
  const dayA = Number(a.day) || 0
  const dayB = Number(b.day) || 0

  if (dayA !== dayB) return dayA - dayB

  const [hourA = 0, minuteA = 0] = a.time.split(':').map(Number)
  const [hourB = 0, minuteB = 0] = b.time.split(':').map(Number)

  if (hourA !== hourB) return hourA - hourB
  if (minuteA !== minuteB) return minuteA - minuteB

  const fieldA = Number(a.field.replace(/\D/g, '')) || 0
  const fieldB = Number(b.field.replace(/\D/g, '')) || 0

  return fieldA - fieldB
}

const allMatches = computed(() => rows.value.slice().sort(sortMatches))

const filteredMatches = computed(() => {
  const selectedType = typeFilter.value.trim().toUpperCase()
  const selectedTeam = teamFilter.value.trim().toLowerCase()

  return allMatches.value.filter((match) => {
    const matchesType =
      !selectedType || match.number.toUpperCase().includes(selectedType)

    const matchesTeam =
      !selectedTeam ||
      match.teamA.toLowerCase().includes(selectedTeam) ||
      match.teamB.toLowerCase().includes(selectedTeam)

    const matchesPending =
      !onlyPending.value || (!match.resultA && !match.resultB)

    return matchesType && matchesTeam && matchesPending
  })
})

const limitedFilteredMatches = computed(() =>
  filteredMatches.value.slice(0, resultLimit)
)

onMounted(() => {
  loadSchedule()
})
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

.filters-card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.filters-card h3 {
  margin: 0 0 16px;
  color: var(--color-primary-dark);
  font-size: 20px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.filters-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--color-primary-dark);
  font-size: 14px;
  font-weight: 800;
  line-height: 1.2;
}

.checkbox-label {
  flex-direction: row;
  align-items: center;
  color: var(--color-text);
}

select,
input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 14px;
  font-weight: 500;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

select:focus,
input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.12);
}

.warning {
  margin: 0;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: #fff8e1;
  color: #6b4e00;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.5;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

table {
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 14px;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1.4;
}

th {
  background: var(--color-background);
  color: var(--color-primary-dark);
  font-weight: 800;
}

td {
  color: var(--color-text);
  font-weight: 500;
}

tbody tr {
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background: #f8fbff;
}

.state-card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.error {
  border-color: #f2b8b5;
  background: #fff5f5;
  color: #8a1c16;
}

@media (min-width: 800px) {
  .filters-grid {
    grid-template-columns: 180px 1fr auto;
    align-items: end;
  }
}
</style>