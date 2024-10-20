<script setup lang="ts">
import {reactive} from "vue";

const userInfo = reactive({
  userId: 1
})
</script>

<template>
  <div class="user-info-container">
    <div class="user-info">
      <div class="item">
        <span>用户编号</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>手机号码</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户邮箱</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户昵称</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>性别</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>信誉值</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>积分</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>状态</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>账号所属地</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>最后上线所在地</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>最后上线时间</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>注册时间</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>用户头像</span>
        <input type="text" disabled :value="userInfo.userId">
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
        font-size: inherit;

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
}
</style>