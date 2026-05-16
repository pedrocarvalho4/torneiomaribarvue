<template>
  <header class="site-header">
    <nav class="nav">
      <router-link to="/" class="brand">
        <img :src="logo" alt="Torneio Maribar" class="logo-img" />
        <span class="brand-title">Torneio Maribar</span>
      </router-link>

      <div class="nav-right">
        <ul class="nav-links">
          <li><router-link to="/">{{ t('nav.home') }}</router-link></li>
          <li><router-link to="/sobre">{{ t('nav.about') }}</router-link></li>
          <li><router-link to="/edicoes-passadas">{{ t('nav.pastEditions') }}</router-link></li>
          <li><router-link to="/informacoes-inscricoes">{{ t('nav.registrationInfo') }}</router-link></li>
          <li><router-link to="/calendarios-resultados">{{ t('nav.scheduleResults') }}</router-link></li>
          <li><router-link to="/galeria">{{ t('nav.gallery') }}</router-link></li>
          <li><router-link to="/regulamento">{{ t('nav.rules') }}</router-link></li>
        </ul>

        <div class="language-switcher" :aria-label="t('language.selectLanguage')">
          <button
            :class="{ active: language === 'pt' }"
            type="button"
            @click="setLanguage('pt')"
          >
            PT
          </button>

          <button
            :class="{ active: language === 'en' }"
            type="button"
            @click="setLanguage('en')"
          >
            EN
          </button>

          <button
            :class="{ active: language === 'es' }"
            type="button"
            @click="setLanguage('es')"
          >
            ES
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
  import { useI18n } from '../i18n'
import logo from '../assets/logo-tmaribar.png'

const { t, setLanguage, language } = useI18n()
</script>

<style scoped>
.logo-img {
  height: 30px;
  width: auto;
  object-fit: contain;
  display: block;
  filter: brightness(0) invert(1);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #0b4f99;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.nav {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-title {
  font-size: 18px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
  line-height: 1;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.88);
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
  transition: all 0.2s ease;
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}

.nav-links a.router-link-active {
  background-color: white;
  color: #0b4f99;
  font-weight: 700;
}

.language-switcher {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
}

.language-switcher button {
  border: none;
  border-radius: 999px;
  padding: 5px 8px;
  background: transparent;
  color: white;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  font-family: inherit;
}

.language-switcher button.active {
  background: white;
  color: #0b4f99;
}

@media (max-width: 900px) {
  .nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-right {
    justify-content: flex-start;
  }
}
</style>