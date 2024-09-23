<script setup lang="ts">
import {ref} from "vue";
import {getCssVariableValue} from "@/utils";
import SidebarItem from "@/components/SidebarItem.vue";
import router from "@/router";

const v3SidebarMenuBgColor = getCssVariableValue("--v3-sidebar-menu-bg-color")
const v3SidebarMenuTextColor = getCssVariableValue("--v3-sidebar-menu-text-color")
const v3SidebarMenuActiveTextColor = getCssVariableValue("--v3-sidebar-menu-active-text-color")

const activeMenu = ref("1-1")
const isCollapse = ref(false)
const backgroundColor = ref(v3SidebarMenuBgColor)
const textColor = ref(v3SidebarMenuTextColor)
const activeTextColor = ref(v3SidebarMenuActiveTextColor)

const selected = (id, idArr, idObj) => {
  switch (id) {
    case "1-1":
      router.push(`/about`)
      break;
    case "1-2":
      router.push(`/login`)
      break;
    case "2-1":
      router.push({
        path: `/user/edit/1`,
      })
      break;
    case "2-2":
      router.push({
        path: `/user/search`,
      })
      break;
    case "2-3":
      router.push({
        path: `/user/create`
      })
      break;
    case "2-4":
      router.push({
        path: `/user/edit/1`,
      })
      break;
    case "3-1":
      router.push({
        path: `/active/check`
      })
      break;
    case "3-2":
      router.push({
        path: `/active/search`
      })
      break;
    case "3-3":
      router.push({
        path: `/active/edit/1`
      })
      break;
  }
  activeMenu.value = id;
}
</script>

<template>
  <el-menu
      :collapse="isCollapse"
      :default-active="activeMenu"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      :unique-opened="true"
      @select="selected"
  >
    <SidebarItem/>
  </el-menu>
</template>
<style scoped lang="less">
.el-menu {
  height: 80vh;
  border-right: 0;

  .icon {
    height: 50px;
    color: #fff;
    display: grid;
    place-content: center;
    border-bottom: 1px solid grey;
  }
}
</style>