import Vue from 'vue'
import App from './App.vue'
import '@fontsource/poppins'
import '@fontsource/poppins/100.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/900.css'

import FlagIcon from 'vue-flag-icon'
Vue.use(FlagIcon);

import { library } from '@fortawesome/fontawesome-svg-core'

import { faStar, faPlayCircle, faPlay } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStar, faPlayCircle, faPlay)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import loader from "vue-ui-preloader";

Vue.use(loader);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
