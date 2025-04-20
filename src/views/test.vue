<template>
  <div class="mt-4">
    <FormWrapper v-slot="{ handleSubmit }" ref="form">
      <el-form>
        <FormGroup
          rules="required|email"
          name="email"
          errorName="email"
          label="Email"
        >
          <template #default="{ field }">
            <el-input v-model="value" v-bind="field" />
          </template>
        </FormGroup>
        <form-group
          rules="required|email"
          name="email"
          errorName="email"
          label="Email"
        >
          <template #default="{ field }">
            <el-input v-model="value" v-bind="field" />
          </template>
        </form-group>
        <el-button type="primary" @click="handleSubmit(submitForm)"
          >Create Test</el-button
        >
      </el-form>
    </FormWrapper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      field: "",
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          alert("Submitted!");
        }
      });
    },
  },
};
</script>
