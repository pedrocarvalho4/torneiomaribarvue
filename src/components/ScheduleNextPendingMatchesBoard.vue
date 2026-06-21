<template>
  <section class="schedule-board">
    <div class="schedule-header">
      <h2>{{ t('scheduleNextPendingMatches.title') }}</h2>
      <p>{{ t('scheduleNextPendingMatches.subtitle') }}</p>
    </div>

    <div v-if="loading" class="state-card">
      {{ t('scheduleNextPendingMatches.loading') }}
    </div>

    <div v-else-if="error" class="state-card error">
      {{ t('scheduleNextPendingMatches.loadError') }}
    </div>

    <template v-else>
      <div v-if="nextPendingMatches.length" class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>{{ t('scheduleNextPendingMatches.table.matchNumber') }}</th>
              <th>{{ t('scheduleNextPendingMatches.table.day') }}</th>
              <th>{{ t('scheduleNextPendingMatches.table.time') }}</th>
              <th>{{ t('scheduleNextPendingMatches.table.field') }}</th>
              <th>{{ t('scheduleNextPendingMatches.table.teamA') }}</th>
              <th></th>
              <th>X</th>
              <th></th>
              <th>{{ t('scheduleNextPendingMatches.table.teamB') }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="match in nextPendingMatches" :key="match.key">
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
        {{ t('scheduleNextPendingMatches.empty') }}
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

const resultLimit = 40

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

const nextPendingMatches = computed(() =>
  allMatches.value
    .filter((match) => !match.resultA && !match.resultB)
    .slice(0, resultLimit)
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
  margin-top: 32px;
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
</style>