// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Scroller from 'vue-scroller'

import App from './App'
import Announcement from './components/Announcement'
import Robot from './components/Robot'

Vue.use(VueRouter)
Vue.use(Scroller)

const routes = [
  {
    path:'/',
    redirect: '/announcement'
  },{
  path: '/announcement',
  component: Announcement
  },{
  path: '/robot',
  component: Robot
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
