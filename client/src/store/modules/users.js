import appAPI from "../../api/app";

export const state = {
    list: [],
    single: {}
};

export const getters = {
    list: (state) => state.list,
    single: (state) => state.single,
};

export const actions = {
    fetchSingle({ commit }, id) {
        return new Promise((resolve,reject) => {
            appAPI.get(`/users/${ id }`)
                .then((response) => {
                    commit('SET_SINGLE', response.data);
                    resolve();
                }).catch(() => {
                reject();
            })
        });
    },
    fetchList({ commit }) {
        return new Promise((resolve,reject) => {
            appAPI.get('/users')
                .then((response) => {
                    commit('SET_LIST', response.data);
                    resolve();
                }).catch(() => {
                reject();
            })
        });
    },
};

export const mutations = {
    SET_LIST (state, list) {
        state.list = list
    },
};