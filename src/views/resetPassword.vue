<template>
    <el-row class="justify-center">
        <el-col :span="20" class="">
            <div class="flex justify-center my-5">
                <img src="../../src/assets/images/resetpassword.png" alt="resetpassword" class="w-1/5" />
            </div>
            <div class="my-5">
                <el-form status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="30%"
                    class="demo-ruleForm  w-full  text-4 flex items-center flex-col ">
                    <el-form-item label="Password" prop="password" autocomplete="off" class="w-1/2">
                        <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Confirm Password" prop="code" autocomplete="off" class="w-1/2">
                        <!-- <div class="flex"> -->
                        <el-input v-model="form.password_confirmation" autocomplete="off"></el-input>

                        <!-- </div> -->
                    </el-form-item>
                    <el-form-item prop="code" autocomplete="off" class="w-1/2">
                        <el-button :loading="loading" class="text-violet-500  text-5 bg-violet-100 p-5"
                            @click="reset(form)">Reset Password</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            loading: false,
            form: {},
        }
    },
    methods: {
        ...mapActions('forgetPassword', ['ResetPassword']),
        reset(form) {
            this.loading = true;
            this.ResetPassword(form).then(() => {
                this.$toast.show('you reset your password')
                this.$router.push('/login')
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