<script setup lang="ts">
import {onMounted} from "vue";
import router from "@/router";

onMounted(()=>{
  setTimeout(()=>{
    router.replace({
      path:"/active/check"
    })
  },2000)
})
</script>

<template>
  <div class="home-view">
    <span class="fade-out">你好,欢迎使用本系统</span>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80vh;

  font-size: 28px;
  letter-spacing: .2rem;

}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.fade-out {
  animation: fadeOut 2.2s ease;
}
</style>