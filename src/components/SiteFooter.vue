<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-block brand-block">
        <img :src="logo" alt="Torneio Maribar" class="footer-logo" />
        <p>{{ t('footer.brandText') }}</p>
      </div>

      <div class="footer-block">
        <h3>{{ t('footer.socialTitle') }}</h3>

        <div class="social-icons">
          <a
            class="facebook"
            href="https://www.facebook.com/profile.php?id=100093335237350"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg" alt="Facebook" />
          </a>

          <a
            class="instagram"
            href="https://www.instagram.com/torneiomaribarvolley"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg" alt="Instagram" />
          </a>

          <a
            class="whatsapp"
            href="https://chat.whatsapp.com/Dc7MQLLE1UJJLl0eSTZUCD"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg" alt="WhatsApp" />
          </a>
        </div>
      </div>

      <div class="footer-block contact-block">
        <h3>{{ t('footer.contactTitle') }}</h3>
        <p>torneiomaribarvolley@gmail.com</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>{{ t('footer.rights') }}</p>
    </div>
  </footer>
</template>

<script setup>
  import { useI18n } from '../i18n'
import logo from '../assets/logo-tmaribar.png'

const { t } = useI18n()
</script>
<style scoped>
.site-footer {
  margin-top: 64px;
  background: linear-gradient(135deg, #083b7a 0%, #0d6efd 50%, #1f7ae0 100%);
  color: white;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* TOP */
.footer-content {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 48px 16px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: center;
}

/* TITULOS */
.footer-block h3 {
  margin: 0 0 14px 0;
  font-size: 17px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* TEXTO */
.footer-block p,
.footer-block a {
  margin: 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
  text-decoration: none;
}

.footer-block a:hover {
  color: #ffffff;
}

/* BRAND */
.brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-block p {
  font-weight: 600;
}

.footer-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  background: white;
  border-radius: 999px;
  padding: 6px;
}

/* SOCIAL */
.social-icons {
  display: flex;
  gap: 14px;
}

.social-icons a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6px);
  transition: all 0.25s ease;
}

/* HOVER BASE */
.social-icons a:hover {
  transform: translateY(-3px) scale(1.05);
}

/* CORES POR REDE */
.facebook:hover {
  background: #1877f2;
}

.instagram:hover {
  background: linear-gradient(45deg, #f58529, #dd2a7b, #8134af);
}

.whatsapp:hover {
  background: #25d366;
}

/* ICONES */
.social-icons img {
  width: 20px;
  height: 20px;
  filter: invert(1);
}

/* WHATSAPP DESTACADO */
.whatsapp {
  background: rgba(37, 211, 102, 0.15);
  border: 1px solid rgba(37, 211, 102, 0.4);
}

/* CONTACTO */
.contact-block a {
  font-weight: 600;
}

/* BOTTOM */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 18px;
  background: rgba(0, 0, 0, 0.15);
}

.footer-bottom p {
  max-width: var(--container-width);
  margin: 0 auto;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
}

/* RESPONSIVO */
@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: 1.2fr 1fr 1fr;
  }
}
</style>