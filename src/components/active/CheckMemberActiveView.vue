<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {getEventMemberById, getEventRole} from "@/api/event";
import {baseImgURL} from "@/utils/service";

const tableData = reactive([])
const {params} = useRoute()

onMounted(() => {
  loadData()
})

const paginationChange = (pageNum: number, pageSize: number) => {
  loadData(pageNum, pageSize)
}
const handleClick = (id: number) => {

}

let juese = {}
const loadData = async (pageNum = 1, pageSize = 10) => {
  const eventId = params.id
  juese = (await getEventRole()).data
  const {data} = await getEventMemberById(eventId)
  data.forEach(item => {
    item.avatar = baseImgURL + item.avatar
    item.role = juese[item.role]
  })
  tableData.splice(0)
  tableData.push(...data)
}
</script>

<template>
  <div class="table-container">
    <el-table
        border
        :data="tableData"
        row-key="id"
        size="large"
        style="width: 100%">
      <el-table-column align="center"  fixed prop="id" label="用户编号" width="150"/>
      <el-table-column align="center"  prop="username" label="用户昵称" width="150"/>
      <el-table-column align="center"  prop="role" label="活动角色" width="150"/>
      <el-table-column align="center"  label="用户头像" width="150">
        <template #default="scope">
          <el-image preview-teleported :src="scope.row.avatar"/>
        </template>
      </el-table-column>
      <el-table-column align="center"  fixed="right" label="操作" min-width="160">
        <template #default="scope">
          <el-button link type="primary" size="small"
                     @click="handleClick(scope.row.id)">详情
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
</template>

<style scoped lang="less">

</style>