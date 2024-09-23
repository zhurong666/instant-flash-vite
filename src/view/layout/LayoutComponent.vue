<script setup lang="ts">

import SideBar from "@/components/SideBar.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderComponent />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <SideBar></SideBar>
        </el-aside>
        <el-container>
          <el-main>
            <!--二级路由-->
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component"/>
              </transition>
            </router-view>
          </el-main>
          <el-footer>
            <div class="footer-container">
              <p>网站备案信息 © 2024</p>
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.footer-container {
  width: 100%;
  text-align: center;
}
</style>