import { createRouter, createWebHistory } from 'vue-router'
import ChatVue from '@/views/chat/Chat.vue'
import AnalysisVue from '@/views/analysis/Analysis.vue'
import RecommendationVue from "@/views/recommendation/Recommendation.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: ChatVue
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: AnalysisVue
    },
    {
      path: '/recommendation',
      name: 'recommendation',
      component: RecommendationVue
    }
  ]
})

export default router
