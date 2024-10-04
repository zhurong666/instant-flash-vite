<script setup lang="ts">
import {ref} from "vue";
import {Search} from '@element-plus/icons-vue'
import router from "@/router";

const inputTxt = ref("")

const handleClick = (userId) => {
  router.push({
    path:`/user/detail/${1}`,
  })
}

const tableData = [
  {
    userId: '1001',
    phone: '110',
    email: '27@gmail.com',
    city: 'Los Angeles',
    username: '小宋',
    gender: '男',
    integral: '0',
    reputation: '99',
    address: '四川省成都市温江区',
    lastAddress: '四川省成都市温江区',
    lastTime: '2024-10-02 09:00:00',
    reputation: '99',
  }
]

const centerDialogVisible = ref(true)
</script>

<template>
  <div class="input-container">
    <el-input
        v-model="inputTxt"
        size="large"
        :prefix-icon="Search"
        clearable
        placeholder="请输入要查找的用户">
    </el-input>
  </div>

  <div class="table-container">
    <el-table
        :data="tableData"
        size="large"
        style="width: 100%">
      <el-table-column fixed prop="userId" label="用户编号" width="150"/>
      <el-table-column prop="phone" label="手机号码" width="150"/>
      <el-table-column prop="email" label="用户邮箱" width="180"/>
      <el-table-column prop="username" label="用户昵称" width="120"/>
      <el-table-column prop="gender" label="性别" width="120"/>
      <el-table-column prop="integral" label="积分" width="120"/>
      <el-table-column prop="reputation" label="信誉值" width="120"/>
      <el-table-column prop="address" label="账号所属地" width="220"/>
      <el-table-column prop="lastAddress" label="最后上线所在地" width="220"/>
      <el-table-column prop="lastTime" label="最后上线时间" width="180"/>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small"
                     @click="handleClick">详情</el-button>
          <el-button link type="primary" size="small">编辑</el-button>
          <el-button link type="primary" size="small">禁言</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page-container">
    <el-pagination
        :page-size="10"
        :pager-count="7"
        layout="prev, pager, next"
        :total="100"
    />
  </div>

  <el-dialog
      v-model="centerDialogVisible"
      title="修改用户信息"
      width="500"
      align-center
  >
    <span>你正在查看某个用户的信息</span>
    <template #footer>
      <div class="dialog-content">
        <div>
          <el-text class="mx-1">用户名称：</el-text>
          <el-text class="mx-1">张中阳</el-text>
        </div>
        <div>
          <el-text class="mx-1">用户名称：</el-text>
          <el-text class="mx-1">张中阳</el-text>
        </div>
        <div>
          <el-text class="mx-1">用户名称：</el-text>
          <el-text class="mx-1">张中阳</el-text>
        </div>
        <div>
          <el-text class="mx-1">用户名称：</el-text>
          <el-text class="mx-1">张中阳</el-text>
        </div>
        <div>
          <el-text class="mx-1">用户名称：</el-text>
          <el-text class="mx-1">张中阳</el-text>
        </div>
        <div>
          <el-text class="mx-1">用户名称：</el-text>
          <el-text class="mx-1">张中阳</el-text>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-input {
  width: 360px;
}

.input-container {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
}

.table-container {
  margin-bottom: 20px;
}

.page-container {
  width: 100%;
  display: flex;
  justify-content: end;
}

.dialog-content {
  width: 100%;
  display: flex;
  padding-left: 10%;
  align-items: start;
  flex-direction: column;
  margin-bottom: 20px;

  div {
    margin-bottom: 10px;
  }
}
</style>