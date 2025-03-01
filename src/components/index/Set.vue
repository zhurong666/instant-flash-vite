<script setup lang="ts">
import {reactive, ref} from 'vue'
import {Plus} from '@element-plus/icons-vue'

import type {UploadUserFile} from 'element-plus'
import {baseURL, request} from "@/utils/service.ts";

const fileList = ref<UploadUserFile[]>([])
const fileList2 = ref<UploadUserFile[]>([])

const t1 = []
for (let i = 0; i < 4; i++) {
  t1.push({
    id: i + 1,
    title: "",
    aboutUrl: "",
    imgUrl: ""
  })
}
const uploadObj1 = reactive(t1)

const t = []
for (let i = 0; i < 4; i++) {
  t.push({
    id: i + 1,
    eventId: "",
    title: "",
    aboutUrl: "",
    imgUrl: ""
  })
}
const uploadObj2 = reactive(t)
const uploadSuss = (res) => {
  console.log(res)
  if (res.code == 200) {
    uploadObj1[fileList.value.length - 1].imgUrl = res.data
  }
}
const uploadSuss2 = (res) => {
  console.log(res)
  if (res.code == 200) {
    uploadObj2[fileList2.value.length - 1].imgUrl = res.data
  }
}

const input = ref("")

const submit = () => {
  request<String>({
    url: "index/swiper",
    method: "post",
    data: uploadObj1
  })
}

const submit2 = async () => {
  const {data} = await request<object>({
    url: "index/swiper",
    method: "get",
  })
  console.log(data)
}

const submit3 = () => {
  request<String>({
    url: "index/district",
    method: "post",
    data: uploadObj2
  })
}

</script>

<template>
  <div class="app-container">
    <div class="guanggao" style="border-right: 1px solid #292929;margin-right: 30px">
      <span style="width: 100%;text-align: center;display: inline-block;margin: 10px">
        广告设置
      </span>
      <el-upload
          v-model:file-list="fileList"
          :action="baseURL+'common/upload'"
          list-type="picture-card"
          :on-success="uploadSuss"
      >
        <el-icon>
          <Plus/>
        </el-icon>
      </el-upload>

      <el-text class="title">第一个</el-text>

      <div class="item">
        <el-text class="label">关 联 链 接</el-text>
        <el-input
            v-model="uploadObj1[0].aboutUrl"
            style="width: 240px"
            placeholder="请输入链接"
            clearable
        />
      </div>

      <div class="item">
        <el-text class="label">简 单 描 述</el-text>
        <el-input
            v-model="uploadObj1[0].title"
            style="width: 240px"
            placeholder="请输入描述"
            clearable
        />
      </div>

      <el-text class="title">第二个</el-text>
      <div class="item">
        <el-text class="label">关 联 链 接</el-text>
        <el-input
            v-model="uploadObj1[1].aboutUrl"
            style="width: 240px"
            placeholder="请输入链接"
            clearable
        />
      </div>

      <div class="item">
        <el-text class="label">简 单 描 述</el-text>
        <el-input
            v-model="uploadObj1[1].title"
            style="width: 240px"
            placeholder="请输入描述"
            clearable
        />
      </div>

      <el-text class="title">第三个</el-text>
      <div class="item">
        <el-text class="label">关 联 链 接</el-text>
        <el-input
            v-model="uploadObj1[2].aboutUrl"
            style="width: 240px"
            placeholder="请输入链接"
            clearable
        />
      </div>

      <div class="item">
        <el-text class="label">简 单 描 述</el-text>
        <el-input
            v-model="uploadObj1[2].title"
            style="width: 240px"
            placeholder="请输入描述"
            clearable
        />
      </div>

      <div style="width: 100%;text-align: center;margin-top: 10px">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
    <div class="tuijian" style="border-right: 1px solid #292929;margin-right: 30px">
      <span style="width: 100%;text-align: center;display: inline-block;margin: 10px">
        推荐设置
      </span>
      <el-upload
          v-model:file-list="fileList2"
          :action="baseURL+'common/upload'"
          list-type="picture-card"
          :on-success="uploadSuss2"
      >
        <el-icon>
          <Plus/>
        </el-icon>
      </el-upload>

      <el-text class="title">第一个</el-text>

      <div class="item">
        <el-text class="label">关 联 链 接</el-text>
        <el-input
            v-model="uploadObj2[0].aboutUrl"
            style="width: 240px"
            placeholder="请输入链接"
            clearable
        />
      </div>

      <div class="item">
        <el-text class="label">简 单 描 述</el-text>
        <el-input
            v-model="uploadObj2[0].title"
            style="width: 240px"
            placeholder="请输入描述"
            clearable
        />
      </div>

      <div class="item">
        <el-text class="label">关联活动Id</el-text>
        <el-input
            v-model="uploadObj2[0].eventId"
            style="width: 240px"
            placeholder="请输入关联活动Id"
            clearable
        />
      </div>

      <el-text class="title">第二个</el-text>
      <div class="item">
        <el-text class="label">关 联 链 接</el-text>
        <el-input
            v-model="uploadObj2[1].aboutUrl"
            style="width: 240px"
            placeholder="请输入链接"
            clearable
        />
      </div>

      <div class="item">
        <el-text class="label">简 单 描 述</el-text>
        <el-input
            v-model="uploadObj2[1].title"
            style="width: 240px"
            placeholder="请输入描述"
            clearable
        />
      </div>

      <div class="item">
        <el-text class="label">关联活动Id</el-text>
        <el-input
            v-model="uploadObj2[1].eventId"
            style="width: 240px"
            placeholder="请输入关联活动Id"
            clearable
        />
      </div>

      <el-text class="title">第三个</el-text>
      <div class="item">
        <el-text class="label">关 联 链 接</el-text>
        <el-input
            v-model="uploadObj2[2].aboutUrl"
            style="width: 240px"
            placeholder="请输入链接"
            clearable
        />
      </div>

      <div class="item">
        <el-text class="label">简 单 描 述</el-text>
        <el-input
            v-model="uploadObj2[2].title"
            style="width: 240px"
            placeholder="请输入描述"
            clearable
        />
      </div>

      <div class="item">
        <el-text class="label">关联活动Id</el-text>
        <el-input
            v-model="uploadObj2[2].eventId"
            style="width: 240px"
            placeholder="请输入关联活动Id"
            clearable
        />
      </div>
      <el-text class="title">第四个</el-text>
      <div class="item">
        <el-text class="label">关 联 链 接</el-text>
        <el-input
            v-model="uploadObj2[3].aboutUrl"
            style="width: 240px"
            placeholder="请输入链接"
            clearable
        />
      </div>

      <div class="item">
        <el-text class="label">简 单 描 述</el-text>
        <el-input
            v-model="uploadObj2[3].title"
            style="width: 240px"
            placeholder="请输入描述"
            clearable
        />
      </div>

      <div class="item">
        <el-text class="label">关联活动Id</el-text>
        <el-input
            v-model="uploadObj2[3].eventId"
            style="width: 240px"
            placeholder="请输入关联活动Id"
            clearable
        />
      </div>
      <div style="width: 100%;text-align: center;margin-top: 10px">

        <el-button type="primary" @click="submit3">提交</el-button>
      </div>
    </div>
    <div>
      <div class="item">
        <span style="width: 100%;text-align: center;display: inline-block;margin: 10px">
          推荐设置
        </span>
        <el-text class="label">公告内容</el-text>
        <el-input
            v-model="input"
            style="width: 240px"
            placeholder="请输入公告内容"
            clearable
        />
      </div>
      <div style="width: 100%;text-align: center;margin-top: 20px">
        <el-button @click="submit2" type="primary" style="margin-top: 30px;">提交</el-button>
      </div>
    </div>
  </div>

</template>

<style scoped lang="less">
.title {
  font-size: 22px;
  font-weight: bold;
}

.app-container {
  display: flex;
  justify-content: space-around;
  padding: 5px 20px;

  .tuijian, .guanggao {
    max-height: calc(100vh - 220px);
    overflow-y: auto;
    overflow-x: hidden;
    width: 400px;
  }
}

.item {
  width: 100%;
  height: 40px;

  .label {
    margin-right: 10px;

    &:after {
      content: " :";
    }
  }
}
</style>