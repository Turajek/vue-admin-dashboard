import Vue from 'vue'
import Vuex from 'vuex'

import products from './products';
import categories from './categories';
import loader from './loader';
import notification from './notification';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    categories,
    loader,
    notification
  }
})
