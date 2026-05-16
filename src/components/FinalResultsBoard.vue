<template>
  <section class="results-board">
    <div class="results-header">
      <h2>{{ t('finalResults.title') }}</h2>
      <p>{{ t('finalResults.subtitle') }}</p>
    </div>

    <div class="results-grid">
      <article
        v-for="competition in competitions"
        :key="competition.title"
        class="result-card"
      >
        <h3>{{ competition.title }}</h3>
        <p>{{ t('finalResults.finalClassification') }}</p>

        <ol>
          <li
            v-for="result in competition.results"
            :key="`${competition.title}-${result.position}-${result.team}`"
          >
            <strong>{{ result.position }}</strong> - {{ result.team }}
          </li>
        </ol>
      </article>
    </div>
  </section>
</template>

<style scoped>
.results-board {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.results-header {
  padding: 32px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
  color: var(--color-text-light);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.results-header h2 {
  margin: 0 0 10px;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.results-header p {
  margin: 0 auto;
  max-width: 760px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
}

.results-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.result-card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.result-card h3 {
  margin: 0 0 6px;
  color: var(--color-primary-dark);
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.result-card p {
  margin: 0 0 14px;
  color: var(--color-secondary);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
}

.result-card ol {
  margin: 0;
  padding-left: 22px;
}

.result-card li {
  margin-bottom: 8px;
  color: var(--color-text);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.55;
}

.result-card li::marker {
  color: var(--color-primary-dark);
  font-weight: 800;
}

@media (min-width: 900px) {
  .results-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
