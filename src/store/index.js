import { createStore } from 'vuex';

export default createStore({
    state: {
        user:{}
    },
    mutations: {
        setUser(state,payload) {
            state.user = payload;
        }
    },
    getters: {
        getUser: state => state.user
    }
});
