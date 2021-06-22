import axios from "axios";
import store from '../store'

const appAPI = axios.create({ baseURL: '/api/' });

appAPI.interceptors.request.use(request => {
    const token = store.getters['authenticate/token'];
    if (token) {
        request.headers.common['Authorization'] = `Bearer ${token}`
    }
    return request;
});

appAPI.interceptors.response.use(response => response, error => {
    const {status} = error.response;
    if (status === 401 && store.getters['authenticate/token']) {
        store.dispatch('authenticate/logout')
            .then(() => {
                store.$app.$route.push({name: 'login'})
            });
    }
});

export default appAPI;
