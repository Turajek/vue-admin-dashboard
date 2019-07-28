import axios from 'axios';

export default {
    state: {
        orders: [],
        orderParams: {
            limit: 5,
            page: 1,
            order: 0,
            filter: ''
        }
    },
    getters: {
        orders: state => state.orders
    },
    mutations: {
        setOrders(state, data) {
            state.orders = data;
        },
        setOrderOrder(state, order) {
            console.log(order);
            state.orderParams.order = order;
            state.orderParams.page = 1;
            this.dispatch('getOrders');
        },
        setOrderPage(state, page) {
            state.orderParams.page = page;
            this.dispatch('getOrders');
        },
    },
    actions: {
        async getOrders({ commit, state }) {
            commit('setLoader', true);
            const { data } = await axios.get(
                "/admin/orders/get-orders", { params: state.orderParams }
            );
            commit("setOrders", data);
            commit('setLoader', false);
            return data
        },
        async deleteOrder({ commit, dispatch }, id) {
            commit('setLoader', true);
            const data = await axios.post('/admin/orders/delete-order/' + id);
            dispatch("getOrders");
            commit('setLoader', false);
            return data
        }
    }
}