import { createStore } from 'vuex';

export default createStore({
    state: {
        user:{},
        notifications: []
    },
    actions: {
        fetchNotifications({ commit, state }) {
            return new Promise((resolve, reject) => {
                fetch(`http://localhost:8080/carpool-be/api/notification/${state.user.id}`, {
                    method: 'GET',    
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    commit('setNotifications', data)
                    resolve()
                    // displayedNotifications.value = true
                    // console.log(data)
                })
                .catch((error) => { reject(error) })
            })
            
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setNotifications(state, payload) {
            const unAnsweredNotifications = []
            for (let i = 0; i < payload.length; i += 1) {
                const currentNotification = payload[i]
                if (!currentNotification.answered) {
                    unAnsweredNotifications.push(currentNotification)
                }
            }
            state.notifications = unAnsweredNotifications
        },
        removeNotification(state, payload) {
            state.notifications = state.notifications.filter((notification) => notification.id !== payload.id)
        }
    },
    getters: {
        getUser: state => state.user,
        getNotifications: state => state.notifications,
        getNotificationsNumber: state => state.notifications.length,
        
    }
});
