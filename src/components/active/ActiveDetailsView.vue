<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import {getEventById} from "@/api/event";
import {useRoute} from "vue-router";

const {params} = useRoute()
const placeholderEvent = ref({})
onMounted(()=>{
  loadData()
})
const loadData = async () => {
  const data = await getEventById(params.id)
  placeholderEvent.value = data.data
}

watch(() => placeholderEvent.value.latitude, async () => {
  // const {data:{data}} = await getCityByLatLng(placeholderEvent.value.latitude,placeholderEvent.value.longitude)
  const data = {
    address: "成都市"
  }
  console.log(data)
  placeholderEvent.value.location = data.address;
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
        <img :src="placeholderEvent.imageUrls" alt="用户头像" class="avatar">
      </div>
      <div class="item">
        <span>活动类型</span>
        <input type="text" disabled :value="placeholderEvent.category">
      </div>
      <div class="item">
        <span>目标用户群体</span>
        <input type="text" disabled :value="placeholderEvent.targetGroupId">
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
        <input type="text" disabled :value="placeholderEvent.userId">
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
        <input type="text" disabled :value="placeholderEvent.statusId">
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.user-info-container {

  .user-info {
    width: 100%;
    display: grid;
    grid-row-gap: 16px;
    grid-template-columns:1fr 1fr 1fr;
    margin-bottom: 60px;

    .item span {
      min-width: 100px;
      display: inline-block;
      text-align-last: justify;
      &:first-child:after {
        content: ":";
        margin: 0 10px 0 5px;
      }
    }
  }
}
</style>