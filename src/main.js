import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Paginate from 'vuejs-paginate'
import Vuelidate from 'vuelidate'
import VueCookies from 'vue-cookies'
import { configAxios } from './js/axios-config'


Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
Vue.use(VueCookies)

Vue.component('paginate', Paginate)
configAxios();


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
