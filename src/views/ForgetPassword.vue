<template>
    <div>
        <el-row class="justify-center">
            <el-col :span="20" class="">
                <div class="flex justify-center my-5">
                    <img src="../../src/assets/images/homePage/letters.png" />
                </div>
                <div class="my-5">
                    <el-form status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="100px"
                        class="demo-ruleForm  w-full  text-4 flex justify-center ">
                        <el-form-item label="Email" prop="email" autocomplete="off" class="w-1/3">
                            <el-input v-model="email" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-button :loading="loading" class="text-violet-500 text-5 bg-violet-100 p-4 mx-2"
                            @click="send(email); SET_EMAIL(email)">send</el-button>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
export default {
    data() {
        return {
            email: '',
            loading: false
        }
    },
    methods: {
        ...mapActions('forgetPassword', ['sendEmail']),
        ...mapMutations('forgetPassword', ['SET_EMAIL']),
        send(email) {
            this.loading = true;
            this.sendEmail(email).then(() => {
                this.$toast.show('Email Sent Please check your Mail')
            }).then(() => this.$router.push('/verifyPassword')).catch(e => {
                for (const error in e.response.data.errors) {
                    this.$toast.error('Error in the ' + error + ' as ' + e.response.data.errors[error])
                }
            }).finally(() => this.loading = false)
        }
    }
}
</script>