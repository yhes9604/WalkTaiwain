import { createRouter, createWebHashHistory } from 'vue-router'
import ActivityDetail from "../views/ActivityDetail.vue"
import RestaurantDetail from "../views/RestaurantDetail.vue"
import ScenicSpotDetail from "../views/ScenicSpotDetail.vue"
import Activity from "../views/Activity.vue"
import Restaurants from "../views/Restaurants.vue"
import ScenicSpots from "../views/ScenicSpots.vue"
const routes = [
  {
    path: '/',
    component: () => import('../views/index.vue')
  },

  {
    path: '/activities/:id',
    component: ActivityDetail
  },
  {
    path: '/activity',
    component: Activity
  },
  {
    path: '/restaurants/:id',
    component: RestaurantDetail
  },
  {
    path: '/scenicspots/:id',
    component: ScenicSpotDetail
  },
  {
    path: '/restaurants',
    component: Restaurants
  },
  {
    path: '/scenic-spots',
    component: ScenicSpots
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
