import appAPI from "../../api/app";
import axios from 'axios';

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
            axios.get(`/streams/${ id }`)
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
            axios.get(process.env.STREAMAPI_URL || 'http://localhost:80/api/streams')
                .then((response) => {
                    resolve(response.data);
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