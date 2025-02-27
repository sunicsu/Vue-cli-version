// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import QRCode from 'qrcodejs2'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Print from 'vue-print-nb'

Vue.use(Print)
Vue.use(iView)
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.prototype.$Message.config({
  top: 200,
  duration: 3
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
