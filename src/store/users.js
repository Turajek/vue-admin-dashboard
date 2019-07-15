import axios from 'axios';

export default {
    state: {
        users: [],
        userParams: {
            limit: 5,
            page: 1,
            order: 4,
            role_id: null,
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
        setUserRole(state, data) {
            state.userParams.role_id = data;
            this.dispatch('getUsers');

        },
        setUserOrder(state, order) {
            state.userParams.order = order;
            state.userParams.page = 1;
            this.dispatch('getUsers');
        },
        setUserPage(state, page) {
            state.userParams.page = page;
            this.dispatch('getUsers');

        },
        setUserFilter(state, filter) {
            state.userParams.filter = filter;
            state.userParams.page = 1;
            this.dispatch('getUsers');
        },
    },
    actions: {
        async getUsers({ commit, state }) {
            commit('setLoader', true);
            const { data } = await axios.get(
                "/admin/users/get-users", { params: state.userParams }
            );
            commit("setUsers", data);
            commit('setLoader', false);
            return data
        },
        async addUser({ commit, dispatch }, sendData) {
            commit('setLoader', true);
            const data = await axios.post('/admin/users/add-user/', sendData)
            dispatch("getUsers");
            commit('setLoader', false);
            return data
        },
        async editUser({ commit, dispatch }, sendData) {
            commit('setLoader', true);
            const data = await axios.post('/admin/users/edit-user/' + sendData.id, sendData.params)
            dispatch("getUsers");
            commit('setLoader', false);
            return data
        },
        async deleteUser({ commit, dispatch }, id) {
            commit('setLoader', true);
            const data = await axios.post('/admin/users/delete-user/' + id);
            dispatch("getUsers");
            commit('setLoader', false);
            return data
        }
    }
}