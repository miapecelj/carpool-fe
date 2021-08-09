import { createStore } from 'vuex';

export default createStore({
    state: {
        user:{
            id:0,
            username:"",
            email:"",
            fullName:"",
            password:""
        }
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
