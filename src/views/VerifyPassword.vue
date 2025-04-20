<template>
    <div>
        <el-row class="justify-center">
            <el-col :span="20" class="">
                <div class="flex justify-center my-5">
                    <img src="../../src/assets/images/homePage/letters.png" />
                </div>
                <div class="my-5">
                    <el-form status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="100px"
                        class="demo-ruleForm  w-full  text-4 flex items-center flex-col ">
                        <el-form-item label="Email" prop="email" autocomplete="off" class="w-1/3">
                            <el-input disabled v-model="email" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Code" prop="code" autocomplete="off" class="w-1/3">
                            <div class="flex">
                                <el-input v-model="code" autocomplete="off"></el-input>
                                <el-button :loading="loading"
                                    class="text-violet-500 w-1/2 text-5 bg-violet-100 p-4 mx-2"
                                    @click="verify(code)">Verify</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    data() {
        return {
            code: '',
            loading: false
        }
    },
    computed: {
        ...mapState('forgetPassword', ['email'])
    },
    methods: {
        ...mapActions('forgetPassword', ['verifyEmail']),
        verify(code) {
            this.loading = true;
            this.verifyEmail(code).then(() => {
                this.$toast.show('Email Sent Please check your Mail')
                this.$router.push('/ResetPassword')

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
