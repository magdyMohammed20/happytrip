<template>
    <div class="bg-violet-50 rounded-3"  >
        <h3 class="font-thin p-3 mt-0 bg-violet-100 custom-border">Change Password</h3>
        <div class="lg:md:w-1/2 sm:w-11/12">
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-position="top"
                label-width="100px" class="demo-loginForm login-form w-full px-3 pt-3 text-4">
                <el-form-item label="" prop="password" autocomplete="off">
                    <el-input v-model="form.old_password" placeholder="Old Password" class="borderBotOnly py-3" />
                </el-form-item>
                <el-form-item label="" prop="password" autocomplete="off">
                    <el-input v-model="form.new_password" placeholder="New Password" class="borderBotOnly py-3" />
                </el-form-item>
                <el-form-item label="" prop="password" autocomplete="off">
                    <el-input v-model="form.confirm_password" placeholder="Confirm New Password" class="borderBotOnly py-3" />
                </el-form-item>
            </el-form>
        </div>
        <el-button @click="change(form)" size="large" :loading="loading"
            class="bg-#1CCF3D my-10 text-white mx-3 font-bold shadow-xl px-15 w-1/2">
            Change Password</el-button>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            form: {},
            loading: false,
            rules: {
                password: [
                    { required: true, message: 'this input is required', trigger: ['blur', 'change'] },
                ],
            }
        }
    },
    methods: {
        ...mapActions('userAccount', ['changePassword']),
        change(form) {
            this.loading = true;
            this.changePassword(form).then(() => {
                this.$toast.show('password changed')
            }).catch(e => {
                for (const error in e.response.data.errors) {
                    this.$toast.error('Error in the ' + error + ' as ' + e.response.data.errors[error])
                }
                this.$toast.error(e.response.data.message)
            }).finally(() => this.loading = false)
        }
    }
}
</script>