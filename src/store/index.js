import Vue from 'vue'
import Vuex from 'vuex'

import products from './products';
import categories from './categories';
import loader from './loader';
import notification from './notification';
import auth from './auth';
import users from './users';
import orders from './orders';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    categories,
    loader,
    notification,
    auth,
    users,
    orders
  }
})
