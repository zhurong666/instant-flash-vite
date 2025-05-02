<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {Search} from '@element-plus/icons-vue'
import router from "@/router";
import {searchApi} from "@/api/event";
import {SearchResponseData} from "@/api/login/types/search.ts";
import {getUserByAdminCityId, updateUserStatus} from "@/api/user";
import {tLog} from "@/utils/tip";
import {useUserStore} from "@/store/modules/user";
import {baseImgURL} from "@/utils/service";

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
const editClick = (index) => {
  router.push({
    path: `/user/edit/${tableData.at(index).id}`,
  })
}
const denyClick = async (index) => {
  const user = tableData.at(index);
  const userId = user.id
  const statusId = user.statusId
  const data = await updateUserStatus({userId, status: statusId === 1 ? 0 : 1})
  tLog(data,()=>{
    tableData.at(index).statusId = statusId === 1 ? 0 : 1
  })
}

const searchEnter = async (text) => {
  if (text.trim().length < 1) {
    getData()
    return
  }
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
    data.avatar = baseImgURL + data.avatar
    tableData.splice(0)
    tableData.push(data)
  }
}
const userStore = useUserStore()

const paginationChange = (pageNum: number, pageSize: number) => {
  getData({pageNum})
}

onMounted(()=>{
  getData()
})
function getData(pageNum = 0, pageSize = 10) {
  getUserByAdminCityId({pageNum, pageSize}).then(resp=>{
    if (resp.code == 200) {
      tableData.splice(0)
      const user = userStore.getCacheUserInfo()
      const data = resp.data.filter(item=>{
        return item.id !== user.id //忽略自己
      })
      data.forEach(item => {
        item.avatar = baseImgURL + item.avatar
      })
      tableData.push(...data)
    }
  })
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
        border
        :data="tableData"
        size="large"
        style="width: 100%">
      <el-table-column align="center"  fixed prop="id" label="用户编号" width="150"/>
      <el-table-column align="center"  prop="username" label="用户昵称" width="120"/>
      <el-table-column align="center"  label="用户头像" width="150">
        <template #default="scope">
          <el-image preview-teleported :src="scope.row.avatar"/>
        </template>
      </el-table-column>
      <el-table-column align="center"  prop="phone" label="手机号码" width="150"/>
      <el-table-column align="center"  prop="email" label="用户邮箱" width="180"/>
      <el-table-column align="center"  prop="gender" label="性别" width="120">
        <template #default="scope">
          {{!scope.row.gender?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column align="center"  prop="worth.credit" label="积分" width="120"/>
      <el-table-column align="center"  prop="worth.reputation" label="信誉值" width="120"/>
      <el-table-column align="center"  prop="userDetail.lastIp" label="最后上线所在地" width="220">
        <template #default="scope">
          {{scope.row.userDetail.lastIp || '短期未登录'}}
        </template>
      </el-table-column>
      <el-table-column align="center"  prop="userDetail.lastTime" label="最后上线时间" width="180">
        <template #default="scope">
          {{scope.row.userDetail.lastTime || '短期未登录'}}
        </template>
      </el-table-column>
      <el-table-column align="center"  fixed="right" label="操作" min-width="160">
        <template #default="scope">
          <el-button link type="primary" size="small"
                     @click="handleClick(scope.$index)">详情
          </el-button>
          <el-button link type="primary" size="small"
                     @click="editClick(scope.$index)">编辑
          </el-button>
          <el-button link type="primary" size="small"
                     @click="denyClick(scope.$index)">{{ scope.row.statusId == 1 ? '禁言' : '解封' }}
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
        @change="paginationChange"
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
.el-image {
  width: 60%;
  height: 60%;
  border-radius: 50%;
}
</style>