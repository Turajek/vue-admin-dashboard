import axios from 'axios';

export default {
    state: {
        products: []
    },
    getters: {
        products: state => state.products
    },
    mutations: {
        setProducts(state, data) {
            state.products = data;
        }
    },
    actions: {
        async getProducts({ commit }) {
            const { data } = await axios.get(
                "/shop/get-products?page=1&limit=20"
            );
            commit("setProducts", data);
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
        }
    }
}