<script setup lang="ts">

import {baseURL} from "@/utils/service.ts";
import {Plus} from "@element-plus/icons-vue";
import {reactive} from "vue";
import {EditEvent} from "@/api/event";



const editEvent = reactive<EditEvent>({
  eventId: 1,
  userId: 1,
})


const placeholderEvent = reactive({

})
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
             :placeholder="placeholderEvent.username"
             v-model="editEvent.username"/>
    </div>
    <div class="item">
      <span>活动名称</span>
      <input class="edit-input" type="text" name="email"
             :placeholder="placeholderEvent.username"
             v-model="editEvent.email">
    </div>
    <div class="item">
      <span>活动宣传图片</span>
      <input class="edit-input" type="text" name="email"
             :placeholder="placeholderEvent.username"
             v-model="editEvent.email">
    </div>
    <div class="item">
      <span>活动类型</span>
      <input class="edit-input" type="text" name="phone"
             :placeholder="placeholderEvent.username"
             v-model="editEvent.phone">
    </div>
    <div class="item">
      <span>目标用户群体</span>
      <input class="edit-input" type="text" name="gender"
             :placeholder="placeholderEvent.username"
             v-model="editEvent.gender">
    </div>
    <div class="item">
      <span>报名开始时间</span>
      <el-autocomplete
          v-model="state1"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input w-50"
          placeholder="Please Input"
          @select="handleSelect"
      />
    </div>
    <div class="item">
      <span>报名结束时间</span>
      <input class="edit-input" type="text" name="identityId"
             :placeholder="placeholderEvent.username"
             v-model="editEvent.identityId">
    </div>
    <div class="item">
      <span>活动开始时间</span>
      <el-date-picker
          v-model="editEvent.brithDay"
          type="date"
          placeholder="Pick a day"
          size="default"
      />
    </div>
    <div class="item">
      <span>活动结束时间</span>
      <img :src="placeholderEvent.avatar" alt="用户头像" srcset="">
      <el-upload
          class="avatar-uploader"
          v-model:file-list="fileList"
          :action="baseURL+'common/upload'"
          list-type="picture-card"
          :on-success="uploadSuss"
      >
        <el-icon class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </div>
    <div class="item">
      <span>当前人数</span>
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
      <span>最多人数</span>
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
      <span>联系方式</span>
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
    <div class="submit">提交</div>
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

</style>