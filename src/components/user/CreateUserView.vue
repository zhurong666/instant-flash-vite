<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="用户名称：">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="手机号码：">
      <el-input v-model="form.phone" />
    </el-form-item>
    <el-form-item label="用户邮箱：">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="用户名称：">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item label="出生日期：">
      <el-col :span="11">
        <el-date-picker
            v-model="form.birthday"
            type="datetime"
            placeholder="Pick a date"
            style="width: 100%"
        />
      </el-col>
    </el-form-item>

    <el-form-item label="性别：">
      <el-radio-group v-model="form.sex">
        <el-radio value="Sponsor">男</el-radio>
        <el-radio value="Venue">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="其他：">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>

    <div style="text-align:center">
      <el-button type="primary" @click="onSubmit">创建</el-button>
      <el-button>重置</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
  phone: '',
  email: '',
  birthday: '',
  sex: '',
  desc: '',
})

const onSubmit = () => {
  console.log(form)
}
</script>


<style scoped>

</style>