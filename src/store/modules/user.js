import appAPI from "../../api/app";

export const state = {
    username: localStorage.getItem('username') || null,
    private_key: localStorage.getItem('private_key') || null
};

export const getters = {
    username: (state) => state.username,
    private_key: (state) => state.private_key,
};

export const actions = {
    connect({ commit }, user) {
        commit('SET_USER', user);
    },
};

export const mutations = {
    SET_USER (state, user) {
        state.username = user.username;
        state.private_key = user.private_key;

        localStorage.setItem('username', user.username);
        localStorage.setItem('private_key', user.private_key);
    },
};
