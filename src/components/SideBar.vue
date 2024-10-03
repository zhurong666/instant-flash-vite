<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
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
  for (let route of router.getRoutes()) {
    if (route.meta.menuId == id) {
      console.log(route.meta.menuId, route.path)
      router.push({
        path: route.path
      })
      break
    }
  }
  activeMenu.value = id;
}

const updateActiveMenu = () => {
  const currentRoute = router.currentRoute.value;
  if (currentRoute.meta.menuId) {
    activeMenu.value = currentRoute.meta.menuId;
  }
};

// 在组件挂载时和路由变化时更新激活菜单
onMounted(updateActiveMenu);
watch(() => router.currentRoute.value, updateActiveMenu);

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