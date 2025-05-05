<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import router from "@/router";
import {SearchResponseData} from "@/api/login/types/search.ts";
import {fbg, fbgu} from "@/api/user";


const tableData = reactive<SearchResponseData[]>([])
const centerDialogVisible = ref(false)
const searchType = ref(0)
const fdTxt = ref('')

const options = [
  {
    id: 0,
    label: "未解决",
    value: 0
  },
  {
    id: 1,
    label: "解决中",
    value: 1
  },
  {
    id: 2,
    label: "已解决",
    value: 2
  },
]

const submit = (event) => {
  if (fdTxt.value === "") {
    return
  }
  fbgu(tableData[currentId].id, {
    answer: fdTxt.value,
    status: 2
  }).then(response => {
    if (response.code == 200) {
      alert("已答复")
      tableData[currentId] = {
        ...tableData[currentId],
        answer: fdTxt.value,
        status: 2
      }
    } else {
      alert("答复失败")
    }
  })
}
const editClick = (index) => {
  router.push({
    path: `/user/edit/${tableData.at(index).id}`,
  })
}
let currentId;
const answerClick = async (index) => {
  centerDialogVisible.value = true
  currentId = index
}


const paginationChange = (pageNum: number, pageSize: number) => {
  getData(pageNum)
}

onMounted(() => {
  getData()
})

function getData(pageNum = 0, pageSize = 10) {
  fbg({pageNum, pageSize}, searchType.value).then(resp => {
    if (resp.code == 200) {
      tableData.splice(0)
      resp.data.forEach(item => {
        const jData = JSON.parse(item.question)
        item.question = `问题：${jData.content}\n , 联系方式：${jData.contact}\n`
        item.status = computedStatus(item.status)
      })
      tableData.push(...resp.data)
    }
  })
}

function onSearch(value:number){
  getData()
}

function computedStatus(status) {
  switch (status) {
    case 0:
      return "待处理"
    case 1:
      return "处理中"
    case 2:
      return "已处理"
    default:
      return "异常"
  }
}
</script>

<template>
  <div class="input-container">
    <el-select
        v-model="searchType"
        placeholder="Select"
        size="large"
        @change="onSearch"
        style="width: 120px"
    >
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </div>

  <div class="table-container">
    <el-table
        border
        :data="tableData"
        size="large"
        style="width: 100%">
      <el-table-column align="center" fixed prop="id" label="反馈编号" width="120"/>
      <el-table-column align="center" fixed prop="userId" label="用户Id" width="120"/>
      <el-table-column align="center" prop="question" label="问题描述" width="340"/>
      <el-table-column align="center" prop="answer" label="答复" width="340"/>
      <el-table-column align="center" prop="status" label="状态" width="120"/>
      <el-table-column align="center" prop="updateTime" label="更新时间" width="180"/>
      <el-table-column align="center" prop="createTime" label="创建时间" width="180"/>
      <el-table-column align="center" fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small"
                     @click="editClick(scope.$index)">编辑
          </el-button>
          <el-button link type="primary" size="small"
                     @click="answerClick(scope.$index)">答复
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
      title="答复内容"
      width="500"
      align-center
  >
    <template #footer>
      <div class="dialog-content">
        <el-input v-model="fdTxt"/>
      </div>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">
          提交
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