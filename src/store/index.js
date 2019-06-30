import Vue from 'vue'
import Vuex from 'vuex'

import products from './products';
import categories from './categories';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    categories
  }
})
