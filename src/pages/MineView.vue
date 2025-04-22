<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import type {UserInfo} from "@/api/user/types";
import {getUserInfoApi} from "@/api/user";
import {baseImgURL} from "@/utils/service.ts";
import {getUserInfo} from "@/utils/cache/cookies";

const userInfo = ref<UserInfo>({})

onMounted(() => {
  loadData()
})

async function loadData() {
  const user = getUserInfo();
  const {data} = await getUserInfoApi(user.id)
  console.log(data)
  userInfo.value = data
}

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
      <div class="item">
        <span>账号所属地</span>
        <input type="text" disabled :value="userInfo?.userDetail?.lastIp">
      </div>
      <div class="item">
        <span>最后上线所在地</span>
        <input type="text" disabled :value="userInfo?.userDetail?.lastIp">
      </div>
      <div class="item">
        <span>最后上线时间</span>
        <input type="text" disabled :value="userInfo?.userDetail?.lastTime">
      </div>
      <div class="item">
        <span>注册时间</span>
        <input type="text" disabled :value="userInfo?.createTime">
      </div>
      <div class="item">
        <span>用户头像</span>
        <div class="avatar-div">
          <img :src="baseImgURL+userInfo?.avatar" alt="用户头像" class="avatar">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.user-info-container {
  .user-info {
    width: 100%;
    background-color: rgba(73, 73, 73, 0.84);
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 40px;

    .item {
      font-size: 14px;
      letter-spacing: .05em;
      width: 100%;
      height: 41px;

      &:first-child {
        span {
          border-top-left-radius: 5px;
        }

        input {
          border-top-right-radius: 5px;
        }
      }

      &:last-child {
        span {
          border-bottom-left-radius: 5px;
        }

        input {
          border-bottom-right-radius: 5px;
        }
      }

      span {
        min-width: 110px;
        font-size: inherit;
        padding: 10px;
        background-color: rgba(86, 190, 236, 0.77);
        display: inline-block;
        text-align: end;
        vertical-align: middle;
        border-bottom: 1px solid #616161;
      }

      input {
        font-size: inherit;
        width: 240px;
        box-sizing: border-box;
        background-color: #ededed;
        border: none;
        height: 41px;
        padding: 10px;
        vertical-align: middle;
        border-bottom: 1px solid #d3d3d3;
      }
    }
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 30px;
    vertical-align: middle;
  }

  .avatar-div {
    width: 240px;
    display: inline-block;
    background-color: #ededed;
    height: 41px;
    vertical-align: middle;
  }
}

</style>