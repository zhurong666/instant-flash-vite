<script setup lang="ts">
import {reactive, ref} from "vue";
import {Search} from '@element-plus/icons-vue'
import {searchApi} from "@/api/event";

const searchType = ref(1)
const options = [
  {
    value: 1,
    label: '活动Id',
    disabled: false
  },
  {
    value: 2,
    label: '用户Id',
    disabled: true
  }
]
const inputTxt = ref("")

const centerDialogVisible = ref(false)

const tableData = reactive([])

const handleClick = () => {

}
const edit = () => {

}

const deny = () => {

}
const searchEnter = async (text) => {
  let url = "/admin/event/searchByEventId"
  switch (searchType.value) {
    case 1:
      url += `/${text}`
      break
    case 2:
      url += "???"
      break
  }
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
          :disabled="item.disabled"
      />
    </el-select>
    <el-input
        v-model="inputTxt"
        size="large"
        :prefix-icon="Search"
        @change="searchEnter"
        clearable
        placeholder="请输入要查找的活动">
    </el-input>
  </div>

  <div class="table-container">
    <el-table
        :data="tableData"
        size="large"
        style="width: 100%">
      <el-table-column fixed prop="id" label="活动编号" width="150"/>
      <el-table-column prop="userId" label="用户编号" width="150"/>
      <el-table-column prop="name" label="活动名称" width="120"/>
      <el-table-column label="宣传图片" width="150">
        <template #default="scope">
          <el-image preview-teleported :src="scope.row.imageUrls"/>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="活动类型" width="120"/>
      <el-table-column prop="targetGroupId" label="目标用户群体" width="120"/>
      <el-table-column prop="address" label="活动地点" width="220"/>
      <el-table-column prop="regStartTime" label="报名开始时间" width="180"/>
      <el-table-column prop="regEndTime" label="报名结束时间" width="180"/>
      <el-table-column prop="startTime" label="活动开始时间" width="180"/>
      <el-table-column prop="endTime" label="活动结束时间" width="180"/>
      <el-table-column prop="maxParticipant" label="最多人数" width="180"/>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small"
                     @click="handleClick(scope.$index)">详情
          </el-button>
          <el-button link type="primary" size="small" @click="edit(scope.$index)">修改</el-button>
          <el-button link type="primary" size="small" @click="deny(scope.$index)">打回</el-button>
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
</style>