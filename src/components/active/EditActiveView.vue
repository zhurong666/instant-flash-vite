<script setup lang="ts">

import {onMounted, reactive, ref, watch} from "vue";
import {EditEvent, getEventById} from "@/api/event";
import {useRoute} from "vue-router";
import type {UploadUserFile} from "element-plus";
import {getCityByLatLng} from "@/api";

const {params} = useRoute()

const editEvent = reactive<EditEvent>({
  eventId: 1,
  userId: 1,
})

const placeholderEvent = ref({})

const value = ref("")

const statusOptions = [
  {
    value: 1,
    label: "正常",
    disabled: true,
  }
]
const fileList = ref<UploadUserFile[]>([])

const uploadObj1 = reactive([
  {
    id: 1,
    title: "",
    aboutUrl: "",
    imgUrl: ""
  }
])

watch(()=>placeholderEvent.value.latitude,async ()=>{
  // const {data:{data}} = await getCityByLatLng(placeholderEvent.value.latitude,placeholderEvent.value.longitude)
  const data = {
    address:"成都市"
  }
  console.log(data)
  placeholderEvent.value.location = data.address;
})

onMounted(() => {
  loadData()
})
const loadData = async () => {
  const data = await getEventById(params.id)
  console.log(data)
  placeholderEvent.value = data.data
  editEvent.regStartTime = data.data.regStartTime
  editEvent.regEndTime = data.data.regEndTime
  editEvent.startTime = data.data.startTime
  editEvent.endTime = data.data.endTime
}

const submit = ()=>{
  console.log(editEvent)
  let temp = {
    ...editEvent,
    regStartTime: editEvent.regStartTime == placeholderEvent.value.regStartTime ? null : editEvent.regStartTime,
    regEndTime: editEvent.regEndTime == placeholderEvent.value.regEndTime ? null : editEvent.regEndTime,
    startTime: editEvent.startTime == placeholderEvent.value.startTime ? null : editEvent.startTime,
    endTime: editEvent.endTime == placeholderEvent.value.endTime ? null : editEvent.endTime,
  }
  let keys = Object.keys(temp)
  keys.forEach(key => {
    if (temp[key] == null || temp[key] == "") {
      delete temp[key]
    }
  })
  console.log(temp)
}
</script>

<template>
  <div class="container">
    <div class="item">
      <span>活动Id</span>
      <span>{{ editEvent.eventId }}</span>
    </div>
    <div class="item">
      <span>创建用户ID</span>
      <input class="edit-input" type="text" name="username"
             :placeholder="placeholderEvent.userId"
             disabled
             v-model="editEvent.userId"/>
    </div>
    <div class="item">
      <span>活动名称</span>
      <input class="edit-input" type="text" name="name"
             :placeholder="placeholderEvent.name"
             v-model="editEvent.name">
    </div>
    <div class="item">
      <span>活动宣传图片</span>
      <img :src="placeholderEvent.imageUrls" alt="用户头像" class="avatar">
    </div>
    <div class="item">
      <span>活动类型</span>
      <input class="edit-input" type="text" name="category"
             :placeholder="placeholderEvent.category"
             v-model="editEvent.category">
    </div>
    <div class="item">
      <span>目标用户群体</span>
      <input class="edit-input" type="text" name="targetGroupId"
             :placeholder="placeholderEvent.targetGroupId"
             v-model="editEvent.targetGroupId">
    </div>
    <div class="item">
      <span>报名开始时间</span>
      <el-date-picker
          v-model="editEvent.regStartTime"
          type="date"
          placeholder="Pick a day"
          size="default"
      />
    </div>
    <div class="item">
      <span>报名结束时间</span>
      <el-date-picker
          v-model="editEvent.regEndTime"
          type="date"
          placeholder="Pick a day"
          size="default"
      />
    </div>
    <div class="item">
      <span>活动开始时间</span>
      <el-date-picker
          v-model="editEvent.startTime"
          type="date"
          placeholder="Pick a day"
          size="default"
      />
    </div>
    <div class="item">
      <span>活动结束时间</span>
      <el-date-picker
          v-model="editEvent.endTime"
          type="date"
          placeholder="Pick a day"
          size="default"
      />
    </div>
    <div class="item">
      <span>当前人数</span>
      <input class="edit-input" type="text" name="category"
             :placeholder="placeholderEvent.currentParticipant"
             v-model="editEvent.currentParticipant">
    </div>
    <div class="item">
      <span>最多人数</span>
      <input class="edit-input" type="text" name="category"
             :placeholder="placeholderEvent.currentParticipant"
             v-model="editEvent.currentParticipant">
    </div>
    <div class="item">
      <span>审核方式</span>
      <el-select v-model="value" placeholder="Select" style="width: 240px">
        <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
        />
      </el-select>
    </div>
    <div class="item">
      <span>位置</span>
      <input class="edit-input" type="text" name="location"
             disabled
             :value="placeholderEvent.location">
    </div>
    <div class="item">
      <span>联系方式</span>
      <input class="edit-input" type="text" name="contact"
             :placeholder="placeholderEvent.contact"
             v-model="editEvent.contact">
    </div>
    <div class="item">
      <span>活动状态</span>
      <el-select v-model="value" placeholder="Select" style="width: 240px">
        <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
        />
      </el-select>
    </div>
  </div>
  <div class="submit-container">
    <div class="submit" @click="submit">提交</div>
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  column-gap: 10%;
  row-gap: 60px;
  flex-wrap: wrap;

}

.item {
  width: max-content;
  font-size: 16px;

  span {
    &:first-child {
      &:after {
        content: ":";
        margin: 0 10px 0 5px;
      }
    }

    text-align-last: justify;
    min-width: 100px;
    display: inline-block;
  }

  .edit-input {
    font-size: initial;
    padding: 5px;
    border-radius: 5px;
    width: 160px;
  }

  .el-upload--picture-card {
    --el-upload-picture-card-size: 14px;
  }
}

.submit-container {
  width: 100%;

  .submit {
    padding: 5px;
    margin: 60px auto;
    width: 100px;
    height: 25px;
    line-height: 25px;
    background-color: #1691e3;
    color: white;
    text-align: center;
    border-radius: 7px;
    font-size: 16px;

    &:active {
      background-color: #0f85d6;
    }
  }
}

.avatar {
  width: 60px;
  height: 60px;
}

</style>