<script setup lang="ts">

import {computed, onMounted, reactive, ref, watch} from "vue";
import {EditEvent, getEventById, updateEvent} from "@/api/event";
import {useRoute} from "vue-router";
import router from "@/router";
import * as CommonCache from "@/utils/cache/common";
import {getEventTargetGroupTypesCache, getEventTypesCache} from "@/utils/cache/common";

const {params} = useRoute()

const editEvent = reactive<EditEvent>({
  eventId: 1,
  userId: 1,
})

const placeholderEvent = ref({})

const auditOptions = [
  {
    value: 0,
    label: "需审核",
  }, {
    value: 1,
    label: "无需审核",
  },
]
const statusOptions = ref([])


watch(() => placeholderEvent.value.latitude, async () => {
  // const {data:{data}} = await getCityByLatLng(placeholderEvent.value.latitude,placeholderEvent.value.longitude)
  const data = {
    address: "成都市"
  }
  console.log(data)
  placeholderEvent.value.location = data.address;
})

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
  console.log(data.data)
  placeholderEvent.value = data.data
  editEvent.regStartTime = data.data.regStartTime
  editEvent.regEndTime = data.data.regEndTime
  editEvent.startTime = data.data.startTime
  editEvent.endTime = data.data.endTime
  editEvent.status = data.data.status
  editEvent.audit = data.data.audit
}
// 通用的清除规则
const removeUnchangedValues = (editEvent, placeholderEvent) => {
  let result = { ...editEvent };

  Object.keys(result).forEach(key => {
    if (result[key] === placeholderEvent.value[key]) {
      result[key] = null;
    }
  });

  // 清除 null 或空字符串的属性
  Object.keys(result).forEach(key => {
    if (result[key] == null || result[key] === "") {
      delete result[key];
    }
  });


  // Date
  Object.keys(result).forEach(key => {
    if (result[key] instanceof Date) {
      result[key] = result[key].getTime();
    }
  });

  return result;
};

const submit = async () => {
  console.log(editEvent);
  // 应用这个通用函数
  let temp = removeUnchangedValues(editEvent, placeholderEvent);

  // 现在 temp 就是你需要的结果
  console.log(temp)
  const data = await updateEvent(temp)
  console.log(data)
  if (data.code === 200) {
    alert("修改成功")
  }else {
    alert("修改失败")
  }
}

const gotoEventMemberView = () => {
  router.push({
    path: "/active/checkMemberActive/" + params.id
  })
}

const eventTypes = getEventTypesCache()
const eventGroups = getEventTargetGroupTypesCache()
const cpuEventType = computed(()=>{
  return Object.values(eventTypes).find((item,index) => {
    return index === placeholderEvent.value.category
  })
})
const cpuEventGroup = computed(()=>{
  return Object.values(eventGroups).find((item,index) => index === placeholderEvent.value.targetGroupId)
})
</script>

<template>
  <div class="container">
    <div class="item">
      <span>活动Id</span>
      <span class="edit-input">{{ editEvent.eventId }}</span>
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
      <el-select v-model="editEvent.category" :placeholder="cpuEventType" class="ipt">
        <el-option
            v-for="(item,index) of Object.values(eventTypes)"
            :key="index"
            :label="item"
            :value="index"
        />
      </el-select>
    </div>
    <div class="item">
      <span>目标用户群体</span>
      <el-select v-model="editEvent.targetGroupId" :placeholder="cpuEventGroup" class="ipt">
        <el-option
            v-for="(item,index) of Object.values(eventGroups)"
            :key="index"
            :label="item"
            :value="index"
        />
      </el-select>
    </div>
    <div class="item">
      <span>报名开始时间</span>
      <el-date-picker
          v-model="editEvent.regStartTime"
          type="datetime"
          placeholder="Pick a day"
          size="default"
      />
    </div>
    <div class="item">
      <span>报名结束时间</span>
      <el-date-picker
          v-model="editEvent.regEndTime"
          type="datetime"
          placeholder="Pick a day"
          size="default"
      />
    </div>
    <div class="item">
      <span>活动开始时间</span>
      <el-date-picker
          v-model="editEvent.startTime"
          type="datetime"
          placeholder="Pick a day"
          size="default"
      />
    </div>
    <div class="item">
      <span>活动结束时间</span>
      <el-date-picker
          v-model="editEvent.endTime"
          type="datetime"
          placeholder="Pick a day"
          size="default"
      />
    </div>
    <div class="item">
      <span>当前人数</span>
      <input class="edit-input" type="text" name="category"
             :placeholder="placeholderEvent.currentParticipant"
             disabled
             v-model="editEvent.currentParticipant">
      <el-button @click="gotoEventMemberView" type="info" class="show-member">查看</el-button>
    </div>
    <div class="item">
      <span>最多人数</span>
      <input class="edit-input" type="text" name="category"
             :placeholder="placeholderEvent.maxParticipant"
             v-model="editEvent.maxParticipant">
    </div>
    <div class="item">
      <span>审核方式</span>
      <el-select v-model="editEvent.audit" placeholder="Select" class="ipt">
        <el-option
            v-for="item in auditOptions"
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
      <el-select v-model="editEvent.status" placeholder="状态" class="ipt">
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
@input-width:240px;
.container {
  display: flex;
  column-gap: 10%;
  row-gap: 60px;
  flex-wrap: wrap;

}

.item {
  width: @input-width;
  font-size: 16px;
  background-color: rgba(19, 19, 19, 0.82);
  height: fit-content;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  span {
    //&:first-child {
    //  &:after {
    //    content: ":";
    //    margin: 0 10px 0 5px;
    //  }
    //}
    //text-align-last: justify;
    &:first-child {
      border-radius: 10px 10px 0 0;
      padding: 5px;
      background-color: #dfa32d;
    }
  }

  .edit-input {
    font-size: initial;
    padding: 5px;
    height: 40px;
    //border-radius: 0 0 10px 10px;
    width: @input-width;
    border-radius: 0;
    box-sizing: border-box;
    border: none;
    background-color: #fff;
    color: #2c2c2c;
  }

  .el-upload--picture-card {
    --el-upload-picture-card-size: 14px;
  }

  :deep(.el-input__wrapper) {
    height: 40px;
    border-radius: 0;
  }
  :deep(.el-input) {
    width: @input-width;
  }
  :deep(.el-select__wrapper) {
    height: 40px;
    border-radius: 0;
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
  width: 220px;
  height: 220px;
}

.ipt {
  width: @input-width !important;
  height: 40px !important;
}

.show-member {
  width: fit-content;
}

</style>