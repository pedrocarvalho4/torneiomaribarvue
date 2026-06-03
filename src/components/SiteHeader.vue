<template>
  <header class="site-header">
    <nav class="nav">
      <router-link to="/" class="brand" @click="closeMenu">
        <img :src="logo" alt="Torneio Maribar" class="logo-img" />
        <span class="brand-title">Torneio Maribar</span>
      </router-link>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-label="Abrir menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-right" :class="{ open: isMenuOpen }">
        <ul class="nav-links">
          <li><router-link to="/" @click="closeMenu">{{ t('nav.home') }}</router-link></li>
          <li><router-link to="/sobre" @click="closeMenu">{{ t('nav.about') }}</router-link></li>
          <li><router-link to="/edicoes-passadas" @click="closeMenu">{{ t('nav.pastEditions') }}</router-link></li>
          <li><router-link to="/informacoes-inscricoes" @click="closeMenu">{{ t('nav.registrationInfo') }}</router-link></li>
          <li><router-link to="/calendarios-resultados" @click="closeMenu">{{ t('nav.scheduleResults') }}</router-link></li>
          <li><router-link to="/galeria" @click="closeMenu">{{ t('nav.gallery') }}</router-link></li>
          <li><router-link to="/regulamento" @click="closeMenu">{{ t('nav.rules') }}</router-link></li>
        </ul>

        <div class="language-switcher" :aria-label="t('language.selectLanguage')">
          <button :class="{ active: language === 'pt' }" type="button" @click="setLanguage('pt')">PT</button>
          <button :class="{ active: language === 'en' }" type="button" @click="setLanguage('en')">EN</button>
          <button :class="{ active: language === 'es' }" type="button" @click="setLanguage('es')">ES</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../i18n'
import logo from '../assets/logo-tmaribar.png'

const { t, setLanguage, language } = useI18n()

const isMenuOpen = ref(false)

const closeMenu = () => {
  isMenuOpen.value = false
}
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

.menu-toggle {
  display: none;
  width: 42px;
  height: 38px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.16);
  cursor: pointer;
  padding: 8px;
}

.menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  margin: 4px 0;
  border-radius: 999px;
  background: white;
}

@media (max-width: 900px) {
  .nav {
    position: relative;
    align-items: center;
    gap: 12px;
  }

  .menu-toggle {
    display: block;
    margin-left: auto;
  }

  .nav-right {
    display: none;
    position: absolute;
    top: 100%;
    left: 16px;
    right: 16px;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    padding: 14px;
    background-color: #0b4f99;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
  }

  .nav-right.open {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 6px;
    width: 100%;
  }

  .nav-links li {
    width: 100%;
  }

  .nav-links a {
    display: block;
    width: 100%;
    padding: 11px 12px;
    font-size: 14px;
    line-height: 1.2;
  }

  .language-switcher {
    align-self: flex-start;
  }
}
</style>