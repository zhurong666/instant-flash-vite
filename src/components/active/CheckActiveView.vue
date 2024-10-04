<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";

const handleClick = (userId) => {
  router.push({
    path:`/user/detail/${1}`,
  })
}

const tableData = [
  {
    eventId: '10001',
    userId: '002',
    userInfo: {
      username:"张中央"
    },
    name: '打网球',
    category: '体育',
    targetGroupId: '大学生',
    regStartTime: '2024-10-01 09:30:00',
    regEndTime: '2024-10-01 09:50:00',
    startTime: '2024-10-02 09:30:00',
    endTime: '2024-10-02 19:30:00',
    maxParticipant: '100',
    address: '成都师范第一操场',
    imageUrls:"xxx.jpg"
  },
  {
    eventId: '10002',
    userId: '001',
    userInfo: {
      username:"张中央"
    },
    name: '打网球',
    category: '体育',
    targetGroupId: '大学生',
    regStartTime: '2024-10-01 09:30:00',
    regEndTime: '2024-10-01 09:50:00',
    startTime: '2024-10-02 09:30:00',
    endTime: '2024-10-02 19:30:00',
    maxParticipant: '100',
    address: '成都师范第一操场',
    imageUrls:"xxx.jpg"
  }
]

const centerDialogVisible = ref(true)
</script>

<template>


  <div class="table-container">
    <el-table
        :data="tableData"
        size="large"
        style="width: 100%">
      <el-table-column fixed prop="eventId" label="活动编号" width="150"/>
      <el-table-column prop="userId" label="用户编号" width="150"/>
      <el-table-column prop="name" label="活动名称" width="120"/>
      <el-table-column prop="imageUrls" label="宣传图片" width="150"/>
      <el-table-column prop="category" label="活动类型" width="120"/>
      <el-table-column prop="targetGroupId" label="目标用户群体" width="120"/>
      <el-table-column prop="address" label="活动地点" width="220"/>
      <el-table-column prop="regStartTime" label="报名开始时间" width="180"/>
      <el-table-column prop="regEndTime" label="报名结束时间" width="180"/>
      <el-table-column prop="startTime" label="活动开始时间" width="180"/>
      <el-table-column prop="endTime" label="活动结束时间" width="180"/>
      <el-table-column prop="maxParticipant" label="最多人数" width="180"/>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small"
                     @click="handleClick">详情</el-button>
          <el-button link type="primary" size="small">通过</el-button>
          <el-button link type="primary" size="small">打回</el-button>
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