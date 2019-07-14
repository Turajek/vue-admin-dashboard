import axios from 'axios';

export default {
    state: {
        users: [],
        userParams: {
            limit: 5,
            page: 1,
            order: 4,
            categoryId: null,
            filter: ''
        }
    },
    getters: {
        users: state => state.users
    },
    mutations: {
        setUsers(state, data) {
            state.users = data;
        },
        setOrder(state, order) {
            state.userParams.order = order;
            state.userParams.page = 1;
            this.dispatch('getUsers');
        },
        setPage(state, page) {
            state.userParams.page = page;
            this.dispatch('getUsers');

        },
        setFilter(state, filter) {
            state.userParams.filter = filter;
            state.userParams.page = 1;
            this.dispatch('getUsers');
        },
    },
    actions: {
        async getUsers({ commit, state }) {
            const { data } = await axios.get(
                "/admin/users/get-users", { params: state.userParams }
            );
            commit("setUsers", data);
            return data
        },
        async editUser({ dispatch }, sendData) {
            const data = await axios.post('/admin/users/edit-user/' + sendData.id, sendData.params)
            dispatch("getUsers");
            return data
        },
        async deleteUser({ dispatch }, id) {
            const data = await axios.post('/admin/users/delete-user/' + id);
            dispatch("getUsers");
            return data
        }
    }
}