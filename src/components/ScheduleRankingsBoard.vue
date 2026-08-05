<template>
  <section class="rankings-board">
    <header class="rankings-header">
      <div>
        <span class="rankings-eyebrow">
          {{ t('rankings.eyebrow') }}
        </span>

        <h2>{{ t('rankings.title') }}</h2>

        <p>{{ t('rankings.description') }}</p>
      </div>
    </header>

    <div
      class="competition-tabs"
      role="tablist"
      :aria-label="t('rankings.competitions')"
    >
      <button
        v-for="competition in competitions"
        :key="competition.key"
        class="competition-tab"
        :class="{ active: activeCompetition === competition.key }"
        type="button"
        role="tab"
        :aria-selected="activeCompetition === competition.key"
        @click="selectCompetition(competition.key)"
      >
        {{ t(competition.labelKey) }}
      </button>
    </div>

    <section class="ranking-content">
      <div v-if="loading" class="state-card">
        <span class="loading-spinner" aria-hidden="true"></span>
        <span>{{ t('rankings.loading') }}</span>
      </div>

      <div v-else-if="error" class="state-card error">
        <strong>{{ t('rankings.loadErrorTitle') }}</strong>
        <span>{{ error }}</span>

        <button
          class="retry-button"
          type="button"
          @click="loadCompetition(activeCompetition, true)"
        >
          {{ t('rankings.retry') }}
        </button>
      </div>

      <div v-else-if="rankings.length === 0" class="state-card">
        {{ t('rankings.noResults') }}
      </div>

      <template v-else>
        <div class="ranking-title-row">
          <div>
            <span class="ranking-label">
              {{ t('rankings.currentRanking') }}
            </span>

            <h3>{{ activeCompetitionTitle }}</h3>
          </div>

          <span class="teams-count">
            {{ rankings.length }}
            {{ rankings.length === 1
              ? t('rankings.team')
              : t('rankings.teams')
            }}
          </span>
        </div>

        <div class="ranking-table-wrapper">
          <table class="ranking-table">
            <thead>
              <tr>
                <th class="position-column">
                  {{ t('rankings.position') }}
                </th>

                <th>
                  {{ t('rankings.pair') }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                  v-for="(ranking, index) in rankings"
                  :key="`${activeCompetition}-${index}-${ranking.position}-${ranking.team}`"
                  :class="{ podium: isPodiumPosition(ranking.position) }"
                >
                <td class="position-cell">
                  <span
                    class="position-badge"
                    :class="getPositionClass(ranking.position)"
                  >
                    {{ ranking.position }}
                  </span>
                   
                </td>

                <td class="team-cell">
                  {{ ranking.team }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </section>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const spreadsheetId = '14ICaVXjlOjBSFDSxW3p8TrE5y0KsLJJIwR4-NMxytQk'

const competitions = [
  {
    key: 'mixedTournament',
    labelKey: 'rankings.mixedTournament',
    gid: '109933911',
    range: 'K78:L141',
    excludeBye: false
  },
  {
    key: 'mixedCup',
    labelKey: 'rankings.mixedCup',
    gid: '1652358830',
    range: 'J99:K146',
    excludeBye: false
  },
  {
    key: 'femaleTournament',
    labelKey: 'rankings.femaleTournament',
    gid: '108382013',
    range: 'K42:L72',
    excludeBye: false
  },
  {
    key: 'femaleCup',
    labelKey: 'rankings.femaleCup',
    gid: '299876945',
    range: 'K49:L72',
    excludeBye: false
  },
  {
    key: 'maleTournament',
    labelKey: 'rankings.maleTournament',
    gid: '1992541591',
    range: 'K78:L141',
    excludeBye: true
  },
  {
    key: 'maleCup',
    labelKey: 'rankings.maleCup',
    gid: '1027930941',
    range: 'J99:K146',
    excludeBye: true
  },
  {
    key: 'under16Tournament',
    labelKey: 'rankings.under16Tournament',
    gid: '1946814567',
    range: 'D36:E41',
    excludeBye: false
  },
  {
    key: 'parentChildTournament',
    labelKey: 'rankings.parentChildTournament',
    gid: '609455942',
    range: 'D36:E41',
    excludeBye: false
  }
]

const activeCompetition = ref(competitions[0].key)
const rankings = ref([])
const loading = ref(false)
const error = ref('')

const rankingsCache = new Map()

const activeCompetitionConfig = computed(() => {
  return competitions.find(
    competition => competition.key === activeCompetition.value
  )
})

const activeCompetitionTitle = computed(() => {
  if (!activeCompetitionConfig.value) {
    return ''
  }

  return t(activeCompetitionConfig.value.labelKey)
})

function buildCsvUrl(competition) {
  const params = new URLSearchParams({
    tqx: 'out:csv',
    gid: competition.gid,
    range: competition.range
  })

  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?${params.toString()}`
}

function parseCsv(csvText) {
  const rows = []
  let currentRow = []
  let currentCell = ''
  let insideQuotes = false

  for (let index = 0; index < csvText.length; index += 1) {
    const currentCharacter = csvText[index]
    const nextCharacter = csvText[index + 1]

    if (currentCharacter === '"') {
      if (insideQuotes && nextCharacter === '"') {
        currentCell += '"'
        index += 1
      } else {
        insideQuotes = !insideQuotes
      }

      continue
    }

    if (currentCharacter === ',' && !insideQuotes) {
      currentRow.push(currentCell)
      currentCell = ''
      continue
    }

    if (
      (currentCharacter === '\n' || currentCharacter === '\r') &&
      !insideQuotes
    ) {
      if (currentCharacter === '\r' && nextCharacter === '\n') {
        index += 1
      }

      currentRow.push(currentCell)

      if (currentRow.some(cell => cell.trim() !== '')) {
        rows.push(currentRow)
      }

      currentRow = []
      currentCell = ''
      continue
    }

    currentCell += currentCharacter
  }

  if (currentCell !== '' || currentRow.length > 0) {
    currentRow.push(currentCell)

    if (currentRow.some(cell => cell.trim() !== '')) {
      rows.push(currentRow)
    }
  }

  return rows
}

function normaliseValue(value) {
  return String(value ?? '')
    .replace(/\u00a0/g, ' ')
    .trim()
}

function isBye(team) {
  return normaliseValue(team).toLowerCase() === 'bye'
}

function mapRowsToRankings(rows, competition) {
  return rows
    .map(row => ({
      position: normaliseValue(row[0]),
      team: normaliseValue(row[1])
    }))
    .filter(ranking => {
      if (!ranking.position || !ranking.team) {
        return false
      }

      if (
        competition.excludeBye &&
        isBye(ranking.team)
      ) {
        return false
      }

      return true
    })
}

async function loadCompetition(competitionKey, forceReload = false) {
  const competition = competitions.find(
    item => item.key === competitionKey
  )

  if (!competition) {
    rankings.value = []
    return
  }

  if (!forceReload && rankingsCache.has(competitionKey)) {
    rankings.value = rankingsCache.get(competitionKey)
    error.value = ''
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await fetch(buildCsvUrl(competition), {
      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(
        `${t('rankings.requestFailed')} (${response.status})`
      )
    }

    const csvText = await response.text()
    const rows = parseCsv(csvText)

    const parsedRankings = mapRowsToRankings(
      rows,
      competition
    )

    rankingsCache.set(competitionKey, parsedRankings)
    rankings.value = parsedRankings
  } catch (exception) {
    console.error(
      `Error loading ranking ${competitionKey}:`,
      exception
    )

    rankings.value = []
    error.value =
      exception instanceof Error
        ? exception.message
        : t('rankings.unknownError')
  } finally {
    loading.value = false
  }
}

function selectCompetition(competitionKey) {
  activeCompetition.value = competitionKey
  loadCompetition(competitionKey)
}

function getNumericPosition(position) {
  const match = String(position ?? '').match(/\d+/)

  return match ? Number(match[0]) : null
}

function isPodiumPosition(position) {
  const numericPosition = getNumericPosition(position)

  return numericPosition !== null && numericPosition <= 3
}

function getPositionClass(position) {
  const numericPosition = getNumericPosition(position)

  if (numericPosition === 1) {
    return 'first'
  }

  if (numericPosition === 2) {
    return 'second'
  }

  if (numericPosition === 3) {
    return 'third'
  }

  return ''
}

loadCompetition(activeCompetition.value)
</script>

<style scoped>
.rankings-board {
  width: 100%;
}

.rankings-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.rankings-eyebrow,
.ranking-label {
  display: block;
  margin-bottom: 6px;
  color: #0b4f99;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.rankings-header h2,
.ranking-title-row h3 {
  margin: 0;
  color: #172033;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 900;
  line-height: 1.2;
}

.rankings-header p {
  max-width: 720px;
  margin: 10px 0 0;
  color: #64748b;
  font-size: 15px;
  line-height: 1.6;
}

.competition-tabs {
  display: flex;
  gap: 10px;
  padding: 4px 2px 14px;
  margin-bottom: 24px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.competition-tab {
  flex: 0 0 auto;
  padding: 11px 16px;
  border: 1px solid #d9e2ec;
  border-radius: 999px;
  background: #ffffff;
  color: #172033;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.competition-tab:hover {
  border-color: #0b4f99;
  color: #0b4f99;
  transform: translateY(-1px);
}

.competition-tab.active {
  border-color: #0b4f99;
  background: #0b4f99;
  color: #ffffff;
  box-shadow: 0 7px 18px rgba(11, 79, 153, 0.2);
}

.ranking-content {
  min-height: 280px;
}

.ranking-title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;
}

.ranking-title-row h3 {
  font-size: clamp(21px, 2.4vw, 27px);
}

.teams-count {
  flex: 0 0 auto;
  padding: 8px 12px;
  border-radius: 999px;
  background: #edf5ff;
  color: #0b4f99;
  font-size: 12px;
  font-weight: 900;
}

.ranking-table-wrapper {
  width: 100%;
  overflow: hidden;
  border: 1px solid #e1e8f0;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 35, 60, 0.06);
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.ranking-table th,
.ranking-table td {
  padding: 15px 18px;
  border-bottom: 1px solid #edf1f5;
  text-align: left;
}

.ranking-table th {
  background: #f4f8fc;
  color: #526174;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.ranking-table tbody tr {
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.ranking-table tbody tr:hover {
  background: #f8fbff;
}

.ranking-table tbody tr:last-child td {
  border-bottom: 0;
}

.ranking-table tbody tr.podium {
  background: linear-gradient(
    90deg,
    rgba(237, 245, 255, 0.8),
    rgba(255, 255, 255, 0)
  );
}

.position-column {
  width: 140px;
}

.position-cell {
  width: 140px;
}

.position-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 38px;
  padding: 7px 12px;
  border-radius: 999px;
  background: #edf1f5;
  color: #334155;
  font-size: 14px;
  font-weight: 900;
}

.position-badge.first {
  background: #fff2b2;
  color: #7b5700;
}

.position-badge.second {
  background: #e8edf2;
  color: #465466;
}

.position-badge.third {
  background: #f4dfcf;
  color: #7a4527;
}

.team-cell {
  color: #172033;
  font-size: 15px;
  font-weight: 750;
  word-break: break-word;
}

.state-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 240px;
  padding: 32px;
  border: 1px solid #e1e8f0;
  border-radius: 16px;
  background: #f8fafc;
  color: #526174;
  text-align: center;
}

.state-card.error {
  border-color: #f5c2c7;
  background: #fff5f5;
  color: #842029;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #dbeafe;
  border-top-color: #0b4f99;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.retry-button {
  padding: 10px 16px;
  border: 0;
  border-radius: 999px;
  background: #0b4f99;
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
}

.retry-button:hover {
  background: #083e79;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 700px) {
  .rankings-header {
    align-items: flex-start;
  }

  .ranking-title-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .position-column,
  .position-cell {
    width: 90px;
  }

  .ranking-table th,
  .ranking-table td {
    padding: 13px 12px;
  }

  .team-cell {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .ranking-table-wrapper {
    border-radius: 12px;
  }

  .position-column,
  .position-cell {
    width: 72px;
  }

  .position-badge {
    min-width: 42px;
    min-height: 34px;
    padding: 6px 9px;
    font-size: 13px;
  }
}
</style>