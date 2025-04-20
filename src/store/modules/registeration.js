import axios from '@/plugins/axios'


// initial state
const state = {
    userPages: {
        account: true,
        bookings: false,
        changePassword: false,
        logout: false
    }
}
// mutations
const mutations = {
    SET_USER_PAGE(state, page) {
        state.userPages = page;
    }
}
// actions
const actions = {
    registerUser({ commit }, registerForm) {
        let payload = new FormData()
        for (const property in registerForm) {
            if (!registerForm.hasOwnProperty(property) || registerForm[property] == null) {
                continue;
            }
            if (Array.isArray(registerForm[property]) && registerForm[property].length > 0) {
                for (const iterator of registerForm[property]) {
                    payload.append(property + "[]", iterator);
                }
            } else {
                payload.append(property, registerForm[property]);
            }
        }
        return axios.post('/api/auth/register', payload).then(res => {
            if (res.data.token) {
                localStorage.removeItem("token")
                localStorage.setItem("token", 'Bearer ' + (res.data.token))
            }
        })
    },
    socialSignUp({ }, socialData) {
        return axios.post('/api/auth/socialRegister', socialData).then(res => {
            if (res.data.token) {
                localStorage.removeItem("token")
                localStorage.setItem("token", 'Bearer ' + (res.data.token))
            }
            return res;
        })
    }
}

export default {
    namespaced: true,
    name: 'registeration',
    state,
    actions,
    mutations
}
