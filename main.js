import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import 	uviewsPlus from '@/uni_modules/uview-plus'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewsPlus)
  return {
    app,
	Pinia
  }
}
// #endif