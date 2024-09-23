<script setup lang="ts">
import {ref} from "vue";
import {Search} from '@element-plus/icons-vue'

const inputTxt = ref("")

const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }
]
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
      <el-table-column fixed prop="date" label="用户编号" width="150"/>
      <el-table-column prop="state" label="手机号码" width="120"/>
      <el-table-column prop="state" label="用户邮箱" width="120"/>
      <el-table-column prop="name" label="用户昵称" width="120"/>
      <el-table-column prop="city" label="性别" width="120"/>
      <el-table-column prop="address" label="积分" width="120"/>
      <el-table-column prop="address" label="信誉值" width="120"/>
      <el-table-column prop="address" label="账号所属地" width="180"/>
      <el-table-column prop="zip" label="最后上线所在地" width="180"/>
      <el-table-column prop="zip" label="最后上线时间" width="180"/>
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
        :pager-count="6"
        layout="prev, pager, next"
        :total="100"
    />
  </div>
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
</style>