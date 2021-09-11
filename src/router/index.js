import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'
import Authentication from '../components/Authentication.vue'
import Tab1 from '@/views/Tab1.vue';
import Tab2 from '@/views/Tab2.vue';
import Tab3 from '@/views/Tab3.vue';
import Tab4 from '@/views/Tab4.vue';
import Tab5 from '@/views/Tab5.vue';

const routes = [
  {
    path: '/',
    component: Authentication
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: Tab1
      },
      {
        path: 'tab2',
        // component: () => import('@/views/Tab2.vue')
        component: Tab2
      },
      {
        path: 'tab3',
        component: Tab3
        // component: () => import('@/views/Tab3.vue')
      },
      {
        path: 'tab4',
        component: Tab4
        // component: () => import('@/views/Tab4.vue')
      },
      {
        path: 'tab5',
        component: Tab5
        // component: () => import('@/views/Tab5.vue')
      },
      {
        path: 'finish',
        component: () => import('@/components/profile/Finish.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
