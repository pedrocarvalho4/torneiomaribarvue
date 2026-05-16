<template>
  <Container>
    <SectionTitle :title="t('rules.title')" />

    <section class="rules-hero">
      <h2>{{ t('rules.heroTitle') }}</h2>
      <p>{{ t('rules.heroText') }}</p>
    </section>

    <div class="rules-page">
      <aside class="rules-nav">
        <a href="#funcionamento">{{ t('rules.nav.general') }}</a>
        <a href="#regras">{{ t('rules.nav.rules') }}</a>
        <a href="#torneio">{{ t('rules.nav.tournament') }}</a>
        <a href="#sub16">{{ t('rules.nav.sub16') }}</a>
        <a href="#seniores">{{ t('rules.nav.seniors') }}</a>
        <a href="#premios">{{ t('rules.nav.prizes') }}</a>
        <a href="#taca">{{ t('rules.nav.maribarCup') }}</a>
        <a href="#inscricoes">{{ t('rules.nav.registrations') }}</a>
      </aside>

      <section class="rules-content">
        <article id="funcionamento" class="rule-section">
          <h3>{{ t('rules.general.title') }}</h3>
          <ul>
            <li><strong>08h30 - 09h00:</strong> {{ t('rules.general.checkIn') }}</li>
            <li><strong>09h10:</strong> {{ t('rules.general.meeting') }}</li>
            <li><strong>09h20:</strong> {{ t('rules.general.groupPhoto') }}</li>
            <li><strong>09h30:</strong> {{ t('rules.general.gamesStart') }}</li>
          </ul>
          <p>{{ t('rules.general.text1') }}</p>
          <p>{{ t('rules.general.text2') }}</p>
          <p>{{ t('rules.general.text3') }}</p>
        </article>

        <article id="regras" class="rule-section">
          <h3>{{ t('rules.regulations.title') }}</h3>
          <ul>
            <li>{{ t('rules.regulations.rule1') }}</li>
            <li>{{ t('rules.regulations.rule2') }}</li>
            <li><strong>{{ t('rules.regulations.mixedLabel') }}</strong> {{ t('rules.regulations.mixedRule') }}</li>
            <li><strong>{{ t('rules.regulations.sub16Label') }}</strong> {{ t('rules.regulations.sub16Rule') }}</li>
            <li>{{ t('rules.regulations.rule5') }}</li>
            <li>{{ t('rules.regulations.rule6') }}</li>
            <li>{{ t('rules.regulations.rule7') }}</li>
          </ul>
          <p>{{ t('rules.regulations.finalDecision') }}</p>
        </article>

        <article id="torneio" class="rule-section">
          <h3>{{ t('rules.tournament.title') }}</h3>
          <p>{{ t('rules.tournament.text') }}</p>
          <ul>
            <li>{{ t('common.female') }}</li>
            <li>{{ t('common.male') }}</li>
            <li>{{ t('common.mixed') }}</li>
            <li>{{ t('common.sub16') }}</li>
          </ul>
        </article>

        <article id="sub16" class="rule-section">
          <h3>{{ t('rules.sub16.title') }}</h3>
          <p>{{ t('rules.common.bracketMayChange') }}</p>
          <h4>{{ t('rules.common.firstStage') }}</h4>
          <ul>
            <li>{{ t('rules.sub16.firstStageRule1') }}</li>
            <li>{{ t('rules.sub16.firstStageRule2') }}</li>
          </ul>
          <h4>{{ t('rules.common.secondStage') }}</h4>
          <ul>
            <li>{{ t('rules.sub16.secondStageRule1') }}</li>
            <li>{{ t('rules.sub16.secondStageRule2') }}</li>
          </ul>
        </article>

        <article id="seniores" class="rule-section">
          <h3>{{ t('rules.seniors.title') }}</h3>
          <p>{{ t('rules.common.bracketMayChange') }}</p>
          <h4>{{ t('rules.common.firstStage') }}</h4>
          <ul>
            <li>{{ t('rules.seniors.firstStageRule1') }}</li>
            <li>{{ t('rules.seniors.firstStageRule2') }}</li>
            <li>{{ t('rules.seniors.firstStageRule3') }}</li>
            <li>{{ t('rules.seniors.firstStageRule4') }}</li>
          </ul>
          <h4>{{ t('rules.common.secondStage') }}</h4>
          <ul>
            <li>{{ t('rules.seniors.secondStageRule1') }}</li>
            <li>{{ t('rules.seniors.secondStageRule2') }}</li>
            <li>{{ t('rules.seniors.secondStageRule3') }}</li>
          </ul>
        </article>

        <article id="premios" class="rule-section">
          <h3>{{ t('rules.prizes.title') }}</h3>
          <h4>{{ t('common.sub16') }}</h4>
          <ul>
            <li>{{ t('rules.prizes.sub16First') }}</li>
            <li>{{ t('rules.prizes.sub16Others') }}</li>
          </ul>
          <h4>{{ t('rules.prizes.seniorCategories') }}</h4>
          <ul>
            <li>{{ t('rules.prizes.seniorsFirst') }}</li>
            <li>{{ t('rules.prizes.seniorsSecond') }}</li>
          </ul>
        </article>

        <article id="taca" class="rule-section">
          <h3>{{ t('rules.maribarCup.title') }}</h3>
          <p>{{ t('rules.maribarCup.text') }}</p>
          <ul>
            <li><strong>{{ t('rules.maribarCup.sundayTime') }}</strong> {{ t('rules.maribarCup.gamesStart') }}</li>
          </ul>
          <h4>{{ t('rules.maribarCup.bracketTitle') }}</h4>
          <ul>
            <li>{{ t('rules.maribarCup.bracketRule1') }}</li>
            <li>{{ t('rules.maribarCup.bracketRule2') }}</li>
            <li>{{ t('rules.maribarCup.bracketRule3') }}</li>
          </ul>
          <h4>{{ t('rules.maribarCup.prizesTitle') }}</h4>
          <ul>
            <li>{{ t('rules.maribarCup.firstPrize') }}</li>
            <li>{{ t('rules.maribarCup.secondPrize') }}</li>
          </ul>
        </article>

        <article id="inscricoes" class="rule-section">
          <h3>{{ t('rules.registrations.title') }}</h3>
          <p>{{ t('rules.registrations.text') }}</p>
          <ul>
            <li v-html="t('rules.registrations.maxMale')"></li>
            <li v-html="t('rules.registrations.maxMixed')"></li>
            <li v-html="t('rules.registrations.maxFemale')"></li>
            <li v-html="t('rules.registrations.maxSub16')"></li>
          </ul>

          <h4>{{ t('rules.registrations.changesTitle') }}</h4>
          <ul>
            <li>{{ t('rules.registrations.changeRule1') }}</li>
            <li>{{ t('rules.registrations.changeRule2') }}</li>
          </ul>
        </article>
      </section>
    </div>
  </Container>
</template>

<script setup>
import { useI18n } from '../i18n'
import Container from '../components/Container.vue'
import SectionTitle from '../components/SectionTitle.vue'

const { t } = useI18n()
</script>

<style scoped>
.rules-hero {
  padding: 56px 32px;
  border-radius: var(--radius-lg);
  background: linear-gradient(
    135deg,
    #0b4f99 0%,
    #0d6efd 60%,
    #1f7ae0 100%
  );
  color: white;
  box-shadow: var(--shadow-sm);
}

.rules-hero h2 {
  margin: 0 0 12px;
  color: white;
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 800;
  line-height: 1.1;
}

.rules-hero p {
  margin: 0;
  max-width: 760px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
}

.rules-page {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 32px;
  align-items: flex-start;
}

.rules-nav {
  position: sticky;
  top: 88px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  border: none;
  border-radius: var(--radius-lg);
  background: linear-gradient(
    135deg,
    #0b4f99 0%,
    #0d6efd 100%
  );
  color: white;
  box-shadow: var(--shadow-sm);
}

.rules-nav a {
  padding: 8px 10px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 14px;
  font-weight: 800;
  line-height: 1.2;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.rules-nav a:hover {
  background: rgba(255, 255, 255, 0.16);
  color: white;
}

.rules-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.rule-section {
  padding: 28px;
  border: none;
  border-radius: var(--radius-lg);
  background: linear-gradient(
    135deg,
    #0b4f99 0%,
    #0d6efd 100%
  );
  color: white;
  box-shadow: var(--shadow-sm);
  scroll-margin-top: 100px;
}

.rule-section h3 {
  margin: 0 0 16px;
  color: white;
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.rule-section h4 {
  margin: 18px 0 8px;
  color: white;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.rule-section p,
.rule-section li {
  color: rgba(255, 255, 255, 0.92);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.7;
}

.rule-section strong {
  color: white;
  font-weight: 800;
}

.rule-section p {
  margin: 0 0 12px;
}

.rule-section ul {
  margin: 0 0 12px;
  padding-left: 22px;
}

.rule-section li {
  margin-bottom: 6px;
}

.rule-section li::marker {
  color: white;
  font-weight: 800;
}

@media (max-width: 900px) {
  .rules-page {
    grid-template-columns: 1fr;
  }

  .rules-nav {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .rules-hero,
  .rule-section {
    padding: 24px 20px;
  }

  .rules-page {
    gap: 20px;
  }

  .rules-nav {
    padding: 14px;
  }

  .rules-nav a {
    flex: 1;
    text-align: center;
  }
}
</style>