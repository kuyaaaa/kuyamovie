import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Best from '@/components/Best'
import Newest from '@/components/Newest'
import MovieInfo from '@/components/MovieInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/best',
      name: 'Best',
      component: Best
    },
    {
      path: '/newest',
      name: 'Newest',
      component: Newest
    },
    {
      path: '/movieinfo/:id',
      name: 'MovieInfo',
      component: MovieInfo
    }
  ]
})
