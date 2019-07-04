import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Paginate from 'vuejs-paginate'
import Vuelidate from 'vuelidate'

Vue.use(VueAxios, axios);
Vue.use(Vuelidate);

Vue.component('paginate', Paginate)

axios.defaults.baseURL = 'https://grocery-shop.herokuapp.com/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
