import axios from 'axios';

export default {
    state: {
        products: [],
        productParams: {
            limit: 20,
            page: 1,
            order: 4,
            categoryId: null
        }
    },
    getters: {
        products: state => state.products
    },
    mutations: {
        setProducts(state, data) {
            state.products = data;
        },
        setOrder(state, order) {
            state.productParams.order = order;
            state.productParams.page = 1;
            this.dispatch('getProducts');
        },
        setCategory(state, categoryId) {
            state.productParams.categoryId = categoryId;
            state.productParams.page = 1;
            this.dispatch('getProducts');
        },
    },
    actions: {
        async getProducts({ commit, state }) {
            commit('setLoader', true, { root: true })
            const { data } = await axios.get(
                "/shop/get-products", { params: state.productParams }
            );
            commit("setProducts", data);
            commit('setLoader', false, { root: true })
            return data
        },
        async addProduct({ dispatch }, sendData) {
            const data = await axios({
                method: 'post',
                url: '/admin/add-product',
                data: sendData.file,
                params: sendData.params,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
            dispatch("getProducts");
            return data
        },
        async editProduct({ dispatch }, sendData) {
            const data = await axios({
                method: 'post',
                url: '/admin/edit-product/' + sendData.id,
                data: sendData.file,
                params: sendData.params,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
            dispatch("getProducts");
            return data
        },
        async deleteProduct({ dispatch }, id) {
            const data = await axios.post('/admin/delete-product/' + id);
            dispatch("getProducts");
            return data
        }
    }
}