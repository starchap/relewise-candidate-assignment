import { createRouter, createWebHistory } from 'vue-router'


const ProductPage = () => import('@/views/ProductPage.vue');
const SearchPage = () => import('@/views/SearchPage.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Search',
      component: SearchPage,
    },
    {
      path: '/product/:productId',
      name: 'Product',
      component: ProductPage,
      props:true
    }
  ],
})

export default router
