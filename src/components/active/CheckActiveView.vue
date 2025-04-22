<script setup lang="ts">
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import router from "@/router";
import {request} from "@/utils/service.ts";

const handleClick = (index) => {
  router.push({
    path: `/active/detail/${index}`,
  })
}

const tableData = reactive([])

const centerDialogVisible = ref(false)

onMounted(() => {
  loadData()
})

const loadData = async (pageNum = 1, pageSize = 10) => {
  const data = await request({
    method: 'GET',
    url: "admin/event/getWillReviewEvent",
    params: {
      pageNum,
      pageSize,
    }
  })
  data.data.forEach(item => {
    item.address = item.address ? JSON.parse(item.address).ext_path : ""
  })
  tableData.splice(0)
  tableData.push(...data.data)
}

async function commit() {
  const eventId = that.id
  try {
    const data = await request({
      url: 'admin/event/' + eventId + "/review",
      method: 'POST',
      headers: {
        toEventId: eventId
      },
      params: {
        isApproved: that.isApproved,
        reason: msg.value
      }
    })
    if (data.code == 200) {
      tableData.splice(that.index, 1)
    }
  } catch (err) {
    //
  } finally {
    showCommit.value = false
  }
}

// 获取当前组件实例的方法
const that = getCurrentInstance()
const showCommitM = (index:number,id: number, isApproved: boolean) => {
  that.index = index
  that.id = id
  that.isApproved = isApproved
  showCommit.value = true
}
const showCommit = ref(false)
const msg = ref('')

const paginationChange = (pageNum: number, pageSize: number) => {
  loadData(pageNum, pageSize)
}
</script>

<template>


  <div class="table-container">
    <el-table
        :data="tableData"
        row-key="id"
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
                     @click="handleClick(scope.row.id)">详情
          </el-button>
          <el-button link type="primary" size="small" @click="showCommitM(scope.$index,scope.row.id,true)">通过</el-button>
          <el-button link type="primary" size="small" @click="showCommitM(scope.$index,scope.row.id,false)">打回</el-button>
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

  <el-dialog
      v-model="showCommit"
      title="Tips"
      width="500"
      center
  >
    <el-form-item label="记录日志：">
      <el-input v-model="msg"/>
    </el-form-item>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showCommit = false">取消</el-button>
        <el-button type="primary" @click="commit">
          确认
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