<template>
  <section class="registrations">
    <div class="header">
      <h2>{{ t('registrations.title') }}</h2>
      <p>
        {{ t('registrations.subtitle') }}
      </p>
      <p class="highlight">
        {{ t('registrations.highlight') }}
      </p>
    </div>

    <div class="grid">
      <div class="block masculino">
        <h3>{{ t('registrations.maleTournament') }}</h3>
        <span>{{ masculino.length }} {{ t('registrations.teams') }}</span>

        <ul>
          <li v-for="(dupla, i) in masculino" :key="i">
            {{ dupla }}
          </li>
        </ul>
      </div>

      <div class="block feminino">
        <h3>{{ t('registrations.femaleTournament') }}</h3>
        <span>{{ feminino.length }} {{ t('registrations.teams') }}</span>

        <ul>
          <li v-for="(dupla, i) in feminino" :key="i">
            {{ dupla }}
          </li>
        </ul>
      </div>

      <div class="block misto">
        <h3>{{ t('registrations.mixedTournament') }}</h3>
        <span>{{ misto.length }} {{ t('registrations.teams') }}</span>

        <ul>
          <li v-for="(dupla, i) in misto" :key="i">
            {{ dupla }}
          </li>
        </ul>
      </div>

      <div class="block sub16">
        <h3>{{ t('registrations.sub16Tournament') }}</h3>
        <span>{{ sub16.length }} {{ t('registrations.teams') }}</span>

        <ul>
          <li v-for="(dupla, i) in sub16" :key="i">
            {{ dupla }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useI18n } from '../i18n'

const { t } = useI18n()

defineProps({
  masculino: { type: Array, default: () => [] },
  feminino: { type: Array, default: () => [] },
  misto: { type: Array, default: () => [] },
  sub16: { type: Array, default: () => [] },
})
</script>

<style scoped>
.registrations {
  padding: 40px 0;
}

/* HEADER */
.header {
  max-width: 760px;
  margin: 0 auto 30px;
  text-align: center;
}

.header h2 {
  margin: 0 0 10px;
  color: var(--color-primary-dark);
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.header p {
  margin: 0 0 6px;
  color: var(--color-secondary);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
}

.highlight {
  color: var(--color-primary-dark);
  font-weight: 800;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

/* BLOCO */
.block {
  padding: 22px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.block h3 {
  margin: 0 0 6px;
  font-size: 21px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.block span {
  display: block;
  margin-bottom: 12px;
  color: var(--color-secondary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}

/* LISTA */
ul {
  margin: 0;
  padding-left: 18px;
}

li {
  margin-bottom: 6px;
  color: var(--color-text);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.55;
}

/* CORES */
.masculino h3 {
  color: #004080;
}

.feminino h3 {
  color: #800040;
}

.misto h3 {
  color: #008060;
}

.sub16 h3 {
  color: #b88900;
}

/* RESPONSIVO */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>