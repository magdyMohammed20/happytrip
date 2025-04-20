import axios from '@/plugins/axios'
// initial state
const state = {
    email: '',
    token: ''
}
// mutations
const mutations = {
    SET_EMAIL(state, email) {
        state.email = email;
    }
}
// actions
const actions = {
    sendEmail({ }, email) {
        if (email) {
            return axios.post(`/api/auth/password-forgot?email=${email}`).then(() => {
                localStorage.setItem('email', email)
            })
        }
    },
    verifyEmail({ state }, code) {
        return axios.post(`/api/auth/verify/${code}/${state.email}`).then((res) => {
            console.log("RES", res.data.token);
            localStorage.setItem('resetToken', res.data.token)
        })
    },
    ResetPassword({ state }, form) {
        let payload = new FormData()
        for (const property in form) {
            if (!form.hasOwnProperty(property) || form[property] == null) {
                continue;
            }
            if (Array.isArray(form[property]) && form[property].length > 0) {
                for (const iterator of form[property]) {
                    payload.append(property + "[]", iterator);
                }
            } else {
                payload.append(property, form[property]);
            }
        }
        payload.append('token', localStorage.getItem('resetToken'));
        payload.append('email', localStorage.getItem('email'));
        return axios.post(`api/auth/reset-password`, payload)
    }

}

export default {
    namespaced: true,
    name: 'forgetPassword',
    state,
    actions,
    mutations
}
