import axios from "axios";

const keypair = require('keypair');
const sha512 = require('sha512')
const jwt = require('jwt-simple');

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
            // Generate RSA public and private key        
            const pair = keypair();                           

            // Hash master password with has SHA512
            const hash = sha512(user.password)        

            // Generate HS256 token with public key
            const token = jwt.encode({public_key: pair.public}, hash)        

            axios.post('http://truyou.the-circle.designone.nl/register-public-key', {
                email: user.email,
                secret_public_key: token
            }).then(response => {                
                console.log(response.data);    
            
                resolve(response);
            }).catch(response => {                
                reject(response);
            })
        })
    },
}

export const mutations = {
    SET_USER (state, user) {
        state.user = user;
    }
}
