import { createStore } from 'vuex';

export default createStore({
    state: {
        user:"user"
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
