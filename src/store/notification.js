export default {
    state: {
        showNotification: false,
        notificationData: {
            msg: '',
            type: ''
        }
    },
    getters: {
        showNotification: state => state.showNotification,
        notificationData: state => state.notificationData
    },
    mutations: {
        setShowNotification(state, data) {
            state.showNotification = data;
        },
        setNotificationData(state, data) {
            state.notificationData = data;
            state.showNotification = true;
        },
    }
}