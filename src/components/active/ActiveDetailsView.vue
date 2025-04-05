<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {getEventById, getEventMemberById} from "@/api/event";
import {useRoute} from "vue-router";
import {baseImgURL} from "@/utils/service";
import {getEventTargetGroupTypesCache, getEventTypesCache} from "@/utils/cache/common";
import * as CommonCache from "@/utils/cache/common";

const {params} = useRoute()
const placeholderEvent = ref({})
const statusOptions = ref([])
onMounted(() => {
  loadData()

  const eventStatus: [] = CommonCache.getEventStatusCache()
  statusOptions.value = eventStatus.map(item => {
    return {
      value: item.code,
      label: item.statusText
    }
  })
})
const loadData = async () => {
  const data = await getEventById(params.id)
  placeholderEvent.value = data.data
  const {data: data2}: { data: [] } = await getEventMemberById(params.id)
  data2.forEach(item => {
    item.avatar = baseImgURL + item.avatar
  })
  console.log(data2)
  tableData.value = data2
}

watch(() => placeholderEvent.value.latitude, async () => {
  // const {data:{data}} = await getCityByLatLng(placeholderEvent.value.latitude,placeholderEvent.value.longitude)
  const data = {
    address: "成都市"
  }
  console.log(data)
  placeholderEvent.value.location = data.address;
})

const tableData = ref([
  {
    id: 1,
    username: 'Tom',
    avatar: 'default.png',
  }
])

const eventTypes = getEventTypesCache()
const eventGroups = getEventTargetGroupTypesCache()
const cpuEventType = computed(() => {
  return Object.values(eventTypes).find((item, index) => {
    return index === placeholderEvent.value.category
  })
})
const cpuEventGroup = computed(() => {
  return Object.values(eventGroups).find((item, index) => index === placeholderEvent.value.targetGroupId)
})

const cpuStatus = computed(() => {
  return statusOptions.value.find((item) => {
    return item.value === placeholderEvent.value.status
  })?.label || "xx"
})
</script>

<template>
  <div class="user-info-container">
    <div class="user-info">
      <div class="item">
        <span>活动Id</span>
        <input type="text" disabled :value="placeholderEvent.id">
      </div>
      <div class="item">
        <span>创建用户ID</span>
        <input type="text" disabled :value="placeholderEvent.userId">
      </div>
      <div class="item">
        <span>活动名称</span>
        <input type="text" disabled :value="placeholderEvent.name">
      </div>
      <div class="item">
        <span>活动宣传图片</span>
        <img :src="placeholderEvent.imageUrls" alt="活动图片" class="avatar">
      </div>
      <div class="item">
        <span>活动类型</span>
        <input type="text" disabled :value="cpuEventType">
      </div>
      <div class="item">
        <span>目标用户群体</span>
        <input type="text" disabled :value="cpuEventGroup">
      </div>
    </div>
    <div class="user-info">

      <div class="item">
        <span>报名开始时间</span>
        <input type="text" disabled :value="placeholderEvent.regStartTime">
      </div>
      <div class="item">
        <span>报名结束时间</span>
        <input type="text" disabled :value="placeholderEvent.regEndTime">
      </div>
      <div class="item">
        <span>活动开始时间</span>
        <input type="text" disabled :value="placeholderEvent.startTime">
      </div>
      <div class="item">
        <span>活动结束时间</span>
        <input type="text" disabled :value="placeholderEvent.endTime">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>审核方式</span>
        <input type="text" disabled :value="placeholderEvent.userId == 1?'需审核':'无需审核'">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>位置</span>
        <input type="text" disabled :value="placeholderEvent.location">
      </div>
      <div class="item">
        <span>联系方式</span>
        <input type="text" disabled :value="placeholderEvent.contact">
      </div>

      <div class="item">
        <span>当前人数</span>
        <input type="text" disabled :value="placeholderEvent.currentParticipant">
      </div>
      <div class="item">
        <span>最多人数</span>
        <input type="text" disabled :value="placeholderEvent.maxParticipant">
      </div>
      <div class="item">
        <span>活动状态</span>
        <input type="text" disabled :value="cpuStatus">
      </div>
    </div>
    <div class="user-list">
      <div>活动成员列表</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="用户Id" width="180"/>
        <el-table-column prop="username" label="用户名称" width="180"/>
        <el-table-column label="用户名称" width="180">
          <template #default="scope">
            <el-image style="width: 60px; height: 60px" :src="scope.row.avatar" fit="cover"></el-image>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="less">
.user-info-container {

  .user-info {
    width: 100%;
    display: grid;
    grid-row-gap: 16px;
    grid-template-columns:1fr 1fr 1fr 1fr;
    margin-bottom: 60px;
    background-color: rgba(0, 0, 0, 0.33);
    border-radius: 15px;
    padding: 20px;

    .avatar {
      width: 200px;
      height: 200px;
      border-radius: 0 0 15px 15px;
    }

    .item {
      width: 220px;
      border-radius: 15px;
      //box-shadow: 6px 4px 18px 0 rgba(58, 58, 58, 0.55);
      height: fit-content;
      letter-spacing: .05em;
      span {
        display: block;
        background-color: #dfa32d;
        border-radius: 15px 15px 0 0;
        padding: 5px;
      }

      input {
        border-radius: 0 0 15px 15px;
        width: calc(100% - 20px);
        background-color: #f3f3f3;
        border: none;
        font-size: 14px;
        padding: 10px;
      }
    }
  }

  .user-list {
    width: 40%;
  }

}
</style>