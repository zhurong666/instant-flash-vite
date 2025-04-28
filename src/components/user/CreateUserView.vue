<template>
  <el-form :model="form" label-width="auto" class="custom-form">
    <el-form-item label="用户名称：">
      <el-input v-model="form.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="手机号码：">
      <el-input v-model="form.phone" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="用户邮箱：">
      <el-input v-model="form.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="密码：">
      <el-input v-model="form.password" type="password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item label="出生日期：">
      <el-col :span="11">
        <el-date-picker
          v-model="form.birthday"
          type="datetime"
          placeholder="请选择日期"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>

    <el-form-item label="性别：">
      <el-radio-group v-model="form.sex">
        <el-radio value="male">男</el-radio>
        <el-radio value="female">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="其他：">
      <el-input v-model="form.desc" type="textarea" placeholder="请输入备注信息" />
    </el-form-item>

    <div class="form-actions">
      <el-button type="primary" @click="onSubmit" class="submit-btn">创建</el-button>
      <el-button @click="onReset" class="reset-btn">重置</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

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

const onReset = () => {
  Object.assign(form, {
    username: '',
    password: '',
    phone: '',
    email: '',
    birthday: '',
    sex: '',
    desc: '',
  })
}
</script>

<style scoped>
.custom-form {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-form .el-form-item__label {
  font-size: 16px;
  color: #333;
}

.custom-form .el-input,
.custom-form .el-textarea {
  font-size: 16px;
}

.custom-form .el-input__inner,
.custom-form .el-textarea__inner {
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  transition: border-color 0.3s ease;
}

.custom-form .el-input__inner:focus,
.custom-form .el-textarea__inner:focus {
  border-color: #409eff;
}

.form-actions {
  text-align: center;
  margin-top: 20px;
}

.submit-btn {
  background-color: #409eff;
  border-color: #409eff;
  border-radius: 5px;
  font-size: 16px;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.reset-btn {
  background-color: #f5f7fa;
  border-color: #dcdfe6;
  border-radius: 5px;
  font-size: 16px;
  padding: 10px 20px;
  color: #606266;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reset-btn:hover {
  background-color: #ebedf0;
  border-color: #c0c4cc;
}
</style>