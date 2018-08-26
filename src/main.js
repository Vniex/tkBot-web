// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Scroller from 'vue-scroller'

import App from './App'
import Announcement from './components/Announcement'
import Robot from './components/Robot'
import Home from './components/Home'

Vue.use(VueRouter)
Vue.use(Scroller)


const serverName = ''
const apiPrefix = serverName + ''


const routes = [
  {
    path:'/',
    redirect: '/home'
  },{
  path: '/announcement',
  component: Announcement
  },{
  path: '/robot',
  component: Robot
},{
  path:'/home',
  component:Home
  
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.serverName = serverName
Vue.prototype.apiPrefix = apiPrefix

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
