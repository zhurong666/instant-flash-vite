<script setup lang="ts">
// 1 展开或者折叠
import {reactive, ref ,toRefs} from "vue";
import {removeToken} from "@/utils/cache/cookies.ts";
import router from "@/router";
import {useUserStore} from "@/store/modules/user.ts";
import {getUserInfo} from "@/utils/cache/cookies.ts";

// const headerStore = useHeaderStore()
const FoldOrExpand = ref('Fold')
const isExpand = () => {
  if (FoldOrExpand.value === 'Fold') {
    FoldOrExpand.value = 'Expand'
  } else {
    FoldOrExpand.value = 'Fold'
    // headerStore.isCollapse = false
  }
}
const logout = () => {
  removeToken()
}
const gotoMine = () => {
  router.push({ path: "/me" })
}

const userInfo = reactive({
  username: getUserInfo().username
})

const useUser = toRefs(useUserStore())
console.log("用户",useUser)
console.log("用户",useUser.username.value)
console.log("用户",useUser.username)


</script>

<template>
  <div class="header">
    <!--左边-->
    <!-- <div class="left-content">
      <component class="expandOrFold" @click="isExpand" :is="FoldOrExpand"/>
    </div> -->
    <!--右边-->
    <div class="right-content">
      <el-dropdown trigger="click">
        <div class="el-dropdown-link">
          <img src="@/assets/vue.svg" alt="头像"/>
          <div class="content">{{ userInfo.username }}</div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="User" @click="gotoMine">个人中心</el-dropdown-item>
            <el-dropdown-item icon="SwitchButton" @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </div>
</template>

<style scoped lang="less">
.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;

  .left-content {
    display: flex;
    align-items: center;
    justify-content: center;

    .bread {
      margin-left: 10px;
    }

    .expandOrFold {
      width: 30px;
      height: 30px;
      cursor: pointer;

      &:hover {
        color: #4930b7;
      }
    }
  }

  .right-content {
    display: flex;
    align-content: center;
    justify-content: center;

    .el-dropdown-link {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 25px;

      img {
        object-fit: fill;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .content {
        margin: 0 auto;
      }

      .el-icon--right {
        color: black;
        font-size: 110px;
      }
    }
  }
}
</style>