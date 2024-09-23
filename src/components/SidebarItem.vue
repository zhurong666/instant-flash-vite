<script setup lang="ts">

</script>

<template>
  <el-sub-menu index="1">
    <template #title>
      <el-icon><location /></el-icon>
      <span>系统统计</span>
    </template>
    <el-menu-item-group title="系统统计">
      <el-menu-item index="1-1">系统统计</el-menu-item>
      <el-menu-item index="1-2">系统统计</el-menu-item>
    </el-menu-item-group>
  </el-sub-menu>

  <el-sub-menu index="2">
    <template #title>
      <el-icon><location /></el-icon>
      <span>用户管理</span>
    </template>
    <el-menu-item-group title="用户管理">
      <el-menu-item index="2-1">异常用户</el-menu-item>
      <el-menu-item index="2-2">查找用户</el-menu-item>
      <el-menu-item index="2-3">创建用户</el-menu-item>
      <el-menu-item index="2-4">修改用户</el-menu-item>
    </el-menu-item-group>
  </el-sub-menu>

  <el-sub-menu index="3">
    <template #title>
      <el-icon><location /></el-icon>
      <span>活动管理</span>
    </template>
    <el-menu-item-group title="活动管理">
      <el-menu-item index="3-1">活动审核</el-menu-item>
      <el-menu-item index="3-2">活动查找</el-menu-item>
      <el-menu-item index="3-3">活动修改</el-menu-item>
    </el-menu-item-group>
  </el-sub-menu>
</template>

<style scoped>

</style>