
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
                setTimeout(() => { state.loader = false }, 150)
            } else {
                state.loader = true;

            }
        }
    }
}