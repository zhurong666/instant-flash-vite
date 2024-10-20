<script setup lang="ts">
import {reactive, ref} from "vue";
import {Search} from '@element-plus/icons-vue'
import router from "@/router";
import {searchApi} from "@/api/event";
import {SearchResponseData} from "@/api/login/types/search.ts";

const inputTxt = ref("")

const tableData = reactive<SearchResponseData[]>([])
const centerDialogVisible = ref(false)
const searchType = ref(1)

const options = [
  {
    value: 1,
    label: '用户Id',
  },
  {
    value: 2,
    label: '手机号码',
  },
  {
    value: 3,
    label: '邮箱地址',
  },
  {
    value: 4,
    label: '身份证号',
  }
]

const handleClick = (index) => {
  router.push({
    path: `/user/detail/${tableData.at(index).id}`,
  })
}

const searchEnter = async (text) => {
  let url = "/admin/user"
  switch (searchType.value) {
    case 1:
      url += ""
      break
    case 2:
      url += "/phone"
      break
    case 3:
      url += "/email"
      break
    case 4:
      url += "/idCard"
      break
  }
  url += "/" + text
  const resp = await searchApi(url)
  if (resp.code == 200) {
    tableData.splice(0)
    const data = resp.data
    console.log(data)
    tableData.push(data)
  }
}

</script>

<template>
  <div class="input-container">
    <el-select
        v-model="searchType"
        placeholder="Select"
        size="large"
        style="width: 120px"
    >
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <el-input
        v-model="inputTxt"
        size="large"
        :prefix-icon="Search"
        @change="searchEnter"
        clearable
        placeholder="请输入要查找的用户">
    </el-input>
  </div>

  <div class="table-container">
    <el-table
        :data="tableData"
        size="large"
        style="width: 100%">
      <el-table-column fixed prop="id" label="用户编号" width="150"/>
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
        <template #default="scope">
          <el-button link type="primary" size="small"
                     @click="handleClick(scope.$index)">详情
          </el-button>
          <el-button link type="primary" size="small"
                     @click="centerDialogVisible=true">编辑
          </el-button>
          <el-button link type="primary" size="small"
                     @click="centerDialogVisible=true">禁言
          </el-button>
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