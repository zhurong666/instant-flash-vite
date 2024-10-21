<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import type {UserInfo} from "@/api/user/types";
import {getUserInfoApi} from "@/api/user";
import {useRoute} from "vue-router";
import {baseImgURL, baseURL} from "@/utils/service.ts";

const {query, params} = useRoute();
const userInfo = ref<UserInfo>({})

onMounted(() => {
  loadData()
})

async function loadData() {
  const {data} = await getUserInfoApi(params.id)
  userInfo.value = data
}


const location = computed(() => {
  return ""
})
</script>

<template>
  <div class="user-info-container">
    <div class="user-info">
      <div class="item">
        <span>用户编号</span>
        <input type="text" disabled :value="userInfo?.id">
      </div>
      <div class="item">
        <span>手机号码</span>
        <input type="text" disabled :value="userInfo?.phone">
      </div>
      <div class="item">
        <span>用户邮箱</span>
        <input type="text" disabled :value="userInfo?.email">
      </div>
      <div class="item">
        <span>用户昵称</span>
        <input type="text" disabled :value="userInfo?.username">
      </div>
      <div class="item">
        <span>性别</span>
        <input type="text" disabled :value="userInfo?.gender">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>信誉值</span>
        <input type="text" disabled :value="userInfo?.reputation">
      </div>
      <div class="item">
        <span>积分</span>
        <input type="text" disabled :value="userInfo?.integral">
      </div>
      <div class="item">
        <span>状态</span>
        <input type="text" disabled :value="userInfo?.statusId">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>账号所属地</span>
        <input type="text" disabled :value="userInfo?.cityId">
      </div>
      <div class="item">
        <span>最后上线所在地</span>
        <input type="text" disabled :value="userInfo?.lastAddress">
      </div>
      <div class="item">
        <span>最后上线时间</span>
        <input type="text" disabled :value="userInfo?.lastTime">
      </div>
      <div class="item">
        <span>注册时间</span>
        <input type="text" disabled :value="userInfo?.createTime">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>用户头像</span>
        <img :src="baseImgURL+userInfo?.avatar" alt="用户头像" class="avatar">
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
    margin-bottom: 40px;

    .item {
      font-size: 14px;

      span {
        display: inline-block;
        font-size: inherit;
        min-width: 100px;

        &:first-child:after {
          content: ":";
          margin: 0 10px 0 5px;
        }
      }

      input {
        font-size: inherit;
        padding: 5px;
      }
    }
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }
}
</style>