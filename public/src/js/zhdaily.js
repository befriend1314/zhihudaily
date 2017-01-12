"use strict";

import Vue from 'vue'
import vueResource from 'vue-resource'
import TopHeader from '../components/zhdaily/TopHeader.vue'
import ListContainer from '../components/zhdaily/ListContainer.vue'

Vue.use(vueResource)

new Vue({
  el: '#app',
  components: {
    TopHeader, ListContainer
  }
})