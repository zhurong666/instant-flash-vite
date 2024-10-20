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
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户Id</span>
        <input type="text" disabled :value="userInfo.userId">
      </div>
      <div class="item">
        <span>用户Id</span>
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
    margin-bottom: 60px;

    .item span {
      &:first-child:after {
        content: ":";
        margin: 0 10px 0 5px;
      }
    }
  }
}
</style>