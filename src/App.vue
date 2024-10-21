<script setup lang="ts">
import {useRouter} from "vue-router";
import {commonModules} from "@/store/modules/common.ts";
const router = useRouter();

const cache = commonModules()
cache.initUserType()
cache.initEventType()
cache.initEventTargetGroupType()
</script>

<template>
  <RouterView/>
</template>

<style scoped>

</style>
