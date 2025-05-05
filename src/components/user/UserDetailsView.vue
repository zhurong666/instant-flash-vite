<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import type {UserInfo} from "@/api/user/types";
import {getUserInfoApi, getUserTypes} from "@/api/user";
import {useRoute} from "vue-router";
import {baseImgURL} from "@/utils/service.ts";
import {getCity} from "@/api";
import {getUserStatusCache} from "@/utils/cache/common";

const {params} = useRoute();
const userInfo = ref<UserInfo>({})

const userTypes = ref(<any[]>[])
onMounted(() => {
  loadData()
})

async function loadData() {
  const {data} = await getUserInfoApi(params.id)
  userInfo.value = data

  const adata = await getUserTypes()
  userTypes.value = adata.data

  const ata = await getCity()
  const city = Object.values(ata.data).find(item => item.id === userInfo.value.cityId)
  userInfo.value.cityName = city.extName

  const userStatusCache = getUserStatusCache()
  userStatus.value = userStatusCache || []
}


const location = computed(() => {
  return "xxx"
})

const userStatus = ref(<any[]>[])
const cpuStatus = computed(() => {
  return userStatus.value.find(item => item.code == userInfo.value.statusId)?.description
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
        <input type="text" disabled :value="userInfo.gender == 1 ? '男' : '女'">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>信誉值</span>
        <input type="text" disabled :value="userInfo?.worth?.reputation">
      </div>
      <div class="item">
        <span>积分</span>
        <input type="text" disabled :value="userInfo?.worth?.credit">
      </div>
      <div class="item">
        <span>状态</span>
        <input type="text" disabled :value="cpuStatus">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>账号所属地</span>
        <input type="text" disabled :value="userInfo?.cityName">
      </div>
      <div class="item">
        <span>最后上线所在地</span>
        <input type="text" disabled :value="userInfo?.userDetail?.lastTime">
      </div>
      <div class="item">
        <span>最后上线时间</span>
        <input type="text" disabled :value="userInfo?.userDetail?.lastTime">
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
    grid-template-columns:1fr 1fr 1fr 1fr;
    background-color: #8CB4D4;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 40px;
    .item {
      font-size: 14px;
      width: 240px;
      letter-spacing: .05em;
      span {
        font-size: inherit;
        padding: 10px;
        display: block;
        background-color: #dfa32d;
        border-radius: 15px 15px 0 0;
      }

      input {
        padding: 10px;
        font-size: inherit;
        width: 240px;
        box-sizing: border-box;
        border-radius: 0 0 15px 15px;
        background-color: #ccc;
        border: none;
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