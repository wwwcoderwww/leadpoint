
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import {router} from './router'
import store from './store'
import VeeValidate from 'vee-validate';


import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';


import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import Notifications from 'vue-notification'

Vue.use(Notifications)
Vue.use(Datetime)

Vue.use(VeeValidate);
Vue.use(VCalendar);

Vue.prototype.$axios = axios;
axios.defaults['withCredentials']= true;

new Vue({
   store,
   router,
   el: '#app',
   render: h => h(App)
})
