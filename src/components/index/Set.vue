<script setup lang="ts">
import {reactive, ref} from 'vue'
import {Plus} from '@element-plus/icons-vue'

import type {UploadUserFile} from 'element-plus'
import {baseURL, request} from "@/utils/service.ts";

const fileList = ref<UploadUserFile[]>([])

const uploadObj1 = reactive([
  {
    id: 1,
    title: "",
    aboutUrl: "",
    imgUrl: ""
  },
  {
    id: 2,
    title: "",
    aboutUrl: "",
    imgUrl: ""
  },
  {
    id: 3,
    title: "",
    aboutUrl: "",
    imgUrl: ""
  },
])
const uploadSuss = (res) => {
  console.log(res)
  if (res.code == 200) {
    uploadObj1[fileList.value.length - 1].imgUrl = res.data
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
</script>

<template>
  <div style="display: flex">
    <div style="width: 48%;border-right: 1px solid #292929;margin-right: 30px">
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

      <div style="width: 100%">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
    <div>
      <div class="item">
        <el-text class="label">公告</el-text>
        <el-input
            v-model="input"
            style="width: 240px"
            placeholder="请输入公告内容"
            clearable
        />
      </div>
      <div style="width: 100%">
        <el-button @click="submit2" type="primary">提交</el-button>
      </div>
    </div>
  </div>

</template>

<style scoped lang="less">
.title {
  font-size: 22px;
  font-weight: bold;
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