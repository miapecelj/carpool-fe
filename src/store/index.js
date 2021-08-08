import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user:"user"
    },
    mutations: {
        setUser(state,payload) {
            state.user = payload;
        }
    },
    actions: {},
    modules: {},
    getters: {
        getUser: state => state.user
    }
});