import appAPI from "../../api/app";

export const state = {
    username: localStorage.getItem('username') || null,
    public_key: localStorage.getItem('public_key') || null,
    private_key: localStorage.getItem('private_key') || null
};

export const getters = {
    username: (state) => state.username,
    public_key: (state) => state.public_key,
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
        state.public_key = user.public_key;
        state.private_key = user.private_key;

        localStorage.setItem('username', user.username);
        localStorage.setItem('public_key', user.public_key);
        localStorage.setItem('private_key', user.private_key);
    },
};
