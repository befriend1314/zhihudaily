"use strict";

import Vue from 'vue'
import VueResource from 'vue-resource'
import TopHeader from '../components/zhdaily/TopHeader.vue'
import ListContainer from '../components/zhdaily/ListContainer.vue'
import NewsDetail from '../components/zhdaily/NewsDetail.vue'
import Theme from '../components/zhdaily/Theme.vue'
import ThemeList from '../components/zhdaily/ThemeList.vue'
import About from '../components/zhdaily/About.vue'
import VueRouter from 'vue-router'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/home', component: ListContainer},
    { path: '/news/:id', name:'news', component: NewsDetail },
    { path: '/theme', name:'theme', component: Theme },
    { path: '/themelist/:id', name:'themelist', component: ThemeList },
    { path: '/about', name:'about', component: About },
    { path: '*', redirect: '/home'}
  ]
})


new Vue({
  router,
  components: {
    TopHeader, ListContainer
  }
}).$mount('#app')