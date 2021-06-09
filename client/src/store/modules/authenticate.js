import appAPI from "../../api/app";

export const state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('access_token') || null,
}

export const getters = {
    isAuthenticated: state => !!state.token,
    user: (state) => state.user,
    token: (state) => state.token
}

export const actions = {
    login({commit}, user) {
        return new Promise((resolve,reject) => {
            appAPI.post('/login', {
                email: user.email,
                password: user.password
            }).then(response => {
                const userData = response.data.user;
                const token = userData.token;
        
                commit('SET_TOKEN', token);
                commit('SET_USER', user);

                resolve(response);
            }).catch(response => {                
                reject(response);
            })
        })
    },
    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            appAPI.post('/register', {
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: user.birthDate,
                userName: user.userName,
                email: user.email,
                password: user.password
            }).then(function (response) {

                commit('SET_USER', user);
                resolve(response);
            }).catch(function (error) {
                reject(error);
            })
        });
    },
    logout: ({ commit }) => {
        return new Promise((resolve) => {
            commit('DELETE_TOKEN');
            commit('DELETE_USER');
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');

            delete appAPI.defaults.headers.common['Authorization'];
            resolve();
        })
    }
}

export const mutations = {
    SET_USER (state, user) {
        state.user = user;
    },
    SET_TOKEN (state, token) {
        state.token = token
    },
    DELETE_TOKEN (state) {
        state.token = null
    },
    DELETE_USER (state) {
        state.user = null
    },
}
