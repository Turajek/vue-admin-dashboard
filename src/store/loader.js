
export default {
    state: {
        loader: false
    },
    getters: {
        loader: state => state.loader
    },
    mutations: {
        setLoader(state, data) {
            if (!data) {
                state.loader = false
            } else {
                state.loader = true;

            }
        }
    }
}