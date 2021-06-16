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
            axios.post('http://truyou.the-circle.designone.nl/register-public-key', {
                email: user.email,
                secret_public_key: getToken(user.password)
            }).then(response => {                
                console.log(response.data);                    
                resolve(response);
            }).catch(response => {                
                reject(response);
            })
        })
    },
}


async function getToken(password) {
    // Generate RSA public and private key        
    const pair = await keypair();      
    console.log('1',pair)   

    // Hash master password with has SHA512
    const hash = await sha512(password)        
    console.log('2',hash)   

    // Generate HS256 token with public key
    const token = jwt.encode({public_key: pair.public}, hash)
    console.log('3', token)

    return token;
}

export const mutations = {
    SET_USER (state, user) {
        state.user = user;
    }
}
