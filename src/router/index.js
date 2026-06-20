import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PastEditionsView from '../views/PastEditionsView.vue'
import InfoView from '../views/InfoView.vue'
import CalendarView from '../views/CalendarView.vue'
import GalleryView from '../views/GalleryView.vue'
import RulesView from '../views/RulesView.vue'
import TestScheduleView from '../views/TestScheduleView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/sobre', name: 'about', component: AboutView },
    { path: '/edicoes-passadas', name: 'past-editions', component: PastEditionsView },
    { path: '/informacoes-inscricoes', name: 'info', component: InfoView },
    { path: '/calendarios-resultados', name: 'calendar', component: CalendarView },
    { path: '/galeria', name: 'gallery', component: GalleryView },
    { path: '/regulamento', name: 'rules', component: RulesView },
    {
      path: '/calendario-testes',
      name: 'test-schedule',
      component: TestScheduleView,
    },
  ],
})

export default router
