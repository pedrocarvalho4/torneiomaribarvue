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
      <section class="category-card">
        <h3>{{ t('common.male') }}</h3>
        <TeamList :teams="masculino" :t="t" />
      </section>

      <section class="category-card">
        <h3>{{ t('common.female') }}</h3>
        <TeamList :teams="feminino" :t="t" />
      </section>

      <section class="category-card">
        <h3>{{ t('common.mixed') }}</h3>
        <TeamList :teams="misto" :t="t" />
      </section>

      <section class="category-card">
        <h3>{{ t('common.sub16') }}</h3>
        <TeamList :teams="sub16" :t="t" />
      </section>
    </template>
  </section>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, ref } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const sheetID = '1DjbucAnoBFOPJvaRA75i3MWRbfhB8yW403OQgT2b5hw'
const gid = '1329029271'

const rows = ref([])
const loading = ref(false)
const error = ref(false)

const TeamList = defineComponent({
  props: {
    teams: {
      type: Array,
      required: true,
    },
    t: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    return () => {
      if (!props.teams.length) {
        return h('p', { class: 'empty-category' }, props.t('registrationsFromSheet.emptyCategory'))
      }

      return h(
        'div',
        { class: 'teams-list' },
        props.teams.map((team, index) =>
          h(
            'article',
            {
              class: 'team-row',
              key: `${team.athlete1}-${team.athlete2}-${index}`,
            },
            [
              h('span', { class: 'team-number' }, String(index + 1).padStart(2, '0')),
              h('span', { class: 'team-name' }, `${team.athlete1} / ${team.athlete2}`),
              h(
                'span',
                {
                  class: team.verified ? 'status verified' : 'status pending',
                  title: team.verified
                    ? props.t('registrationsFromSheet.verified')
                    : props.t('registrationsFromSheet.pending'),
                },
                team.verified ? '✔️' : '⏳'
              ),
            ]
          )
        )
      )
    }
  },
})

function normalizeText(value) {
  return String(value || '').trim().toLowerCase()
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

function filterByType(keyword) {
  return rows.value.filter((row) => normalizeText(row.type).includes(keyword))
}

const masculino = computed(() => filterByType('masculina'))
const feminino = computed(() => filterByType('feminina'))
const misto = computed(() => filterByType('mista'))
const sub16 = computed(() =>
  rows.value.filter((row) => normalizeText(row.type).includes('sub'))
)

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
  .registrations-header {
    padding: 28px;
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-sm);
  }

  .registrations-header h2 {
    margin: 0 0 8px;
    color: var(--color-text);
    font-size: clamp(24px, 3vw, 32px);
    font-weight: 800;
  }

  .registrations-header p {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 15px;
    font-weight: 500;
  }

.category-card {
  padding: 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.category-card h3 {
  margin: 0 0 18px;
  color: var(--color-primary-dark);
  font-size: 22px;
  font-weight: 800;
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
    grid-template-columns: 36px 1fr 30px;
  }
}
</style>